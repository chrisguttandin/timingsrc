import type { pause as pauseFunction } from '../functions/pause';
import type { play as playFunction } from '../functions/play';
import type { createSetCurrentTime } from './set-current-time';
import type { createSetPlaybackRate } from './set-playback-rate';

export const createUpdateMediaElement = (
    pause: typeof pauseFunction,
    play: typeof playFunction,
    setCurrentTime: ReturnType<typeof createSetCurrentTime>,
    setPlaybackRate: ReturnType<typeof createSetPlaybackRate>
) => {
    return (
        currentTime: number,
        duration: number,
        mediaElement: HTMLMediaElement,
        playbackRate: number,
        position: number,
        velocity: number
    ) => {
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
