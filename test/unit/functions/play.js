import { beforeEach, describe, expect, it, vi } from 'vitest';
import { play } from '../../../src/functions/play';

describe('play()', () => {
    describe('with a paused media element', () => {
        let mediaElement;

        beforeEach(() => {
            mediaElement = { paused: true, play: vi.fn() };

            mediaElement.play.mockResolvedValue();
        });

        it('should call play() on the given media element', () => {
            play(mediaElement);

            expect(mediaElement.play).to.have.been.calledOnce;
        });
    });

    describe('with a media element that is not paused', () => {
        let mediaElement;

        beforeEach(() => {
            mediaElement = { paused: false, play: vi.fn() };

            mediaElement.play.mockResolvedValue();
        });

        it('should not call play() on the given media element', () => {
            play(mediaElement);

            expect(mediaElement.play).to.have.not.been.called;
        });
    });
});
