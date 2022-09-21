import { TDefaultSetTimingsrcFactory } from '../types';

const DEFAULT_THRESHOLD = 1;
const DEFAULT_TIME_CONSTANT = 0.5;
const DEFAULT_TOLERANCE = 0.025;

export const createDefaultSetTimingsrc: TDefaultSetTimingsrcFactory = (
    createSetTimingsrc,
    createUpdateGradually,
    createUpdateStepwise,
    determineSupportedPlaybackRateValues,
    setTimingsrcWithCustomUpdateFunction,
    window
) =>
    createSetTimingsrc(
        setTimingsrcWithCustomUpdateFunction,
        window !== null && window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')
            ? createUpdateStepwise(DEFAULT_TOLERANCE)
            : createUpdateGradually(
                  determineSupportedPlaybackRateValues(window),
                  DEFAULT_TIME_CONSTANT,
                  DEFAULT_THRESHOLD,
                  DEFAULT_TOLERANCE
              )
    );
