import { TSetTimingsrcWithCustomUpdateFunctionFactory } from '../types';

export const createSetTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFactory = (animationFrame, pause, play) => {
    return (mediaElement, timingObject, updateFunction, prepareTimingStateVector = null) =>
        animationFrame()(() => {
            const { currentTime, duration, playbackRate } = mediaElement;
            const timingStateVector = timingObject.query();
            const { position, velocity } = updateFunction(
                prepareTimingStateVector === null ? timingStateVector : prepareTimingStateVector(timingStateVector),
                currentTime
            );
            const sanitizedDuration = typeof duration === 'number' && !isNaN(duration) ? duration : 0;

            if (currentTime !== position) {
                if (position < 0) {
                    mediaElement.currentTime = 0;

                    pause(mediaElement);
                } else if (position > sanitizedDuration) {
                    mediaElement.currentTime = duration;

                    pause(mediaElement);
                } else {
                    mediaElement.currentTime = position;

                    if (velocity !== 0) {
                        if (playbackRate !== velocity) {
                            mediaElement.playbackRate = velocity;
                        }

                        play(mediaElement);
                    } else {
                        pause(mediaElement);
                    }
                }
            }
        });
};
