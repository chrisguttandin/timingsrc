import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createBlobWithOneSecondSine } from '../../../helpers/create-blob-with-one-second-sine';

describe('MediaElement', () => {
    let audioElement;

    afterEach(() => URL.revokeObjectURL(audioElement.src));

    beforeEach(async () => {
        const blob = await createBlobWithOneSecondSine();
        const url = URL.createObjectURL(blob);

        audioElement = new Audio(url);

        audioElement.muted = true;
    });

    describe('currentTime', () => {
        // bug #4

        it('should not increase monotonically', () => {
            let currentTime = audioElement.currentTime;

            audioElement.play();

            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (currentTime - 0.01 > audioElement.currentTime) {
                        clearInterval(interval);
                        resolve();
                    } else {
                        currentTime = audioElement.currentTime;
                    }
                });
            });
        });

        // bug #5

        it('should limit the precision after a while', () => {
            audioElement.load();

            return new Promise((resolve) => {
                audioElement.oncanplaythrough = () => {
                    audioElement.oncanplaythrough = null;

                    audioElement.currentTime = 0.4003200000000007;
                    audioElement.oncanplaythrough = null;

                    expect(audioElement.currentTime).to.equal(0.4003200000000007);

                    setTimeout(() => {
                        expect(audioElement.currentTime).to.equal(0.40032);

                        resolve();
                    }, 100);
                };
            });
        });
    });
});
