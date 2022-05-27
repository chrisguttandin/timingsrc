import { spy, stub } from 'sinon';
import { createSetTimingsrcWithCustomUpdateFunction } from '../../../src/factories/set-timingsrc-with-custom-update-function';

describe('setTimingsrcWithCustomUpdateFunction()', () => {
    let animationFrame;
    let document;
    let mediaElement;
    let on;
    let setTimingsrcWithCustomUpdateFunction;
    let subscribeToAnimationFrame;
    let subscribeToOn;
    let timingObject;
    let unsubscribeFromAnimationFrame;
    let unsubscribeFromOn;
    let updateFunction;
    let updateMediaElement;

    beforeEach(() => {
        animationFrame = stub();
        document = { visibilityState: 'hidden' };
        mediaElement = { currentTime: 'a fake currentTime', playbackRate: 'a fake playbackRate' };
        on = stub();
        subscribeToAnimationFrame = stub();
        subscribeToOn = stub();
        timingObject = { query: stub() };
        unsubscribeFromAnimationFrame = spy();
        unsubscribeFromOn = spy();
        updateFunction = stub();
        updateMediaElement = spy();

        animationFrame.returns(subscribeToAnimationFrame);
        on.returns(subscribeToOn);
        subscribeToAnimationFrame.returns(unsubscribeFromAnimationFrame);
        subscribeToOn.returns(unsubscribeFromOn);

        setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(animationFrame, document, on, updateMediaElement);
    });

    it('should call animationFrame without any arguments', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(animationFrame).to.have.been.calledOnce.and.calledWithExactly();
    });

    it('should call the function returned by animationFrame', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(subscribeToAnimationFrame).to.have.been.calledOnce;

        expect(subscribeToAnimationFrame.firstCall.args.length).to.equal(1);
        expect(subscribeToAnimationFrame.firstCall.args[0]).to.be.a('function');
    });

    it('should call on to subscribe to the change event of the given timingObject', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(on).to.have.been.calledOnce.and.calledWithExactly(timingObject, 'change');
    });

    it('should call the function returned by on', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(subscribeToOn).to.have.been.calledOnce;

        expect(subscribeToOn.firstCall.args.length).to.equal(1);
        expect(subscribeToOn.firstCall.args[0]).to.be.a('function');
    });

    it('should return a function that calls the function returned by the function returned by animationFrame', () => {
        const unsubscribe = setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(unsubscribeFromAnimationFrame).to.have.not.been.called;

        unsubscribe();

        expect(unsubscribeFromAnimationFrame).to.have.been.calledOnce.and.calledWithExactly();
    });

    it('should return a function that calls the function returned by the function returned by on', () => {
        const unsubscribe = setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(unsubscribeFromOn).to.have.not.been.called;

        unsubscribe();

        expect(unsubscribeFromOn).to.have.been.calledOnce.and.calledWithExactly();
    });

    for (const event of ['animationFrame', 'change event']) {
        describe(`on a new ${event}`, () => {
            describe('without a prepareTimingStateVector function', () => {
                let next;
                let position;
                let timingStateVector;
                let velocity;

                beforeEach(() => {
                    position = 'a fake position';
                    timingStateVector = 'a fake timingStateVector';
                    velocity = 'a fake velocity';

                    (event === 'animationFrame' ? subscribeToAnimationFrame : subscribeToOn).callsFake((value) => (next = value));
                    timingObject.query.returns(timingStateVector);
                    updateFunction.returns({ position, velocity });

                    setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);
                });

                it('should call query() on the given timingObject', () => {
                    next();

                    expect(timingObject.query).to.have.been.calledOnce.and.calledWithExactly();
                });

                it('should call updateFunction()', () => {
                    next();

                    expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(timingStateVector, mediaElement.currentTime);
                });

                describe('with an undefined duration', () => {
                    it('should call updateMediaElement()', () => {
                        next();

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
                        next();

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
                        next();

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
            });

            describe('with a prepareTimingStateVector function', () => {
                let next;
                let position;
                let prepareTimingStateVector;
                let timingStateVector;
                let preparedTimingStateVector;
                let velocity;

                beforeEach(() => {
                    position = 'a fake position';
                    prepareTimingStateVector = stub();
                    timingStateVector = 'a fake timingStateVector';
                    preparedTimingStateVector = 'a fake preparedTimingStateVector';
                    velocity = 'a fake velocity';

                    prepareTimingStateVector.returns(preparedTimingStateVector);
                    (event === 'animationFrame' ? subscribeToAnimationFrame : subscribeToOn).callsFake((value) => (next = value));
                    timingObject.query.returns(timingStateVector);
                    updateFunction.returns({ position, velocity });

                    setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction, prepareTimingStateVector);
                });

                it('should call query() on the given timingObject', () => {
                    next();

                    expect(timingObject.query).to.have.been.calledOnce.and.calledWithExactly();
                });

                it('should call prepareTimingStateVector()', () => {
                    next();

                    expect(prepareTimingStateVector).to.have.been.calledOnce.and.calledWithExactly(timingStateVector);
                });

                it('should call updateFunction()', () => {
                    next();

                    expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(
                        preparedTimingStateVector,
                        mediaElement.currentTime
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
                        next();

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
                        next();

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
            });
        });
    }
});
