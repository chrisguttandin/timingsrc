import { TUpdateMediaElementFactory } from '../types';

export const createUpdateMediaElement: TUpdateMediaElementFactory = (pause, play) => {
    return (currentTime, duration, mediaElement, playbackRate, position, velocity) => {
        if (position < 0) {
            if (currentTime > 0) {
                mediaElement.currentTime = 0;
            }

            pause(mediaElement);
        } else if (position >= duration) {
            if (currentTime !== duration) {
                mediaElement.currentTime = duration;
            }

            pause(mediaElement);
        } else if (currentTime !== position) {
            mediaElement.currentTime = position;

            if (velocity !== 0) {
                if (playbackRate !== velocity) {
                    mediaElement.playbackRate = velocity;
                }

                play(mediaElement);
            } else {
                pause(mediaElement);
            }
        } else if (playbackRate !== velocity) {
            if (velocity !== 0) {
                mediaElement.playbackRate = velocity;

                play(mediaElement);
            } else {
                pause(mediaElement);
            }
        }
    };
};
