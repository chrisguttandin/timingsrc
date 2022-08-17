import { createUpdateGradually } from '../../../src/factories/update-gradually';

describe('updateGradually()', () => {
    let timeConstant;
    let threshold;
    let tolerance;
    let updateGradually;

    beforeEach(() => {
        timeConstant = 1.5;
        threshold = 2;
        tolerance = 1;

        updateGradually = createUpdateGradually([0, Number.MAX_VALUE], timeConstant, threshold, tolerance);
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

    describe('with a velocity above zero', () => {
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

        describe('with a position below the tolerance that would result in a negative velocity', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position but a velocity of zero', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 0 });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3.75, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 1 / 6 });
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
                timingStateVector = { position: 7, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 7 / 3 });
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
});
