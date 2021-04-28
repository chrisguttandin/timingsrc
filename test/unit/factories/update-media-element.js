import { spy, stub } from 'sinon';
import { createUpdateMediaElement } from '../../../src/factories/update-media-element';

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

        updateMediaElement = createUpdateMediaElement(pause, play);

        currentTime = 10;
        duration = 20;
        mediaElement = {};
        playbackRate = 1;
        setCurrentTime = stub();
        setPlaybackRate = stub();

        Object.defineProperties(mediaElement, {
            currentTime: {
                get: () => currentTime,
                set: setCurrentTime
            },
            playbackRate: {
                get: () => playbackRate,
                set: setPlaybackRate
            }
        });

        setCurrentTime.callsFake((value) => (currentTime = value));
        setPlaybackRate.callsFake((value) => (playbackRate = value));
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(velocity);
                expect(setPlaybackRate).to.have.been.calledOnce.and.calledWithExactly(velocity);
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(currentTime);
                expect(setCurrentTime).to.have.not.been.called;
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(0);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(0);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to 0', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(0);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(0);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(position);
                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(position);
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                expect(mediaElement.currentTime).to.equal(position);
                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(position);
            });

            it('should set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(velocity);
                expect(setPlaybackRate).to.have.been.calledOnce.and.calledWithExactly(velocity);
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

                expect(mediaElement.currentTime).to.equal(position);
                expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(position);
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime below the duration', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(duration);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(duration);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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

                    expect(mediaElement.currentTime).to.equal(currentTime);
                    expect(setCurrentTime).to.have.not.been.called;
                });
            });

            describe('with a currentTime greater than 0', () => {
                it('should set the currentTime to the duration', () => {
                    updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                    expect(mediaElement.currentTime).to.equal(duration);
                    expect(setCurrentTime).to.have.been.calledOnce.and.calledWithExactly(duration);
                });
            });

            it('should not set the playbackRate', () => {
                updateMediaElement(currentTime, duration, mediaElement, playbackRate, position, velocity);

                expect(mediaElement.playbackRate).to.equal(playbackRate);
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
