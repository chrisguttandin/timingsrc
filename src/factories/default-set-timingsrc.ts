import type { determineSupportedPlaybackRateValues as determineSupportedPlaybackRateValuesFunction } from '../functions/determine-supported-playback-rate-values';
import type { createComputeVelocity as createComputeVelocityFunction } from './compute-velocity';
import type { createSetTimingsrc as createSetTimingsrcFunction } from './set-timingsrc';
import type { createSetTimingsrcWithCustomUpdateFunction } from './set-timingsrc-with-custom-update-function';
import type { createUpdateGradually as createUpdateGraduallyFunction } from './update-gradually';
import type { createUpdateStepwiseFactory } from './update-stepwise-factory';
import type { createWindow } from './window';

const DEFAULT_THRESHOLD = 1;
const DEFAULT_TIME_CONSTANT = 0.5;
const DEFAULT_TOLERANCE = 0.025;

export const createDefaultSetTimingsrc = (
    createComputeVelocity: typeof createComputeVelocityFunction,
    createSetTimingsrc: typeof createSetTimingsrcFunction,
    createUpdateGradually: typeof createUpdateGraduallyFunction,
    createUpdateStepwise: ReturnType<typeof createUpdateStepwiseFactory>,
    determineSupportedPlaybackRateValues: typeof determineSupportedPlaybackRateValuesFunction,
    setTimingsrcWithCustomUpdateFunction: ReturnType<typeof createSetTimingsrcWithCustomUpdateFunction>,
    window: ReturnType<typeof createWindow>
) =>
    createSetTimingsrc(
        setTimingsrcWithCustomUpdateFunction,
        window !== null && window.navigator.userAgent.includes('Safari') && !window.navigator.userAgent.includes('Chrome')
            ? createUpdateStepwise(DEFAULT_TOLERANCE)
            : createUpdateGradually(
                  createComputeVelocity(DEFAULT_TIME_CONSTANT),
                  determineSupportedPlaybackRateValues(window),
                  DEFAULT_THRESHOLD,
                  DEFAULT_TOLERANCE
              )
    );
