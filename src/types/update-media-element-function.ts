export type TUpdateMediaElementFunction = (
    currentTime: number,
    duration: number,
    mediaElement: HTMLMediaElement,
    playbackRate: number,
    position: number,
    velocity: number
) => void;
