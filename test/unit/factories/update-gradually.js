import { createUpdateGradually } from '../../../src/factories/update-gradually';

describe('updateGradually()', () => {
    let maximumValue;
    let minimumValue;
    let timeConstant;
    let threshold;
    let tolerance;
    let updateGradually;

    beforeEach(() => {
        maximumValue = 2;
        minimumValue = 0.2;
        timeConstant = 1.5;
        threshold = 2;
        tolerance = 1;

        updateGradually = createUpdateGradually([minimumValue, maximumValue], timeConstant, threshold, tolerance);
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: -2, velocity: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 2, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 3, velocity: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 4, velocity: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 7, velocity: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 8, velocity: 0 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
            });
        });

        describe('with a position below the tolerance that would result in a velocity below the minimum value', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: minimumValue });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3.875, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 3 / 12 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an updated position but an unchanged velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 6.25, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 11 / 6 });
            });
        });

        describe('with a position above the tolerance that would result in a velocity above the maximum value', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: maximumValue });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal(timingStateVector);
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: -2, velocity: 0 });
            });
        });

        describe('with a position below the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 2, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 2, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 3, velocity: 0 });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 4, velocity: 0 });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 7, velocity: 0 });
            });
        });

        describe('with a position above the threshold', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 8, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 8, velocity: 0 });
            });
        });
    });
});
