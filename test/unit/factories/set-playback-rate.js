import { beforeEach, describe, expect, it } from 'vitest';
import { createSetPlaybackRate } from '../../../src/factories/set-playback-rate';
import { stub } from 'sinon';

describe('setPlaybackRate()', () => {
    let mediaElement;
    let negativeMaximum;
    let playbackRateAssignments;
    let playbackRateSetter;
    let playbackRateValue;
    let positiveMinimum;
    let setPlaybackRate;

    beforeEach(() => {
        playbackRateSetter = stub();
        mediaElement = Object.create(null, {
            playbackRate: {
                get() {
                    return playbackRateValue;
                },
                set(value) {
                    playbackRateSetter(value);

                    playbackRateValue = value + (Math.random() - 0.5) / 100;
                }
            }
        });
        negativeMaximum = 0.9;
        playbackRateAssignments = new WeakMap();
        positiveMinimum = 1.1;

        setPlaybackRate = createSetPlaybackRate(negativeMaximum, playbackRateAssignments, positiveMinimum);
    });

    describe('without any previous assignment', () => {
        let previousValue;

        beforeEach(() => {
            previousValue = 0.9;
        });

        describe('with a nextValue outside of the range of ignored values', () => {
            let nextValue;

            beforeEach(() => {
                nextValue = 0.8;
            });

            it('should set the playbackRate to nextValue', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
            });

            it('should cache the playbackRate and nextValue', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
            });
        });

        describe('with a negative nextValue above the maximum negative value', () => {
            let nextValue;

            beforeEach(() => {
                nextValue = 0.95;
            });

            it('should set the playbackRate to the maximum negative value', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateSetter).to.have.been.calledOnce.and.calledWithExactly(negativeMaximum);
            });

            it('should cache the playbackRate and nextValue', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
            });
        });

        describe('with a positive nextValue below the minimum positive value', () => {
            let nextValue;

            beforeEach(() => {
                nextValue = 1.05;
            });

            it('should set the playbackRate to the minimum positive value', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateSetter).to.have.been.calledOnce.and.calledWithExactly(positiveMinimum);
            });

            it('should cache the playbackRate and nextValue', () => {
                setPlaybackRate(mediaElement, previousValue, nextValue);

                expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
            });
        });
    });

    describe('without a previous assignment with the same values', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 0.8;
            previousValue = 0.9;

            setPlaybackRate(mediaElement, previousValue, nextValue);

            playbackRateSetter.reset();
        });

        it('should not set the playbackRate', () => {
            setPlaybackRate(mediaElement, playbackRateValue, nextValue);

            expect(playbackRateSetter).to.have.not.been.called;
        });

        it('should cache the playbackRate and nextValue', () => {
            setPlaybackRate(mediaElement, playbackRateValue, nextValue);

            expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
        });
    });

    describe('without a previous assignment with the same previousValue', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 0.8;
            previousValue = 0.9;

            setPlaybackRate(mediaElement, previousValue, 1.2);

            playbackRateSetter.reset();
        });

        it('should set the playbackRate to nextValue', () => {
            setPlaybackRate(mediaElement, previousValue, nextValue);

            expect(playbackRateSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
        });

        it('should cache the playbackRate and nextValue', () => {
            setPlaybackRate(mediaElement, previousValue, nextValue);

            expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
        });
    });

    describe('without a previous assignment with the same nextValue', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 0.8;
            previousValue = 0.9;

            setPlaybackRate(mediaElement, 1.1, nextValue);

            playbackRateSetter.reset();
        });

        it('should set the playbackRate to nextValue', () => {
            setPlaybackRate(mediaElement, previousValue, nextValue);

            expect(playbackRateSetter).to.have.been.calledOnce.and.calledWithExactly(nextValue);
        });

        it('should cache the playbackRate and nextValue', () => {
            setPlaybackRate(mediaElement, previousValue, nextValue);

            expect(playbackRateAssignments.get(mediaElement)).to.deep.equal([playbackRateValue, nextValue]);
        });
    });
});
