import { TSetTimingsrcWithCustomUpdateFunctionFactory } from '../types';

export const createSetTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFactory = (
    animationFrame,
    document,
    on,
    updateMediaElement
) => {
    return (mediaElement, timingObject, updateFunction, prepareTimingStateVector = null) => {
        const update = () => {
            const { currentTime, duration, playbackRate } = mediaElement;
            const timingStateVector = timingObject.query();
            const { position, velocity } = updateFunction(
                prepareTimingStateVector === null ? timingStateVector : prepareTimingStateVector(timingStateVector),
                currentTime
            );
            const sanitizedDuration = typeof duration === 'number' && !isNaN(duration) ? duration : 0;

            updateMediaElement(currentTime, sanitizedDuration, mediaElement, playbackRate, position, velocity);
        };

        const unsubscribeFunctions = [
            animationFrame()(() => update()),
            on(
                timingObject,
                'update'
            )(() => {
                if (document.visibilityState === 'hidden') {
                    update();
                }
            })
        ];

        return () => unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
};
