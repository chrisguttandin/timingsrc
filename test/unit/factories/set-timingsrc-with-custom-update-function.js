import { spy, stub } from 'sinon';
import { createSetTimingsrcWithCustomUpdateFunction } from '../../../src/factories/set-timingsrc-with-custom-update-function';

describe('setTimingsrcWithCustomUpdateFunction()', () => {
    let animationFrame;
    let mediaElement;
    let prepareTimingStateVector;
    let setTimingsrcWithCustomUpdateFunction;
    let subscribe;
    let timingObject;
    let updateFunction;
    let updateMediaElement;

    beforeEach(() => {
        animationFrame = stub();
        mediaElement = 'a fake MediaElement';
        prepareTimingStateVector = 'a fake prepareTimingStateVector() function';
        subscribe = stub();
        timingObject = 'a fake TimingObject';
        updateFunction = spy();
        updateMediaElement = spy();

        animationFrame.returns(subscribe);

        setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(animationFrame, updateMediaElement);
    });

    it('should call animationFrame without any arguments', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction, prepareTimingStateVector);

        expect(animationFrame).to.have.been.calledOnce.and.calledWithExactly();
    });

    it('should call the function returned by the animationFrame', () => {
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction, prepareTimingStateVector);

        expect(subscribe).to.have.been.calledOnce;

        expect(subscribe.firstCall.args.length).to.equal(1);
        expect(subscribe.firstCall.args[0]).to.be.a('function');
    });

    it('should return the return value of the function returned by the animationFrame', () => {
        const value = 'a fake return value';

        subscribe.returns(value);

        expect(setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, updateFunction, prepareTimingStateVector)).to.equal(value);
    });
});
