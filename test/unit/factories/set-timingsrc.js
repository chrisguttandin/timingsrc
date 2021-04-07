import { spy, stub } from 'sinon';
import { createSetTimingsrc } from '../../../src/factories/set-timingsrc';

describe('setTimingsrc()', () => {
    let createUpdateGradually;
    let createUpdateStepwise;
    let mediaElement;
    let prepareTimingStateVector;
    let setTimingsrc;
    let setTimingsrcWithCustomUpdateFunction;
    let timingObject;
    let updateGradually;
    let updateStepwise;
    let window;

    beforeEach(() => {
        createUpdateGradually = stub();
        createUpdateStepwise = stub();
        mediaElement = 'a fake MediaElement';
        prepareTimingStateVector = 'a fake prepareTimingStateVector() function';
        setTimingsrcWithCustomUpdateFunction = spy();
        timingObject = 'a fake TimingObject';
        updateGradually = 'a fake updateGradually() function';
        updateStepwise = 'a fake updateStepwise() function';
        window = {};

        createUpdateGradually.returns(updateGradually);
        createUpdateStepwise.returns(updateStepwise);

        setTimingsrc = createSetTimingsrc(createUpdateGradually, createUpdateStepwise, setTimingsrcWithCustomUpdateFunction, window);
    });

    describe('with the user agent string of Chrome', () => {
        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
            };
        });

        it('should call createUpdateGradually with the default arguments', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWithExactly(0.5, 1, 0.025);
        });

        it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies gradual updates', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                mediaElement,
                timingObject,
                updateGradually,
                prepareTimingStateVector
            );
        });
    });

    describe('with the user agent string of Firefox', () => {
        beforeEach(() => {
            window.navigator = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:77.0) Gecko/20100101 Firefox/77.0' };
        });

        it('should call createUpdateGradually with the default arguments', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWithExactly(0.5, 1, 0.025);
        });

        it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies gradual updates', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                mediaElement,
                timingObject,
                updateGradually,
                prepareTimingStateVector
            );
        });
    });

    describe('with the user agent string of Safari', () => {
        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15'
            };
        });

        it('should call createUpdateStepwise with the default arguments', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(createUpdateStepwise).to.have.been.calledOnce.and.calledWithExactly(0.025);
        });

        it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies stepwise updates', () => {
            setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

            expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                mediaElement,
                timingObject,
                updateStepwise,
                prepareTimingStateVector
            );
        });
    });
});
