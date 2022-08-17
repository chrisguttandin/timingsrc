import { spy, stub } from 'sinon';
import { createDefaultSetTimingsrc } from '../../../src/factories/default-set-timingsrc';

describe('defaultSetTimingsrc()', () => {
    let createSetTimingsrc;
    let createUpdateGradually;
    let createUpdateStepwise;
    let determineSupportedPlaybackRateValues;
    let setTimingsrc;
    let setTimingsrcWithCustomUpdateFunction;
    let subscription;
    let updateGradually;
    let updateStepwise;
    let window;

    beforeEach(() => {
        createSetTimingsrc = stub();
        createUpdateGradually = stub();
        createUpdateStepwise = stub();
        determineSupportedPlaybackRateValues = stub();
        setTimingsrc = stub();
        setTimingsrcWithCustomUpdateFunction = spy();
        subscription = 'a fake subscription';
        updateGradually = 'a fake updateGradually() function';
        updateStepwise = 'a fake updateStepwise() function';
        window = {};

        createSetTimingsrc.returns(setTimingsrc);
        createUpdateGradually.returns(updateGradually);
        createUpdateStepwise.returns(updateStepwise);
        determineSupportedPlaybackRateValues.returns([0, Number.MAX_VALUE]);
        setTimingsrc.returns(subscription);
    });

    describe('with the user agent string of Chrome', () => {
        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
            };
        });

        it('should call determineSupportedPlaybackRateValues internally with the window object', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(determineSupportedPlaybackRateValues).to.have.been.calledOnce.and.calledWithExactly(window);
        });

        it('should call createUpdateGradually with the default arguments', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWithExactly([0, Number.MAX_VALUE], 0.5, 1, 0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies gradual updates', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWithExactly(setTimingsrcWithCustomUpdateFunction, updateGradually);
        });

        it('should return the value returned by createSetTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createSetTimingsrc,
                    createUpdateGradually,
                    createUpdateStepwise,
                    determineSupportedPlaybackRateValues,
                    setTimingsrcWithCustomUpdateFunction,
                    window
                )
            ).to.equal(setTimingsrc);
        });
    });

    describe('with the user agent string of Firefox', () => {
        beforeEach(() => {
            window.navigator = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:77.0) Gecko/20100101 Firefox/77.0' };
        });

        it('should call determineSupportedPlaybackRateValues internally with the window object', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(determineSupportedPlaybackRateValues).to.have.been.calledOnce.and.calledWithExactly(window);
        });

        it('should call createUpdateGradually with the default arguments', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWithExactly([0, Number.MAX_VALUE], 0.5, 1, 0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies gradual updates', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWithExactly(setTimingsrcWithCustomUpdateFunction, updateGradually);
        });

        it('should return the value returned by createSetTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createSetTimingsrc,
                    createUpdateGradually,
                    createUpdateStepwise,
                    determineSupportedPlaybackRateValues,
                    setTimingsrcWithCustomUpdateFunction,
                    window
                )
            ).to.equal(setTimingsrc);
        });
    });

    describe('with the user agent string of Safari', () => {
        let args;

        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15'
            };

            args = ['a', 'fake', 'array', 'of', 'arguments'];
        });

        it('should call createUpdateStepwise with the default arguments', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            )(...args);

            expect(createUpdateStepwise).to.have.been.calledOnce.and.calledWithExactly(0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies stepwise updates', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            )(...args);

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWithExactly(setTimingsrcWithCustomUpdateFunction, updateStepwise);
        });

        it('should call setTimingsrc with the given arguments', () => {
            createDefaultSetTimingsrc(
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            )(...args);

            expect(setTimingsrc).to.have.been.calledOnce.and.calledWithExactly(...args);
        });

        it('should return the value returned by setTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createSetTimingsrc,
                    createUpdateGradually,
                    createUpdateStepwise,
                    determineSupportedPlaybackRateValues,
                    setTimingsrcWithCustomUpdateFunction,
                    window
                )(...args)
            ).to.equal(subscription);
        });
    });
});
