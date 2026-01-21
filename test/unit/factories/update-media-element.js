import { beforeEach, describe, expect, it } from 'vitest';
import { createUpdateMediaElement } from '../../../src/factories/update-media-element';
import { spy } from 'sinon';

describe('updateMediaElement()', () => {
    let currentTime;
    let duration;
    let mediaElement;
    let pause;
    let play;
    let playbackRate;
    let setCurrentTime;
    let setPlaybackRate;
    let updateMediaElement;

    beforeEach(() => {
        pause = spy();
        play = spy();
        setCurrentTime = spy();
        setPlaybackRate = spy();

        updateMediaElement = createUpdateMediaElement(pause, play, setCurrentTime, setPlaybackRate);

        currentTime = 10;
        duration = 20;
        mediaElement = 'a fake MediaElement';
        playbackRate = 1;
    });

    describe('with an unchanged and valid position', () => {
        let position;

        beforeEach(() => {
            position = currentTime;
        });

        describe('with an unchanged velocity', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should not call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.not.been.called;
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity other than 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate * 2;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.been.calledOnce.and.calledWithExactly(mediaElement, playbackRate, velocity);
            });

            it('should not call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.not.been.called;
            });

            it('should call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });
        });

        describe('with an updated velocity of 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = 0;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });
    });

    describe('with an unchanged position of the duration', () => {
        let position;

        beforeEach(() => {
            currentTime = duration;
            position = duration;
        });

        describe('with an unchanged velocity', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity other than 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate * 2;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity of 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = 0;
            });

            it('should not set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });
    });

    describe('with an updated position below zero', () => {
        let position;

        beforeEach(() => {
            position = -2;
        });

        describe('with an unchanged velocity', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate;
            });

            describe('with a currentTime of 0', () => {
                beforeEach(() => {
                    currentTime = 0;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, 0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity other than 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate * 2;
            });

            describe('with a currentTime of 0', () => {
                beforeEach(() => {
                    currentTime = 0;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, 0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity of 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = 0;
            });

            describe('with a currentTime of 0', () => {
                beforeEach(() => {
                    currentTime = 0;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, 0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });
    });

    describe('with an updated and valid position', () => {
        let position;

        beforeEach(() => {
            position = currentTime + 2;
        });

        describe('with an unchanged velocity', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate;
            });

            it('should set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, position);
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should not call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.not.been.called;
            });

            it('should call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });
        });

        describe('with an updated velocity other than 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate * 2;
            });

            it('should set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, position);
            });

            it('should set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.been.calledOnce.and.calledWithExactly(mediaElement, playbackRate, velocity);
            });

            it('should not call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.not.been.called;
            });

            it('should call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });
        });

        describe('with an updated velocity of 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = 0;
            });

            it('should set the currentTime', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, position);
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });
    });

    describe('with an updated position above the duration', () => {
        let position;

        beforeEach(() => {
            position = duration + 2;
        });

        describe('with an unchanged velocity', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate;
            });

            describe('with a currentTime equal to the duration', () => {
                beforeEach(() => {
                    currentTime = duration;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime below the duration', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity other than 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = playbackRate * 2;
            });

            describe('with a currentTime equal to the duration', () => {
                beforeEach(() => {
                    currentTime = duration;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });

        describe('with an updated velocity of 0', () => {
            let velocity;

            beforeEach(() => {
                velocity = 0;
            });

            describe('with a currentTime equal to the duration', () => {
                beforeEach(() => {
                    currentTime = duration;
                });

                it('should not set the currentTime', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(mediaElement, currentTime, duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(setPlaybackRate).to.have.not.been.called;
            });

            it('should call pause()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(pause).to.have.been.calledOnce.and.calledWithExactly(mediaElement);
            });

            it('should not call play()', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(play).to.have.not.been.called;
            });
        });
    });
});
