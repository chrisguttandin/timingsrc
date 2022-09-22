import { stub } from 'sinon';
import { updateVectorWithNewPosition } from '../../../src/functions/update-vector-with-new-position';

describe('updateVectorWithNewPosition()', () => {
    let mediaElementDelay = 36;
    let position = 12;
    let updateVelocity;

    beforeEach(() => {
        mediaElementDelay = 36;
        position = 12;
        updateVelocity = stub();

        updateVelocity.returns('a fake velocity');
    });

    it('should call updateVelocity() with the new position', () => {
        updateVectorWithNewPosition(mediaElementDelay, position, updateVelocity);

        expect(updateVelocity).to.have.been.calledOnce.and.calledWithExactly(48);
    });

    it('should return an update vector with the new position', () => {
        expect(updateVectorWithNewPosition(mediaElementDelay, position, updateVelocity)).to.deep.equal({
            mediaElementDelay,
            position: 48,
            velocity: 'a fake velocity'
        });
    });
});
