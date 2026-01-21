export const createBlobWithOneSecondSine = async () => {
    const sampleRate = 44100;
    const offlineAudioContext = new OfflineAudioContext({ length: sampleRate, sampleRate });
    const oscillatorNode = new OscillatorNode(offlineAudioContext);

    oscillatorNode.connect(offlineAudioContext.destination);
    oscillatorNode.start();

    const audioBuffer = await offlineAudioContext.startRendering();
    const bytesPerSample = 2;
    const headerSize = 44;
    const arrayBuffer = new ArrayBuffer(headerSize + sampleRate * bytesPerSample);
    const channelDataArray = audioBuffer.getChannelData(0);
    const dataView = new DataView(arrayBuffer);

    dataView.setUint32(0, 1380533830);
    dataView.setUint32(4, 2891448576);
    dataView.setUint32(8, 1463899717);
    dataView.setUint32(12, 1718449184);
    dataView.setUint32(16, 268435456);
    dataView.setUint32(20, 16777472);
    dataView.setUint32(24, 1152122880);
    dataView.setUint32(28, 2287468800);
    dataView.setUint32(32, 33558528);
    dataView.setUint32(36, 1684108385);
    dataView.setUint32(40, 2287468800);

    let offset = headerSize;

    for (let i = 0; i < sampleRate; i += 1) {
        const value = channelDataArray[i];

        dataView.setInt16(offset, value < 0 ? Math.max(-1, value) * 32768 : Math.min(1, value) * 32767, true);

        offset += bytesPerSample;
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
};
