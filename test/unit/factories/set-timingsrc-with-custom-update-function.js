import { spy, stub } from 'sinon';
import { createSetTimingsrcWithCustomUpdateFunction } from '../../../src/factories/set-timingsrc-with-custom-update-function';

describe('setTimingsrcWithCustomUpdateFunction()', () => {
    let animationFrame;
    let mediaElement;
    let setTimingsrcWithCustomUpdateFunction;
    let subscribe;
    let timingObject;
    let updateFunction;
    let updateMediaElement;

    beforeEach(() => {
        animationFrame = stub();
        mediaElement = { currentTime: 'a fake currentTime', playbackRate: 'a fake playbackRate' };
        subscribe = stub();
        timingObject = { query: stub() };
        updateFunction = stub();
        updateMediaElement = spy();

        animationFrame.returns(subscribe);

        setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(animationFrame, updateMediaElement);
    });

    it('should call animationFrame without any arguments', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(animationFrame).to.have.been.calledOnce.and.calledWithExactly();
    });

    it('should call the function returned by the animationFrame', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction);

        expect(subscribe).to.have.been.calledOnce;

        expect(subscribe.firstCall.args.length).to.equal(1);
        expect(subscribe.firstCall.args[0]).to.be.a('function');
    });

    it('should return the return value of the function returned by the animationFrame', () => {
        const value = 'a fake return value';

        subscribe.returns(value);

        expect(setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction)).to.equal(value);
    });

    describe('without a prepareTimingStateVector function', () => {
        let next;
        let position;
        let timingStateVector;
        let velocity;

        beforeEach(() => {
            position = 'a fake position';
            timingStateVector = 'a fake timingStateVector';
            velocity = 'a fake velocity';

            subscribe.callsFake((value) => (next = value));
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
            subscribe.callsFake((value) => (next = value));
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

            expect(updateFunction).to.have.been.calledOnce.and.calledWithExactly(preparedTimingStateVector, mediaElement.currentTime);
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
