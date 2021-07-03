import { createSetPlaybackRate } from '../../../src/factories/set-playback-rate';
import { stub } from 'sinon';

describe('setPlaybackRate()', () => {
    let mediaElement;
    let playbackRateAssignments;
    let playbackRateSetter;
    let playbackRateValue;
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
        playbackRateAssignments = new WeakMap();

        setPlaybackRate = createSetPlaybackRate(playbackRateAssignments);
    });

    describe('without any previous assignment', () => {
        let nextValue;
        let previousValue;

        beforeEach(() => {
            nextValue = 0.8;
            previousValue = 0.9;
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
