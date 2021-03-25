import { TUpdateMediaElementFactory } from '../types';

export const createUpdateMediaElement: TUpdateMediaElementFactory = (pause, play) => {
    return (currentTime, duration, mediaElement, playbackRate, position, velocity) => {
        if (currentTime !== position) {
            if (position < 0) {
                mediaElement.currentTime = 0;

                pause(mediaElement);
            } else if (position > duration) {
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
    };
};
