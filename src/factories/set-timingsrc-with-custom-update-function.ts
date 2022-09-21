import type { TAnimationFrameFunction, TOnFunction } from 'subscribable-things';
import type { ITimingObject } from 'timing-object';
import { TPrepareTimingStateVectorFunction, TUpdateFunction } from '../types';
import type { createUpdateMediaElement } from './update-media-element';

export const createSetTimingsrcWithCustomUpdateFunction = (
    animationFrame: TAnimationFrameFunction,
    document: Document,
    on: TOnFunction,
    updateMediaElement: ReturnType<typeof createUpdateMediaElement>
) => {
    return (
        mediaElement: HTMLMediaElement,
        timingObject: ITimingObject,
        updateFunction: TUpdateFunction,
        prepareTimingStateVector: null | TPrepareTimingStateVectorFunction = null
    ) => {
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
                'change'
            )(() => {
                if (document.visibilityState === 'hidden') {
                    update();
                }
            })
        ];

        return () => unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
};
