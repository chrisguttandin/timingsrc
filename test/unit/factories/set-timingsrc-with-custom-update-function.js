import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createSetTimingsrcWithCustomUpdateFunction } from '../../../src/factories/set-timingsrc-with-custom-update-function';

describe('setTimingsrcWithCustomUpdateFunction()', () => {
    let animationFrame;
    let clearInterval;
    let document;
    let intervalId;
    let mediaElement;
    let on;
    let prepareTimingStateVector;
    let prepareUpdateVector;
    let preparedTimingStateVector;
    let preparedUpdateVector;
    let setInterval;
    let setTimingsrcWithCustomUpdateFunction;
    let subscribeToAnimationFrame;
    let subscribeToOn;
    let timingObject;
    let timingStateVector;
    let unsubscribeFromAnimationFrame;
    let unsubscribeFromOn;
    let updateFunction;
    let updateMediaElement;
    let updateVector;

    beforeEach(() => {
        animationFrame = vi.fn();
        clearInterval = vi.fn();
        document = { visibilityState: 'hidden' };
        intervalId = 'a fake intervalId';
        mediaElement = { currentTime: 'a fake currentTime', playbackRate: 'a fake playbackRate' };
        on = vi.fn();
        prepareTimingStateVector = vi.fn();
        prepareUpdateVector = vi.fn();
        preparedTimingStateVector = 'a fake preparedTimingStateVector';
        preparedUpdateVector = { position: 'a prepared position', velocity: 'a prepared velocity' };
        setInterval = vi.fn();
        subscribeToAnimationFrame = vi.fn();
        subscribeToOn = vi.fn();
        timingObject = { query: vi.fn() };
        timingStateVector = 'a fake timingStateVector';
        unsubscribeFromAnimationFrame = vi.fn();
        unsubscribeFromOn = vi.fn();
        updateFunction = vi.fn();
        updateVector = { position: 'a fake position', velocity: 'a fake velocity' };
        updateMediaElement = vi.fn();

        animationFrame.mockReturnValue(subscribeToAnimationFrame);
        on.mockReturnValue(subscribeToOn);
        prepareTimingStateVector.mockReturnValue(preparedTimingStateVector);
        prepareUpdateVector.mockReturnValue(preparedUpdateVector);
        setInterval.mockReturnValue(intervalId);
        subscribeToAnimationFrame.mockReturnValue(unsubscribeFromAnimationFrame);
        subscribeToOn.mockReturnValue(unsubscribeFromOn);
        timingObject.query.mockReturnValue(timingStateVector);
        updateFunction.mockReturnValue(updateVector);

        setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(
            animationFrame,
            clearInterval,
            document,
            on,
            setInterval,
            updateMediaElement
        );
    });

    for (const [withPrepareTimingStateVectorFunction, withPrepareUpdateVectorFunction] of [
        [true, true],
        [true, false],
        [false, true],
        [false, false]
    ]) {
        describe(`${withPrepareTimingStateVectorFunction ? 'with' : 'without'} a prepareTimingStateVector function and ${
            withPrepareUpdateVectorFunction ? 'with' : 'without'
        } a prepareUpdateVector function`, () => {
            let args;

            beforeEach(
                () =>
                    (args = withPrepareTimingStateVectorFunction
                        ? withPrepareUpdateVectorFunction
                            ? [mediaElement, timingObject, updateFunction, prepareTimingStateVector, prepareUpdateVector]
                            : [mediaElement, timingObject, updateFunction, prepareTimingStateVector, null]
                        : withPrepareUpdateVectorFunction
                          ? [mediaElement, timingObject, updateFunction, null, prepareUpdateVector]
                          : [mediaElement, timingObject, updateFunction, null, null])
            );

            it('should call query() on the given timingObject', () => {
                setTimingsrcWithCustomUpdateFunction(...args);

                expect(timingObject.query).to.have.been.calledOnce.and.calledWith();
            });

            if (withPrepareTimingStateVectorFunction) {
                it('should call prepareTimingStateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWith(timingStateVector);
                });
            } else {
                it('should not call prepareTimingStateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareTimingStateVector).to.have.not.been.called;
                });
            }

            it('should call updateFunction()', () => {
                setTimingsrcWithCustomUpdateFunction(...args);

                expect(updateFunction).to.have.been.calledOnce.and.calledWith(
                    withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                    mediaElement.currentTime,
                    null
                );
            });

            if (withPrepareUpdateVectorFunction) {
                it('should call prepareUpdateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareUpdateVector).to.have.been.calledOnce.and.calledWith(updateVector);
                });
            } else {
                it('should not call prepareUpdateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareUpdateVector).to.have.not.been.called;
                });
            }

            describe('with an undefined duration', () => {
                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                        mediaElement.currentTime,
                        0,
                        mediaElement,
                        mediaElement.playbackRate,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.position : updateVector.position,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.velocity : updateVector.velocity
                    );
                });
            });

            describe('with a duration which is not a number', () => {
                beforeEach(() => {
                    mediaElement.duration = NaN;
                });

                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                        mediaElement.currentTime,
                        0,
                        mediaElement,
                        mediaElement.playbackRate,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.position : updateVector.position,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.velocity : updateVector.velocity
                    );
                });
            });

            describe('with a duration of type number', () => {
                beforeEach(() => {
                    mediaElement.duration = 18;
                });

                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                        mediaElement.currentTime,
                        18,
                        mediaElement,
                        mediaElement.playbackRate,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.position : updateVector.position,
                        withPrepareUpdateVectorFunction ? preparedUpdateVector.velocity : updateVector.velocity
                    );
                });
            });

            describe('with a velocity of 0', () => {
                beforeEach(() => {
                    if (withPrepareUpdateVectorFunction) {
                        prepareUpdateVector.mockReturnValue({ ...preparedUpdateVector, velocity: 0 });
                    } else {
                        updateFunction.mockReturnValue({ ...updateVector, velocity: 0 });
                    }
                });

                it('should not call setInterval', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(setInterval).to.have.not.been.called;
                });

                it('should not call animationFrame', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(animationFrame).to.have.not.been.called;
                });

                it('should call on to subscribe to the change event of the given timingObject', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(on).to.have.been.calledOnce.and.calledWith(timingObject, 'change');
                });

                it('should call the function returned by on', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToOn).to.have.been.calledOnce;

                    expect(subscribeToOn.mock.calls[0].length).to.equal(1);
                    expect(subscribeToOn.mock.calls[0][0]).to.be.a('function');
                });

                it('should return a function that calls the function returned by the function returned by on', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromOn).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromOn).to.have.been.calledOnce.and.calledWith();
                });

                describe('on a new change event', () => {
                    let next;
                    let nextPreparedUpdateVector;
                    let nextUpdateVector;

                    beforeEach(() => {
                        nextPreparedUpdateVector = { position: 'another prepated position', velocity: 'another prepated veloctiy' };
                        nextUpdateVector = { position: 'another fake position', velocity: 'another fake veloctiy' };

                        subscribeToOn.mockImplementation((value) => {
                            next = value;

                            return unsubscribeFromOn;
                        });

                        setTimingsrcWithCustomUpdateFunction(...args);

                        prepareTimingStateVector.mockClear();
                        prepareUpdateVector.mockClear();
                        timingObject.query.mockClear();
                        updateFunction.mockClear();
                        updateMediaElement.mockClear();

                        prepareUpdateVector.mockReturnValue(nextPreparedUpdateVector);
                        updateFunction.mockReturnValue(nextUpdateVector);
                    });

                    it('should call query() on the given timingObject', () => {
                        next();

                        expect(timingObject.query).to.have.been.calledOnce.and.calledWith();
                    });

                    if (withPrepareTimingStateVectorFunction) {
                        it('should call prepareTimingStateVector()', () => {
                            next();

                            expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWith(timingStateVector);
                        });
                    } else {
                        it('should not call prepareTimingStateVector()', () => {
                            next();

                            expect(prepareTimingStateVector).to.have.not.been.called;
                        });
                    }

                    it('should call updateFunction()', () => {
                        next();

                        expect(updateFunction).to.have.been.calledOnce.and.calledWith(
                            withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                            mediaElement.currentTime,
                            { ...(withPrepareUpdateVectorFunction ? preparedUpdateVector : updateVector), velocity: 0 }
                        );
                    });

                    it('should call updateFunction() with the return value of the previous invocation', () => {
                        next();
                        next();

                        expect(updateFunction).to.have.been.calledTwice.and.calledWith(
                            withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                            mediaElement.currentTime,
                            withPrepareUpdateVectorFunction ? nextPreparedUpdateVector : nextUpdateVector
                        );
                    });

                    if (withPrepareUpdateVectorFunction) {
                        it('should call prepareUpdateVector()', () => {
                            next();

                            expect(prepareUpdateVector).to.have.been.calledOnce.and.calledWith(nextUpdateVector);
                        });
                    } else {
                        it('should not call prepareUpdateVector()', () => {
                            next();

                            expect(prepareUpdateVector).to.have.not.been.called;
                        });
                    }

                    describe('with an undefined duration', () => {
                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                mediaElement.currentTime,
                                0,
                                mediaElement,
                                mediaElement.playbackRate,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                            );
                        });
                    });

                    describe('with a duration which is not a number', () => {
                        beforeEach(() => {
                            mediaElement.duration = NaN;
                        });

                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                mediaElement.currentTime,
                                0,
                                mediaElement,
                                mediaElement.playbackRate,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                            );
                        });
                    });

                    describe('with a duration of type number', () => {
                        beforeEach(() => {
                            mediaElement.duration = 18;
                        });

                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                mediaElement.currentTime,
                                18,
                                mediaElement,
                                mediaElement.playbackRate,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                            );
                        });
                    });
                });
            });

            describe('with a velocity other than 0', () => {
                it('should call setInterval', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(setInterval).to.have.been.calledOnce;

                    expect(setInterval.mock.calls[0].length).to.equal(2);
                    expect(setInterval.mock.calls[0][0]).to.be.a('function');
                    expect(setInterval.mock.calls[0][1]).to.equal(100);
                });

                it('should call animationFrame without any arguments', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(animationFrame).to.have.been.calledOnce.and.calledWith();
                });

                it('should call the function returned by animationFrame', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToAnimationFrame).to.have.been.calledOnce;

                    expect(subscribeToAnimationFrame.mock.calls[0].length).to.equal(1);
                    expect(subscribeToAnimationFrame.mock.calls[0][0]).to.be.a('function');
                });

                it('should call on to subscribe to the change event of the given timingObject', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(on).to.have.been.calledOnce.and.calledWith(timingObject, 'change');
                });

                it('should call the function returned by on', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToOn).to.have.been.calledOnce;

                    expect(subscribeToOn.mock.calls[0].length).to.equal(1);
                    expect(subscribeToOn.mock.calls[0][0]).to.be.a('function');
                });

                it('should return a function that calls clearInterval', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(clearInterval).to.have.not.been.called;

                    unsubscribe();

                    expect(clearInterval).to.have.been.calledOnce.and.calledWith(intervalId);
                });

                it('should return a function that calls the function returned by the function returned by animationFrame', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromAnimationFrame).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromAnimationFrame).to.have.been.calledOnce.and.calledWith();
                });

                it('should return a function that calls the function returned by the function returned by on', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromOn).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromOn).to.have.been.calledOnce.and.calledWith();
                });

                for (const event of ['animationFrame', 'change event', 'interval']) {
                    describe(`on a new ${event}`, () => {
                        let next;
                        let nextPreparedUpdateVector;
                        let nextUpdateVector;

                        beforeEach(() => {
                            nextPreparedUpdateVector = { position: 'another prepated position', velocity: 'another prepated veloctiy' };
                            nextUpdateVector = { position: 'another fake position', velocity: 'another fake veloctiy' };

                            (event === 'animationFrame'
                                ? subscribeToAnimationFrame
                                : event === 'change event'
                                  ? subscribeToOn
                                  : setInterval
                            ).mockImplementation((value) => {
                                next = value;

                                return event === 'animationFrame'
                                    ? unsubscribeFromAnimationFrame
                                    : event === 'change event'
                                      ? unsubscribeFromOn
                                      : intervalId;
                            });

                            setTimingsrcWithCustomUpdateFunction(...args);

                            prepareTimingStateVector.mockClear();
                            prepareUpdateVector.mockClear();
                            setInterval.mockClear();
                            timingObject.query.mockClear();
                            updateFunction.mockClear();
                            updateMediaElement.mockClear();

                            prepareUpdateVector.mockReturnValue(nextPreparedUpdateVector);
                            updateFunction.mockReturnValue(nextUpdateVector);
                        });

                        if (event === 'interval') {
                            it('should not call clearInterval', () => {
                                next();

                                expect(clearInterval).to.have.not.been.called;
                            });
                        } else {
                            it('should call clearInterval', () => {
                                next();

                                expect(clearInterval).to.have.been.calledOnce.and.calledWith(intervalId);
                            });
                        }

                        if (event === 'interval') {
                            it('should not call setInterval', () => {
                                next();

                                expect(setInterval).to.have.not.been.called;
                            });
                        } else {
                            it('should call setInterval', () => {
                                next();

                                expect(setInterval).to.have.been.calledOnce;

                                expect(setInterval.mock.calls[0].length).to.equal(2);
                                expect(setInterval.mock.calls[0][0]).to.be.a('function');
                                expect(setInterval.mock.calls[0][1]).to.equal(100);
                            });
                        }

                        it('should call query() on the given timingObject', () => {
                            next();

                            expect(timingObject.query).to.have.been.calledOnce.and.calledWith();
                        });

                        if (withPrepareTimingStateVectorFunction) {
                            it('should call prepareTimingStateVector()', () => {
                                next();

                                expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWith(timingStateVector);
                            });
                        } else {
                            it('should not call prepareTimingStateVector()', () => {
                                next();

                                expect(prepareTimingStateVector).to.have.not.been.called;
                            });
                        }

                        it('should call updateFunction()', () => {
                            next();

                            expect(updateFunction).to.have.been.calledOnce.and.calledWith(
                                withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                                mediaElement.currentTime,
                                withPrepareUpdateVectorFunction ? preparedUpdateVector : updateVector
                            );
                        });

                        it('should call updateFunction() with the return value of the previous invocation', () => {
                            next();
                            next();

                            expect(updateFunction).to.have.been.calledTwice.and.calledWith(
                                withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                                mediaElement.currentTime,
                                withPrepareUpdateVectorFunction ? nextPreparedUpdateVector : nextUpdateVector
                            );
                        });

                        if (withPrepareUpdateVectorFunction) {
                            it('should call prepareUpdateVector()', () => {
                                next();

                                expect(prepareUpdateVector).to.have.been.calledOnce.and.calledWith(nextUpdateVector);
                            });
                        } else {
                            it('should not call prepareUpdateVector()', () => {
                                next();

                                expect(prepareUpdateVector).to.have.not.been.called;
                            });
                        }

                        describe('with an undefined duration', () => {
                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                    mediaElement.currentTime,
                                    0,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                                );
                            });
                        });

                        describe('with a duration which is not a number', () => {
                            beforeEach(() => {
                                mediaElement.duration = NaN;
                            });

                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                    mediaElement.currentTime,
                                    0,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                                );
                            });
                        });

                        describe('with a duration of type number', () => {
                            beforeEach(() => {
                                mediaElement.duration = 18;
                            });

                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWith(
                                    mediaElement.currentTime,
                                    18,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.position : nextUpdateVector.position,
                                    withPrepareUpdateVectorFunction ? nextPreparedUpdateVector.velocity : nextUpdateVector.velocity
                                );
                            });
                        });
                    });
                }
            });
        });
    }
});
