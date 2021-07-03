import { TSetCurrentTimeFactory } from '../types';

export const createSetCurrentTime: TSetCurrentTimeFactory = (currentTimeAssignments) => {
    return (mediaElement, previousValue, nextValue) => {
        const currentTimeAssignment = currentTimeAssignments.get(mediaElement);

        if (currentTimeAssignment === undefined || currentTimeAssignment[0] !== previousValue || currentTimeAssignment[1] !== nextValue) {
            mediaElement.currentTime = nextValue;

            currentTimeAssignments.set(mediaElement, [mediaElement.currentTime, nextValue]);
        }
    };
};
