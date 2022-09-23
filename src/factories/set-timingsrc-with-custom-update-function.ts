import type { TAnimationFrameFunction, TOnFunction } from 'subscribable-things';
import type { ITimingObject } from 'timing-object';
import { IUpdateVector } from '../interfaces';
import { TPrepareTimingStateVectorFunction, TUpdateFunction } from '../types';
import type { createUpdateMediaElement } from './update-media-element';

export const createSetTimingsrcWithCustomUpdateFunction = (
    animationFrame: TAnimationFrameFunction,
    document: Document,
    on: TOnFunction,
    updateMediaElement: ReturnType<typeof createUpdateMediaElement>
) => {
    return <UpdateVectorWithCustomState extends IUpdateVector>(
        mediaElement: HTMLMediaElement,
        timingObject: ITimingObject,
        updateFunction: TUpdateFunction<UpdateVectorWithCustomState>,
        prepareTimingStateVector: null | TPrepareTimingStateVectorFunction = null
    ) => {
        let previousUpdateVectorWithCustomState: null | UpdateVectorWithCustomState = null;

        const update = () => {
            const { currentTime, duration, playbackRate } = mediaElement;
            const timingStateVector = timingObject.query();

            previousUpdateVectorWithCustomState = updateFunction(
                prepareTimingStateVector === null ? timingStateVector : prepareTimingStateVector(timingStateVector),
                currentTime,
                previousUpdateVectorWithCustomState
            );

            const sanitizedDuration = typeof duration === 'number' && !isNaN(duration) ? duration : 0;
            const { position, velocity } = previousUpdateVectorWithCustomState;

            updateMediaElement(currentTime, sanitizedDuration, mediaElement, playbackRate, position, velocity);

            return velocity !== 0;
        };

        let unsubscribe: () => void;

        const updateOnce = () => {
            if (!update()) {
                unsubscribe();

                unsubscribe = updateReactively();
            }
        };
        const updateConsistently = () => {
            const unsubscribeFunctions = [
                animationFrame()(() => updateOnce()),
                on(
                    timingObject,
                    'change'
                )(() => {
                    if (document.visibilityState === 'hidden') {
                        updateOnce();
                    }
                })
            ];

            return () => unsubscribeFunctions.forEach((unsubscribeFunction) => unsubscribeFunction());
        };
        const updateReactively = () =>
            on(
                timingObject,
                'change'
            )(() => {
                if (update()) {
                    unsubscribe();

                    unsubscribe = updateConsistently();
                }
            });

        unsubscribe = update() ? updateConsistently() : updateReactively();

        return () => unsubscribe();
    };
};
