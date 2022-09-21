import { TSetTimingsrcFunction, TSetTimingsrcWithCustomUpdateFunctionFunction, TUpdateFunction } from '../types';

export const createSetTimingsrc = (
    setTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFunction,
    update: TUpdateFunction
): TSetTimingsrcFunction => {
    return (mediaElement, timingObject, prepareTimingStateVector = null) =>
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, update, prepareTimingStateVector);
};
