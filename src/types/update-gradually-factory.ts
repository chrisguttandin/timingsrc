import { TDetermineSupportedPlaybackRateValuesFunction } from './determine-supported-playback-rate-values-function';
import { TUpdateFunction } from './update-function';

export type TUpdateGraduallyFactory = (
    supportedPlaybackRateValues: ReturnType<TDetermineSupportedPlaybackRateValuesFunction>,
    timeConstant: number,
    threshold: number,
    tolerance: number
) => TUpdateFunction;
