import type { play as playFunction } from '../functions/play';
import { TPauseFunction } from './pause-function';
import { TSetCurrentTimeFunction } from './set-current-time-function';
import { TSetPlaybackRateFunction } from './set-playback-rate-function';
import { TUpdateMediaElementFunction } from './update-media-element-function';

export type TUpdateMediaElementFactory = (
    pause: TPauseFunction,
    play: typeof playFunction,
    setCurrentTime: TSetCurrentTimeFunction,
    setPlaybackRate: TSetPlaybackRateFunction
) => TUpdateMediaElementFunction;
