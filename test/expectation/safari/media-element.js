import { createBlobWithOneSecondSine } from '../../helpers/create-blob-with-one-second-sine';

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

        // This test doesn't not pass when running on BrowserStack since there is no way to disable the autoplay policy.
        // eslint-disable-next-line no-undef
        if (!process.env.CI) {
            it('should not increase monotonically', (done) => {
                let currentTime = audioElement.currentTime;

                const interval = setInterval(() => {
                    if (currentTime - 0.01 > audioElement.currentTime) {
                        clearInterval(interval);
                        done();
                    } else {
                        currentTime = audioElement.currentTime;
                    }
                });

                audioElement.play();
            });
        }

        // bug #5

        it('should limit the precision after a while', (done) => {
            audioElement.oncanplaythrough = () => {
                audioElement.currentTime = 0.4003200000000007;
                audioElement.oncanplaythrough = null;

                expect(audioElement.currentTime).to.equal(0.4003200000000007);

                setTimeout(() => {
                    expect(audioElement.currentTime).to.equal(0.4003200000000007);

                    setTimeout(() => {
                        expect(audioElement.currentTime).to.equal(0.40032);

                        done();
                    }, 100);
                });
            };

            audioElement.load();
        });
    });
});
