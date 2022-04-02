import { createUpdateGradually } from '../../../src/factories/update-gradually';

describe('updateGradually()', () => {
    let timeConstant;
    let threshold;
    let tolerance;
    let updateGradually;

    beforeEach(() => {
        timeConstant = 0.5;
        threshold = 2;
        tolerance = 1;

        updateGradually = createUpdateGradually(timeConstant, threshold, tolerance);
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

    describe('with a velocity other than zero', () => {
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

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an updated position and velocity', () => {
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: -3 });
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
                expect(updateGradually(timingStateVector, 5)).to.deep.equal({ position: 5, velocity: 5 });
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
