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
    });
});
