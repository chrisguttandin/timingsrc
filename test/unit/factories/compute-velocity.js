import { createComputeVelocity } from '../../../src/factories/compute-velocity';

describe('computeVelocity()', () => {
    let computeVelocity;
    let maximumValue;
    let minimumValue;
    let velocity;

    beforeEach(() => {
        maximumValue = 2;
        minimumValue = 0.5;
        velocity = 1;

        computeVelocity = createComputeVelocity(0.5);
    });

    describe('with a delta and velocity that would result in a velocity below the minimum value', () => {
        it('should return the minimum value', () => {
            expect(computeVelocity(2, minimumValue, maximumValue, velocity)).to.equal(minimumValue);
        });
    });

    describe('with a delta and velocity that would result in a velocity within the supported range', () => {
        for (const [delta, result] of [
            [-0.4, 1.8],
            [-0.2, 1.4],
            [-0.125, 1.25],
            [-0.1, 1.2],
            [0.1, 1 / 1.2],
            [0.125, 1 / 1.25],
            [0.2, 1 / 1.4],
            [0.4, 1 / 1.8]
        ]) {
            it('should return the computed velocity', () => {
                expect(computeVelocity(delta, minimumValue, maximumValue, velocity)).to.equal(result);
            });
        }
    });

    describe('with a delta and velocity that would result in a velocity above the maximum value', () => {
        it('should return the maximum value', () => {
            expect(computeVelocity(-2, minimumValue, maximumValue, velocity)).to.equal(maximumValue);
        });
    });
});
