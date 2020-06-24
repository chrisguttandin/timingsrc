import { TSetTimingsrcFactory } from '../types';

const DEFAULT_THRESHOLD = 1;
const DEFAULT_TIME_CONSTANT = 0.5;
const DEFAULT_TOLERANCE = 0.025;

export const createSetTimingsrc: TSetTimingsrcFactory = (
    createUpdateGradually,
    createUpdateStepwise,
    setTimingsrcWithCustomUpdateFunction,
    window
) => {
    return (mediaElement, timingObject, prepareTimingStateVector = null) =>
        setTimingsrcWithCustomUpdateFunction(
            mediaElement,
            timingObject,
            window !== null && window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')
                ? createUpdateStepwise(DEFAULT_TOLERANCE)
                : createUpdateGradually(DEFAULT_TIME_CONSTANT, DEFAULT_THRESHOLD, DEFAULT_TOLERANCE),
            prepareTimingStateVector
        );
};
