import { TPauseFunction } from './pause-function';
import { TPlayFunction } from './play-function';
import { TSetCurrentTimeFunction } from './set-current-time-function';
import { TSetPlaybackRateFunction } from './set-playback-rate-function';
import { TUpdateMediaElementFunction } from './update-media-element-function';

export type TUpdateMediaElementFactory = (
    pause: TPauseFunction,
    play: TPlayFunction,
    setCurrentTime: TSetCurrentTimeFunction,
    setPlaybackRate: TSetPlaybackRateFunction
) => TUpdateMediaElementFunction;
