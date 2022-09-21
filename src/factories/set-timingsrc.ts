import type { ITimingObject } from 'timing-object';
import type { createSetTimingsrcWithCustomUpdateFunction } from '../factories/set-timingsrc-with-custom-update-function';
import { TPrepareTimingStateVectorFunction, TUpdateFunction } from '../types';

export const createSetTimingsrc =
    (setTimingsrcWithCustomUpdateFunction: ReturnType<typeof createSetTimingsrcWithCustomUpdateFunction>, update: TUpdateFunction) =>
    (
        mediaElement: HTMLMediaElement,
        timingObject: ITimingObject,
        prepareTimingStateVector: null | TPrepareTimingStateVectorFunction = null
    ) =>
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, update, prepareTimingStateVector);
