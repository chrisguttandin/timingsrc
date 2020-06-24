import { TAnimationFrameFunction } from 'subscribable-things';
import { TPauseFunction } from './pause-function';
import { TPlayFunction } from './play-function';
import { TSetTimingsrcWithCustomUpdateFunctionFunction } from './set-timingsrc-with-custom-update-function-function';

export type TSetTimingsrcWithCustomUpdateFunctionFactory = (
    animationFrame: TAnimationFrameFunction,
    pause: TPauseFunction,
    play: TPlayFunction
) => TSetTimingsrcWithCustomUpdateFunctionFunction;
