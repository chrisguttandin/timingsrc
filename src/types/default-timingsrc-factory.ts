import type { createComputeVelocity as createComputeVelocityFunction } from '../factories/compute-velocity';
import { TDetermineSupportedPlaybackRateValuesFunction } from './determine-supported-playback-rate-values-function';
import { TSetTimingsrcFactory } from './set-timingsrc-factory';
import { TSetTimingsrcFunction } from './set-timingsrc-function';
import { TSetTimingsrcWithCustomUpdateFunctionFunction } from './set-timingsrc-with-custom-update-function-function';
import { TUpdateGraduallyFactory } from './update-gradually-factory';
import { TUpdateStepwiseFactory } from './update-stepwise-factory';

export type TDefaultSetTimingsrcFactory = (
    createComputeVelocity: typeof createComputeVelocityFunction,
    createSetTimingsrc: TSetTimingsrcFactory,
    createUpdateGradually: TUpdateGraduallyFactory,
    createUpdateStepwise: TUpdateStepwiseFactory,
    determineSupportedPlaybackRateValues: TDetermineSupportedPlaybackRateValuesFunction,
    setTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFunction,
    window: null | (Window & typeof globalThis)
) => TSetTimingsrcFunction;
