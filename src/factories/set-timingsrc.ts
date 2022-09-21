import type { createSetTimingsrcWithCustomUpdateFunction } from '../factories/set-timingsrc-with-custom-update-function';
import { TSetTimingsrcFunction, TUpdateFunction } from '../types';

export const createSetTimingsrc = (
    setTimingsrcWithCustomUpdateFunction: ReturnType<typeof createSetTimingsrcWithCustomUpdateFunction>,
    update: TUpdateFunction
): TSetTimingsrcFunction => {
    return (mediaElement, timingObject, prepareTimingStateVector = null) =>
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, update, prepareTimingStateVector);
};
