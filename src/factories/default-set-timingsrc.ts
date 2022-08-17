import { TDefaultSetTimingsrcFactory, TSetTimingsrcFunction } from '../types';

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
    window !== null && window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')
        ? (...args: Parameters<TSetTimingsrcFunction>) =>
              createSetTimingsrc(setTimingsrcWithCustomUpdateFunction, createUpdateStepwise(DEFAULT_TOLERANCE))(...args)
        : createSetTimingsrc(
              setTimingsrcWithCustomUpdateFunction,
              createUpdateGradually(
                  determineSupportedPlaybackRateValues(window),
                  DEFAULT_TIME_CONSTANT,
                  DEFAULT_THRESHOLD,
                  DEFAULT_TOLERANCE
              )
          );
