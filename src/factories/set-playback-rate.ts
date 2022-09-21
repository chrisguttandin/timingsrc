export const createSetPlaybackRate = (playbackRateAssignments: WeakMap<HTMLMediaElement, [number, number]>) => {
    return (mediaElement: HTMLMediaElement, previousValue: number, nextValue: number) => {
        const playbackRateAssignment = playbackRateAssignments.get(mediaElement);

        if (
            playbackRateAssignment === undefined ||
            playbackRateAssignment[0] !== previousValue ||
            playbackRateAssignment[1] !== nextValue
        ) {
            // There is currently a bug in Firefox which causes problems when switching back to a playbackRate of exactly 1.
            mediaElement.playbackRate = nextValue === 1 ? (previousValue > 1 ? 1.00001 : 0.99999) : nextValue;

            playbackRateAssignments.set(mediaElement, [mediaElement.playbackRate, nextValue]);
        }
    };
};
