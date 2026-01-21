import { beforeEach, describe, expect, it } from 'vitest';
import { determineSupportedPlaybackRateValues } from '../../../src/functions/determine-supported-playback-rate-values';
import { stub } from 'sinon';

describe('determineSupportedPlaybackRateValues()', () => {
    describe('without a window object', () => {
        it('should return the default values', () => {
            expect(determineSupportedPlaybackRateValues(null)).to.deep.equal([Number.MIN_VALUE, Number.MAX_VALUE]);
        });
    });

    describe('with a window object', () => {
        let playbackRate;
        let window;

        beforeEach(() => {
            playbackRate = stub();
            window = {
                // eslint-disable-next-line object-shorthand
                Audio: function () {
                    return {
                        set playbackRate(value) {
                            playbackRate(value);
                        }
                    };
                }
            };
        });

        describe("with an MediaElement that doesn't support a value of 17", () => {
            beforeEach(() => {
                playbackRate.throws(new Error('a fake error'));
            });

            it('should return the values supported in Chrome', () => {
                expect(determineSupportedPlaybackRateValues(window)).to.deep.equal([0.0625, 16]);

                expect(playbackRate).to.have.been.calledOnceWithExactly(17);
            });
        });

        describe("with an MediaElement that supports a value of 17 but doesn't support a value of -1", () => {
            beforeEach(() => {
                playbackRate.onFirstCall().returns(17).onSecondCall().throws(new Error('a fake error'));
            });

            it('should return the values supported in Firefox', () => {
                expect(determineSupportedPlaybackRateValues(window)).to.deep.equal([0, Number.MAX_VALUE]);

                expect(playbackRate).to.have.been.calledTwice;
                expect(playbackRate).to.have.been.calledWithExactly(17);
                expect(playbackRate).to.have.been.calledWithExactly(-1);
            });
        });

        describe('with an MediaElement that supports a value of 17 and a value of -1', () => {
            beforeEach(() => {
                playbackRate.onFirstCall().returns(17).onSecondCall().returns(-1);
            });

            it('should return the default values', () => {
                expect(determineSupportedPlaybackRateValues(window)).to.deep.equal([Number.MIN_VALUE, Number.MAX_VALUE]);

                expect(playbackRate).to.have.been.calledTwice;
                expect(playbackRate).to.have.been.calledWithExactly(17);
                expect(playbackRate).to.have.been.calledWithExactly(-1);
            });
        });
    });
});
