import { beforeEach, describe, expect, it } from 'vitest';
import { createUpdateStepwiseFactory } from '../../../src/factories/update-stepwise-factory';
import { stub } from 'sinon';

describe('updateStepwise()', () => {
    let defaultCustomState;
    let tolerance;
    let translateTimingStateVector;
    let updateStepwise;

    beforeEach(() => {
        defaultCustomState = {
            lastAppliedPostion: 0,
            lastAppliedTimestamp: 0,
            lastAppliedVelocity: 0,
            lastPlayheadDifference: 0,
            mediaElementDelay: 0,
            numberOfDetectedResets: 0,
            numberOfExpectedResets: 1
        };
        tolerance = 1;
        translateTimingStateVector = stub();

        updateStepwise = createUpdateStepwiseFactory(translateTimingStateVector)(tolerance);
    });

    describe('with a velocity below zero', () => {
        let velocity;

        beforeEach(() => {
            velocity = -1;
        });

        describe('with a position below zero', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: -2, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: -2,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 3,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 4,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 7,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
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
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: -2,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 3,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 4,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 7,
                    lastAppliedVelocity: velocity
                });
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
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: -2,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position below the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 3, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 3,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position within the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 4, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 4,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
            });
        });

        describe('with a position above the tolerance', () => {
            let timingStateVector;

            beforeEach(() => {
                timingStateVector = { position: 7, velocity };
            });

            it('should return an unchanged position and velocity', () => {
                expect(updateStepwise({ ...timingStateVector, timestamp: 20 }, 5, null)).to.deep.equal({
                    ...timingStateVector,
                    ...defaultCustomState,
                    lastAppliedPostion: 7,
                    lastAppliedTimestamp: 20,
                    lastAppliedVelocity: velocity
                });
            });
        });
    });
});
