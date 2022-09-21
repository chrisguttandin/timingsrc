import type { createSetCurrentTime } from '../factories/set-current-time';
import type { createSetPlaybackRate } from '../factories/set-playback-rate';
import type { pause as pauseFunction } from '../functions/pause';
import type { play as playFunction } from '../functions/play';
import { TUpdateMediaElementFunction } from './update-media-element-function';

export type TUpdateMediaElementFactory = (
    pause: typeof pauseFunction,
    play: typeof playFunction,
    setCurrentTime: ReturnType<typeof createSetCurrentTime>,
    setPlaybackRate: ReturnType<typeof createSetPlaybackRate>
) => TUpdateMediaElementFunction;
