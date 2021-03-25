import { TSetTimingsrcWithCustomUpdateFunctionFactory } from '../types';

export const createSetTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFactory = (
    animationFrame,
    updateMediaElement
) => {
    return (mediaElement, timingObject, updateFunction, prepareTimingStateVector = null) =>
        animationFrame()(() => {
            const { currentTime, duration, playbackRate } = mediaElement;
            const timingStateVector = timingObject.query();
            const { position, velocity } = updateFunction(
                prepareTimingStateVector === null ? timingStateVector : prepareTimingStateVector(timingStateVector),
                currentTime
            );
            const sanitizedDuration = typeof duration === 'number' && !isNaN(duration) ? duration : 0;

            updateMediaElement(currentTime, sanitizedDuration, mediaElement, playbackRate, position, velocity);
        });
};
