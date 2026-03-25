import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createDefaultSetTimingsrc } from '../../../src/factories/default-set-timingsrc';

describe('defaultSetTimingsrc()', () => {
    let computeVelocity;
    let createComputeVelocity;
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
        computeVelocity = 'a fake computeVelocity() function';
        createComputeVelocity = vi.fn();
        createSetTimingsrc = vi.fn();
        createUpdateGradually = vi.fn();
        createUpdateStepwise = vi.fn();
        determineSupportedPlaybackRateValues = vi.fn();
        setTimingsrc = vi.fn();
        setTimingsrcWithCustomUpdateFunction = vi.fn();
        subscription = 'a fake subscription';
        updateGradually = 'a fake updateGradually() function';
        updateStepwise = 'a fake updateStepwise() function';
        window = {};

        createComputeVelocity.mockReturnValue(computeVelocity);
        createSetTimingsrc.mockReturnValue(setTimingsrc);
        createUpdateGradually.mockReturnValue(updateGradually);
        createUpdateStepwise.mockReturnValue(updateStepwise);
        determineSupportedPlaybackRateValues.mockReturnValue([0, Number.MAX_VALUE]);
        setTimingsrc.mockReturnValue(subscription);
    });

    describe('with the user agent string of Chrome', () => {
        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
            };
        });

        it('should call createComputeVelocity internally with with the default arguments', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createComputeVelocity).to.have.been.calledOnce.and.calledWith(0.5);
        });

        it('should call determineSupportedPlaybackRateValues internally with the window object', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(determineSupportedPlaybackRateValues).to.have.been.calledOnce.and.calledWith(window);
        });

        it('should call createUpdateGradually with the default arguments', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWith(computeVelocity, [0, Number.MAX_VALUE], 1, 0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies gradual updates', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWith(setTimingsrcWithCustomUpdateFunction, updateGradually);
        });

        it('should return the value returned by createSetTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createComputeVelocity,
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

        it('should call createComputeVelocity internally with with the default arguments', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createComputeVelocity).to.have.been.calledOnce.and.calledWith(0.5);
        });

        it('should call determineSupportedPlaybackRateValues internally with the window object', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(determineSupportedPlaybackRateValues).to.have.been.calledOnce.and.calledWith(window);
        });

        it('should call createUpdateGradually with the default arguments', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createUpdateGradually).to.have.been.calledOnce.and.calledWith(computeVelocity, [0, Number.MAX_VALUE], 1, 0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies gradual updates', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWith(setTimingsrcWithCustomUpdateFunction, updateGradually);
        });

        it('should return the value returned by createSetTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createComputeVelocity,
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
        beforeEach(() => {
            window.navigator = {
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15'
            };
        });

        it('should call createUpdateStepwise with the default arguments', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createUpdateStepwise).to.have.been.calledOnce.and.calledWith(0.025);
        });

        it('should call createSetTimingsrc internally with the function that applies stepwise updates', () => {
            createDefaultSetTimingsrc(
                createComputeVelocity,
                createSetTimingsrc,
                createUpdateGradually,
                createUpdateStepwise,
                determineSupportedPlaybackRateValues,
                setTimingsrcWithCustomUpdateFunction,
                window
            );

            expect(createSetTimingsrc).to.have.been.calledOnce.and.calledWith(setTimingsrcWithCustomUpdateFunction, updateStepwise);
        });

        it('should return the value returned by createSetTimingsrc', () => {
            expect(
                createDefaultSetTimingsrc(
                    createComputeVelocity,
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
});
