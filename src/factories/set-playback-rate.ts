import { TSetPlaybackRateFactory } from '../types';

export const createSetPlaybackRate: TSetPlaybackRateFactory = (playbackRateAssignments) => {
    return (mediaElement, previousValue, nextValue) => {
        const playbackRateAssignment = playbackRateAssignments.get(mediaElement);

        if (
            playbackRateAssignment === undefined ||
            playbackRateAssignment[0] !== previousValue ||
            playbackRateAssignment[1] !== nextValue
        ) {
            mediaElement.playbackRate = nextValue;

            playbackRateAssignments.set(mediaElement, [mediaElement.playbackRate, nextValue]);
        }
    };
};
