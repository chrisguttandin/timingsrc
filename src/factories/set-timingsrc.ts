import { TSetTimingsrcFactory } from '../types';

export const createSetTimingsrc: TSetTimingsrcFactory = (setTimingsrcWithCustomUpdateFunction, update) => {
    return (mediaElement, timingObject, prepareTimingStateVector = null) =>
        setTimingsrcWithCustomUpdateFunction(mediaElement, timingObject, update, prepareTimingStateVector);
};
