import { TUpdateMediaElementFactory } from '../types';

export const createUpdateMediaElement: TUpdateMediaElementFactory = (pause, play, setCurrentTime, setPlaybackRate) => {
    return (currentTime, duration, mediaElement, playbackRate, position, velocity) => {
        if (position < 0) {
            if (currentTime > 0) {
                setCurrentTime(mediaElement, currentTime, 0);
            }

            pause(mediaElement);
        } else if (position >= duration) {
            if (currentTime !== duration) {
                setCurrentTime(mediaElement, currentTime, duration);
            }

            pause(mediaElement);
        } else if (currentTime !== position) {
            setCurrentTime(mediaElement, currentTime, position);

            if (velocity !== 0) {
                if (playbackRate !== velocity) {
                    setPlaybackRate(mediaElement, playbackRate, velocity);
                }

                play(mediaElement);
            } else {
                pause(mediaElement);
            }
        } else if (playbackRate !== velocity) {
            if (velocity !== 0) {
                setPlaybackRate(mediaElement, playbackRate, velocity);
                play(mediaElement);
            } else {
                pause(mediaElement);
            }
        }
    };
};
