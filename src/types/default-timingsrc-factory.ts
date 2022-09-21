import type { createComputeVelocity as createComputeVelocityFunction } from '../factories/compute-velocity';
import type { createSetTimingsrc as createSetTimingsrcFunction } from '../factories/set-timingsrc';
import type { createSetTimingsrcWithCustomUpdateFunction } from '../factories/set-timingsrc-with-custom-update-function';
import { TDetermineSupportedPlaybackRateValuesFunction } from './determine-supported-playback-rate-values-function';
import { TSetTimingsrcFunction } from './set-timingsrc-function';
import { TUpdateGraduallyFactory } from './update-gradually-factory';
import { TUpdateStepwiseFactory } from './update-stepwise-factory';

export type TDefaultSetTimingsrcFactory = (
    createComputeVelocity: typeof createComputeVelocityFunction,
    createSetTimingsrc: typeof createSetTimingsrcFunction,
    createUpdateGradually: TUpdateGraduallyFactory,
    createUpdateStepwise: TUpdateStepwiseFactory,
    determineSupportedPlaybackRateValues: TDetermineSupportedPlaybackRateValuesFunction,
    setTimingsrcWithCustomUpdateFunction: ReturnType<typeof createSetTimingsrcWithCustomUpdateFunction>,
    window: null | (Window & typeof globalThis)
) => TSetTimingsrcFunction;
