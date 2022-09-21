import { TAnimationFrameFunction, TOnFunction } from 'subscribable-things';
import type { createUpdateMediaElement } from '../factories/update-media-element';
import { TSetTimingsrcWithCustomUpdateFunctionFunction } from './set-timingsrc-with-custom-update-function-function';

export type TSetTimingsrcWithCustomUpdateFunctionFactory = (
    animationFrame: TAnimationFrameFunction,
    document: Document,
    on: TOnFunction,
    updateMediaElement: ReturnType<typeof createUpdateMediaElement>
) => TSetTimingsrcWithCustomUpdateFunctionFunction;
