import { pause } from '../../../src/functions/pause';
import { spy } from 'sinon';

describe('pause()', () => {
    describe('with a paused media element', () => {
        let mediaElement;

        beforeEach(() => {
            mediaElement = { pause: spy(), paused: true };
        });

        it('should not call pause() on the given media element', () => {
            pause(mediaElement);

            expect(mediaElement.pause).to.have.not.been.called;
        });
    });

    describe('with a media element that is not paused', () => {
        let mediaElement;

        beforeEach(() => {
            mediaElement = { pause: spy(), paused: false };
        });

        it('should call pause() on the given media element', () => {
            pause(mediaElement);

            expect(mediaElement.pause).to.have.been.calledOnce;
        });
    });
});
