import { createComputeVelocity } from '../../../src/factories/compute-velocity';

describe('computeVelocity()', () => {
    let computeVelocity;
    let maximumValue;
    let minimumValue;
    let velocity;

    beforeEach(() => {
        maximumValue = 2;
        minimumValue = 0.2;
        velocity = 1;

        computeVelocity = createComputeVelocity(1.5);
    });

    describe('with a delta and velocity that would result in a velocity below the minimum value', () => {
        it('should return the minimum value', () => {
            expect(computeVelocity(2, minimumValue, maximumValue, velocity)).to.equal(minimumValue);
        });
    });

    describe('with a delta and velocity that would result in a velocity within the supported range', () => {
        for (const [delta, result] of [
            [1.125, 3 / 12],
            [-1.25, 11 / 6]
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
