export const recordSamples = (playbackRate, playedSamples, sampleRate) =>
    new Promise((resolve, reject) => {
        const arrayBuffer = new ArrayBuffer(44 + playedSamples.length * 2);
        const dataView = new DataView(arrayBuffer);

        dataView.setUint32(0, 1380533830);
        dataView.setUint32(4, 36 + playedSamples.length * 2, true);
        dataView.setUint32(8, 1463899717);
        dataView.setUint32(12, 1718449184);
        dataView.setUint32(16, 268435456);
        dataView.setUint32(20, 16777472);
        dataView.setUint32(24, sampleRate, true);
        dataView.setUint32(28, sampleRate * 2, true);
        dataView.setUint32(32, 33558528);
        dataView.setUint32(36, 1684108385);
        dataView.setUint32(40, playedSamples.length * 2, true);

        // eslint-disable-next-line unicorn/no-for-loop
        for (let i = 0; i < playedSamples.length; i += 1) {
            dataView.setInt16(44 + i * 2, playedSamples[i], true);
        }

        const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        const mediaStream = audio.captureStream();

        audio.playbackRate = playbackRate;

        mediaStream.onaddtrack = () => {
            mediaStream.onaddtrack = null;

            // eslint-disable-next-line no-undef
            const trackProcessor = new MediaStreamTrackProcessor({
                track: mediaStream.getAudioTracks()[0]
            });

            let channelData = null;
            let recordedSamples = new Int16Array(0);

            const transformer = new WritableStream({
                write(audioData) {
                    try {
                        if (audioData.numberOfChannels !== 1) {
                            throw new Error(`Unexpected numberOfChannels of ${audioData.numberOfChannels} instead of 1.`);
                        }

                        if (channelData === null) {
                            channelData = new Float32Array(audioData.numberOfFrames);
                        } else if (audioData.numberOfFrames !== channelData.length) {
                            throw new Error(`Unexpected numberOfFrames of ${audioData.numberOfFrames} instead of ${channelData.length}.`);
                        }

                        audioData.copyTo(channelData, { planeIndex: 0 });

                        const extendedRecordedSamples = new Int16Array(recordedSamples.length + channelData.length);

                        extendedRecordedSamples.set(recordedSamples);

                        // eslint-disable-next-line unicorn/no-for-loop
                        for (let i = 0; i < channelData.length; i += 1) {
                            const sample = channelData[i];

                            extendedRecordedSamples[recordedSamples.length + i] = Math.round(
                                sample < 0 ? Math.max(-1, sample) * 32768 : Math.min(1, sample) * 32767
                            );
                        }

                        recordedSamples = extendedRecordedSamples;

                        audioData.close();
                    } catch (err) {
                        reject(err);
                    }
                }
            });

            trackProcessor.readable.pipeTo(transformer);

            mediaStream.onremovetrack = async () => {
                mediaStream.onremovetrack = null;

                try {
                    await trackProcessor.readable.cancel();

                    audio.pause();
                    URL.revokeObjectURL(url);

                    resolve(recordedSamples);
                } catch (err) {
                    reject(err);
                }
            };
        };

        audio.play().catch(reject);
    });
