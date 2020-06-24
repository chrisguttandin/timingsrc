export const play = (mediaElement: HTMLMediaElement) => {
    if (mediaElement.paused) {
        mediaElement.play().catch((err) => console.error(err)); // tslint:disable-line no-console
    }
};
