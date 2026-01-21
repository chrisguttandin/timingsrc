import { beforeEach, describe, expect, it } from 'vitest';
import { recordSamples } from '../../../helpers/record-samples';

describe('MediaElement', () => {
    let audioElement;

    beforeEach(() => {
        audioElement = new Audio();
    });

    describe('playbackRate', () => {
        // bug #1

        it('should not support values below 0.0625', () => {
            expect(() => (audioElement.playbackRate = 0.0625)).to.not.throw();
            expect(() => (audioElement.playbackRate = 0.06249999999999999)).to.throw(
                DOMException,
                "Failed to set the 'playbackRate' property on 'HTMLMediaElement': The provided playback rate (0.0625) is not in the supported playback range."
            );
        });

        // bug #2

        it('should not support values above 16', () => {
            expect(() => (audioElement.playbackRate = 16)).to.not.throw();
            expect(() => (audioElement.playbackRate = 16.00000000000001)).to.throw(
                DOMException,
                "Failed to set the 'playbackRate' property on 'HTMLMediaElement': The provided playback rate (16) is not in the supported playback range."
            );
        });

        // bug #6

        describe('with a sampleRate right outside of the range of ignored values', () => {
            for (const [sampleRate, playbackRates] of [
                [44100, [881 / 882, 882 / 881]],
                [48000, [959 / 960, 960 / 959]]
            ]) {
                for (const playbackRate of playbackRates) {
                    it(`should modifiy the signal at a sampleRate of ${sampleRate} with a playbackRate of ${playbackRate}`, async () => {
                        const playedSamples = new Int16Array(
                            Array.from({ length: 1000 }, () => Math.floor(Math.random() * 2 ** 16) - 2 ** 15)
                        );
                        const recordedSamples = await recordSamples(playbackRate, playedSamples, sampleRate);
                        const playedSamplesAsString = Array.from(playedSamples).join('.');
                        const recordedSamplesAsString = Array.from(recordedSamples).join('.');

                        expect(recordedSamplesAsString).to.not.include(playedSamplesAsString);
                    });
                }
            }
        });

        describe('with a sampleRate inside of the range of ignored values', () => {
            for (const [sampleRate, playbackRates] of [
                [44100, [881 / 882 + 0.000000000000001, 1, 882 / 881 - 0.000000000000001]],
                [48000, [959 / 960 + 0.000000000000001, 1, 960 / 959 - 0.000000000000001]]
            ]) {
                for (const playbackRate of playbackRates) {
                    it(`should not modifiy the signal at a sampleRate of ${sampleRate} with a playbackRate of ${playbackRate}`, async () => {
                        const playedSamples = new Int16Array(
                            Array.from({ length: 1000 }, () => Math.floor(Math.random() * 2 ** 16) - 2 ** 15)
                        );
                        const recordedSamples = await recordSamples(playbackRate, playedSamples, sampleRate);
                        const playedSamplesAsString = Array.from(playedSamples).join('.');
                        const recordedSamplesAsString = Array.from(recordedSamples).join('.');

                        expect(recordedSamplesAsString).to.include(playedSamplesAsString);
                    });
                }
            }
        });
    });
});
