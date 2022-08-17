describe('MediaElement', () => {
    let audioElement;

    beforeEach(() => {
        audioElement = new Audio();
    });

    describe('playbackRate', () => {
        // bug #3

        it('should not support negative values', () => {
            expect(() => (audioElement.playbackRate = 0)).to.not.throw();
            expect(() => (audioElement.playbackRate = -0.0000000000000000000000000000000000000000000001)).to.throw(
                DOMException,
                'Operation is not supported'
            );
        });
    });
});
