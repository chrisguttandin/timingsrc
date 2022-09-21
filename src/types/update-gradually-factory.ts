import type { createComputeVelocity } from '../factories/compute-velocity';
import { determineSupportedPlaybackRateValues } from '../functions/determine-supported-playback-rate-values';
import { TUpdateFunction } from './update-function';

export type TUpdateGraduallyFactory = (
    computeVelocity: ReturnType<typeof createComputeVelocity>,
    supportedPlaybackRateValues: ReturnType<typeof determineSupportedPlaybackRateValues>,
    threshold: number,
    tolerance: number
) => TUpdateFunction;
