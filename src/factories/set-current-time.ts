import { TSetCurrentTimeFactory } from '../types';

export const createSetCurrentTime: TSetCurrentTimeFactory = (currentTimeAssignments) => {
    return (mediaElement, previousValue, nextValue) => {
        const currentTimeAssignment = currentTimeAssignments.get(mediaElement);

        if (
            currentTimeAssignment === undefined ||
            // Bug #5: Safari limits the precision of the value after a while.
            Math.abs(currentTimeAssignment[0] - previousValue) > 0.0001 ||
            currentTimeAssignment[1] !== nextValue
        ) {
            mediaElement.currentTime = nextValue;

            currentTimeAssignments.set(mediaElement, [mediaElement.currentTime, nextValue]);
        }
    };
};
