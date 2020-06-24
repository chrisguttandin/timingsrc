export const pause = (mediaElement: HTMLMediaElement) => {
    if (!mediaElement.paused) {
        mediaElement.pause();
    }
};
