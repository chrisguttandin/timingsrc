import { createUpdateGradually } from '../../../src/factories/update-gradually';
import { stub } from 'sinon';

describe('updateGradually()', () => {
    let computeVelocity;
    let maximumValue;
    let minimumValue;
    let threshold;
    let tolerance;
    let updateGradually;

    beforeEach(() => {
        computeVelocity = stub();
        maximumValue = 2;
        minimumValue = 0.2;
        threshold = 2;
        tolerance = 1;

        computeVelocity.returns('a fake velocity');

        updateGradually = createUpdateGradually(computeVelocity, [minimumValue, maximumValue], threshold, tolerance);
    });

    describe('with a velocity below zero', () => {
        let velocity;

        beforeEach(() => {
            velocity = -1;
        });

        describe('with a position below zero', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = -2;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = 2;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = 3;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = 4;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = 7;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let position;
            let timingStateVector;

            beforeEach(() => {
                position = 8;
                timingStateVector = { position, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position, velocity: 0 });
            });
        });
    });

    describe('with a velocity of zero', () => {
        let velocity;

        beforeEach(() => {
            velocity = 0;
        });

        describe('with a position below zero', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: -2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });
    });

    describe('with a velocity below the minimum value', () => {
        let velocity;

        beforeEach(() => {
            velocity = 0.1;
        });

        describe('with a position below zero', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: -2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: -2, velocity: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 2, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 3, velocity: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 4, velocity: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 7, velocity: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 8, velocity: 0 });
            });
        });
    });

    describe('with a velocity within the supported range of playbackRate values', () => {
        let velocity;

        beforeEach(() => {
            velocity = 1;
        });

        describe('with a position below zero', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: -2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({
                    mediaElementDelay: 0,
                    position: 5,
                    velocity: 'a fake velocity'
                });

                expect(computeVelocity).to.have.been.calledOnce.and.calledWithExactly(2, minimumValue, maximumValue, velocity);
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an updated position but an unchanged velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 5, velocity });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({
                    mediaElementDelay: 0,
                    position: 5,
                    velocity: 'a fake velocity'
                });

                expect(computeVelocity).to.have.been.calledOnce.and.calledWithExactly(-2, minimumValue, maximumValue, velocity);
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ ...timingStateVector, mediaElementDelay: 0 });
            });
        });
    });

    describe('with a velocity above the maximum value', () => {
        let velocity;

        beforeEach(() => {
            velocity = 3;
        });

        describe('with a position below zero', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: -2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: -2, velocity: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 2, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 3, velocity: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 4, velocity: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 7, velocity: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5, null)).to.deep.equal({ mediaElementDelay: 0, position: 8, velocity: 0 });
            });
        });
    });
});
