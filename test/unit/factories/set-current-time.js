import { createSetCurrentTime } from '../../../src/factories/set-current-time';
import { stub } from 'sinon';

describe('setCurrentTime()', () => {
    let currentTimeAssignments;
    let currentTimeSetter;
    let currentTimeValue;
    let mediaElement;
    let setCurrentTime;

    beforeEach(() => {
        currentTimeAssignments = new WeakMap();
        currentTimeSetter = stub();
        mediaElement = Object.create(null, {
            currentTime: {
                get() {
                    return currentTimeValue;
                },
                set(value) {
                    currentTimeSetter(value);

                    currentTimeValue = value + (Math.random() - 0.5) / 100;
                }
            }
        });

        setCurrentTime = createSetCurrentTime(currentTimeAssignments);
    });

    describe('without any previous assignment', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 23;
            previousValue = 22;
        });

        it('should set the currentTime to nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
        });

        it('should cache the currentTime and nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeAssignments.get(mediaElement)).to.deep.equal([currentTimeValue, nextValue]);
        });
    });

    describe('without a previous assignment with the same values', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 23;
            previousValue = 22;

            setCurrentTime(mediaElement, previousValue, nextValue);

            currentTimeSetter.reset();
        });

        it('should not set the currentTime', () => {
            setCurrentTime(mediaElement, currentTimeValue, nextValue);

            expect(currentTimeSetter).to.have.not.been.called;
        });

        it('should cache the currentTime and nextValue', () => {
            setCurrentTime(mediaElement, currentTimeValue, nextValue);

            expect(currentTimeAssignments.get(mediaElement)).to.deep.equal([currentTimeValue, nextValue]);
        });
    });

    describe('without a previous assignment with the same previousValue', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 23;
            previousValue = 22;

            setCurrentTime(mediaElement, previousValue, 12);

            currentTimeSetter.reset();
        });

        it('should set the currentTime to nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
        });

        it('should cache the currentTime and nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeAssignments.get(mediaElement)).to.deep.equal([currentTimeValue, nextValue]);
        });
    });

    describe('without a previous assignment with the same nextValue', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 23;
            previousValue = 22;

            setCurrentTime(mediaElement, 14, nextValue);

            currentTimeSetter.reset();
        });

        it('should set the currentTime to nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
        });

        it('should cache the currentTime and nextValue', () => {
            setCurrentTime(mediaElement, previousValue, nextValue);

            expect(currentTimeAssignments.get(mediaElement)).to.deep.equal([currentTimeValue, nextValue]);
        });
    });
});
