import { spy, stub } from 'sinon';
import { createSetTimingsrcWithCustomUpdateFunction } from '../../../src/factories/set-timingsrc-with-custom-update-function';

describe('setTimingsrcWithCustomUpdateFunction()', () => {
    let animationFrame;
    let document;
    let mediaElement;
    let on;
    let position;
    let prepareTimingStateVector;
    let preparedTimingStateVector;
    let setTimingsrcWithCustomUpdateFunction;
    let subscribeToAnimationFrame;
    let subscribeToOn;
    let timingObject;
    let timingStateVector;
    let unsubscribeFromAnimationFrame;
    let unsubscribeFromOn;
    let updateFunction;
    let updateMediaElement;
    let velocity;

    beforeEach(() => {
        animationFrame = stub();
        document = { visibilityState: 'hidden' };
        mediaElement = { currentTime: 'a fake currentTime', playbackRate: 'a fake playbackRate' };
        on = stub();
        position = 'a fake position';
        prepareTimingStateVector = stub();
        preparedTimingStateVector = 'a fake preparedTimingStateVector';
        subscribeToAnimationFrame = stub();
        subscribeToOn = stub();
        timingObject = { query: stub() };
        timingStateVector = 'a fake timingStateVector';
        unsubscribeFromAnimationFrame = spy();
        unsubscribeFromOn = spy();
        updateFunction = stub();
        updateMediaElement = spy();
        velocity = 'a fake velocity';

        animationFrame.returns(subscribeToAnimationFrame);
        on.returns(subscribeToOn);
        prepareTimingStateVector.returns(preparedTimingStateVector);
        subscribeToAnimationFrame.returns(unsubscribeFromAnimationFrame);
        subscribeToOn.returns(unsubscribeFromOn);
        timingObject.query.returns(timingStateVector);
        updateFunction.returns({ position, velocity });

        setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(animationFrame, document, on, updateMediaElement);
    });

    for (const withPrepareTimingStateVectorFunction of [true, false]) {
        describe(`${withPrepareTimingStateVectorFunction ? 'with' : 'without'} a prepareTimingStateVector function`, () => {
            let args;

            beforeEach(
                () =>
                    (args = withPrepareTimingStateVectorFunction
                        ? [mediaElement, timingObject, updateFunction, prepareTimingStateVector]
                        : [mediaElement, timingObject, updateFunction])
            );

            it('should call query() on the given timingObject', () => {
                setTimingsrcWithCustomUpdateFunction(...args);

                expect(timingObject.query).to.have.been.calledOnce.and.calledWithExactly();
            });

            if (withPrepareTimingStateVectorFunction) {
                it('should call prepareTimingStateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWithExactly(timingStateVector);
                });
            } else {
                it('should not call prepareTimingStateVector()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(prepareTimingStateVector).to.have.not.been.called;
                });
            }

            it('should call updateFunction()', () => {
                setTimingsrcWithCustomUpdateFunction(...args);

                expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(
                    withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                    mediaElement.currentTime,
                    null
                );
            });

            describe('with an undefined duration', () => {
                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                        mediaElement.currentTime,
                        0,
                        mediaElement,
                        mediaElement.playbackRate,
                        position,
                        velocity
                    );
                });
            });

            describe('with a duration which is not a number', () => {
                beforeEach(() => {
                    mediaElement.duration = NaN;
                });

                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                        mediaElement.currentTime,
                        0,
                        mediaElement,
                        mediaElement.playbackRate,
                        position,
                        velocity
                    );
                });
            });

            describe('with a duration of type number', () => {
                beforeEach(() => {
                    mediaElement.duration = 18;
                });

                it('should call updateMediaElement()', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                        mediaElement.currentTime,
                        18,
                        mediaElement,
                        mediaElement.playbackRate,
                        position,
                        velocity
                    );
                });
            });

            describe('with a velocity of 0', () => {
                beforeEach(() => {
                    updateFunction.returns({ position, velocity: 0 });
                });

                it('should not call animationFrame', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(animationFrame).to.have.not.been.called;
                });

                it('should call on to subscribe to the change event of the given timingObject', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(on).to.have.been.calledOnce.and.calledWithExactly(timingObject, 'change');
                });

                it('should call the function returned by on', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToOn).to.have.been.calledOnce;

                    expect(subscribeToOn.firstCall.args.length).to.equal(1);
                    expect(subscribeToOn.firstCall.args[0]).to.be.a('function');
                });

                it('should return a function that calls the function returned by the function returned by on', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromOn).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromOn).to.have.been.calledOnce.and.calledWithExactly();
                });

                describe('on a new change event', () => {
                    let next;
                    let updateVector;

                    beforeEach(() => {
                        updateVector = { position: 'another fake position', velocity: 'another fake veloctiy' };

                        subscribeToOn.callsFake((value) => {
                            next = value;

                            return unsubscribeFromOn;
                        });

                        setTimingsrcWithCustomUpdateFunction(...args);

                        prepareTimingStateVector.resetHistory();
                        timingObject.query.resetHistory();
                        updateFunction.resetHistory();
                        updateMediaElement.resetHistory();

                        updateFunction.returns(updateVector);
                    });

                    it('should call query() on the given timingObject', () => {
                        next();

                        expect(timingObject.query).to.have.been.calledOnce.and.calledWithExactly();
                    });

                    if (withPrepareTimingStateVectorFunction) {
                        it('should call prepareTimingStateVector()', () => {
                            next();

                            expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWithExactly(timingStateVector);
                        });
                    } else {
                        it('should not call prepareTimingStateVector()', () => {
                            setTimingsrcWithCustomUpdateFunction(...args);

                            expect(prepareTimingStateVector).to.have.not.been.called;
                        });
                    }

                    it('should call updateFunction()', () => {
                        next();

                        expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(
                            withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                            mediaElement.currentTime,
                            {
                                position,
                                velocity: 0
                            }
                        );
                    });

                    it('should call updateFunction() with the return value of the previous invocation', () => {
                        next();
                        next();

                        expect(updateFunction).to.have.been.calledTwice.and.calledWithExactly(
                            withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                            mediaElement.currentTime,
                            updateVector
                        );
                    });

                    describe('with an undefined duration', () => {
                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                mediaElement.currentTime,
                                0,
                                mediaElement,
                                mediaElement.playbackRate,
                                updateVector.position,
                                updateVector.velocity
                            );
                        });
                    });

                    describe('with a duration which is not a number', () => {
                        beforeEach(() => {
                            mediaElement.duration = NaN;
                        });

                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                mediaElement.currentTime,
                                0,
                                mediaElement,
                                mediaElement.playbackRate,
                                updateVector.position,
                                updateVector.velocity
                            );
                        });
                    });

                    describe('with a duration of type number', () => {
                        beforeEach(() => {
                            mediaElement.duration = 18;
                        });

                        it('should call updateMediaElement()', () => {
                            next();

                            expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                mediaElement.currentTime,
                                18,
                                mediaElement,
                                mediaElement.playbackRate,
                                updateVector.position,
                                updateVector.velocity
                            );
                        });
                    });
                });
            });

            describe('with a velocity other than 0', () => {
                it('should call animationFrame without any arguments', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(animationFrame).to.have.been.calledOnce.and.calledWithExactly();
                });

                it('should call the function returned by animationFrame', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToAnimationFrame).to.have.been.calledOnce;

                    expect(subscribeToAnimationFrame.firstCall.args.length).to.equal(1);
                    expect(subscribeToAnimationFrame.firstCall.args[0]).to.be.a('function');
                });

                it('should call on to subscribe to the change event of the given timingObject', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(on).to.have.been.calledOnce.and.calledWithExactly(timingObject, 'change');
                });

                it('should call the function returned by on', () => {
                    setTimingsrcWithCustomUpdateFunction(...args);

                    expect(subscribeToOn).to.have.been.calledOnce;

                    expect(subscribeToOn.firstCall.args.length).to.equal(1);
                    expect(subscribeToOn.firstCall.args[0]).to.be.a('function');
                });

                it('should return a function that calls the function returned by the function returned by animationFrame', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromAnimationFrame).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromAnimationFrame).to.have.been.calledOnce.and.calledWithExactly();
                });

                it('should return a function that calls the function returned by the function returned by on', () => {
                    const unsubscribe = setTimingsrcWithCustomUpdateFunction(...args);

                    expect(unsubscribeFromOn).to.have.not.been.called;

                    unsubscribe();

                    expect(unsubscribeFromOn).to.have.been.calledOnce.and.calledWithExactly();
                });

                for (const event of ['animationFrame', 'change event']) {
                    describe(`on a new ${event}`, () => {
                        let next;
                        let updateVector;

                        beforeEach(() => {
                            updateVector = { position: 'another fake position', velocity: 'another fake veloctiy' };

                            (event === 'animationFrame' ? subscribeToAnimationFrame : subscribeToOn).callsFake((value) => {
                                next = value;

                                return event === 'animationFrame' ? unsubscribeFromAnimationFrame : unsubscribeFromOn;
                            });

                            setTimingsrcWithCustomUpdateFunction(...args);

                            prepareTimingStateVector.resetHistory();
                            timingObject.query.resetHistory();
                            updateFunction.resetHistory();
                            updateMediaElement.resetHistory();

                            updateFunction.returns(updateVector);
                        });

                        it('should call query() on the given timingObject', () => {
                            next();

                            expect(timingObject.query).to.have.been.calledOnce.and.calledWithExactly();
                        });

                        if (withPrepareTimingStateVectorFunction) {
                            it('should call prepareTimingStateVector()', () => {
                                next();

                                expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWithExactly(timingStateVector);
                            });
                        } else {
                            it('should not call prepareTimingStateVector()', () => {
                                setTimingsrcWithCustomUpdateFunction(...args);

                                expect(prepareTimingStateVector).to.have.not.been.called;
                            });
                        }

                        it('should call updateFunction()', () => {
                            next();

                            expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(
                                withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                                mediaElement.currentTime,
                                {
                                    position,
                                    velocity
                                }
                            );
                        });

                        it('should call updateFunction() with the return value of the previous invocation', () => {
                            next();
                            next();

                            expect(updateFunction).to.have.been.calledTwice.and.calledWithExactly(
                                withPrepareTimingStateVectorFunction ? preparedTimingStateVector : timingStateVector,
                                mediaElement.currentTime,
                                updateVector
                            );
                        });

                        describe('with an undefined duration', () => {
                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                    mediaElement.currentTime,
                                    0,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    updateVector.position,
                                    updateVector.velocity
                                );
                            });
                        });

                        describe('with a duration which is not a number', () => {
                            beforeEach(() => {
                                mediaElement.duration = NaN;
                            });

                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                    mediaElement.currentTime,
                                    0,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    updateVector.position,
                                    updateVector.velocity
                                );
                            });
                        });

                        describe('with a duration of type number', () => {
                            beforeEach(() => {
                                mediaElement.duration = 18;
                            });

                            it('should call updateMediaElement()', () => {
                                next();

                                expect(updateMediaElement).to.have.been.calledOnce.and.calledWithExactly(
                                    mediaElement.currentTime,
                                    18,
                                    mediaElement,
                                    mediaElement.playbackRate,
                                    updateVector.position,
                                    updateVector.velocity
                                );
                            });
                        });
                    });
                }
            });
        });
    }
});
