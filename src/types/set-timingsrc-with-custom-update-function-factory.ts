import { TAnimationFrameFunction } from 'subscribable-things';
import { TSetTimingsrcWithCustomUpdateFunctionFunction } from './set-timingsrc-with-custom-update-function-function';
import { TUpdateMediaElementFunction } from './update-media-element-function';

export type TSetTimingsrcWithCustomUpdateFunctionFactory = (
    animationFrame: TAnimationFrameFunction,
    updateMediaElement: TUpdateMediaElementFunction
) => TSetTimingsrcWithCustomUpdateFunctionFunction;
