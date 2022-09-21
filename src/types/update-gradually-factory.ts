import type { createComputeVelocity } from '../factories/compute-velocity';
import { TDetermineSupportedPlaybackRateValuesFunction } from './determine-supported-playback-rate-values-function';
import { TUpdateFunction } from './update-function';

export type TUpdateGraduallyFactory = (
    computeVelocity: ReturnType<typeof createComputeVelocity>,
    supportedPlaybackRateValues: ReturnType<TDetermineSupportedPlaybackRateValuesFunction>,
    threshold: number,
    tolerance: number
) => TUpdateFunction;
