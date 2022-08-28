import { TUpdateStepwiseFactoryFactory } from '../types';

export const createUpdateStepwiseFactory: TUpdateStepwiseFactoryFactory = (translateTimingStateVector) => {
    return (tolerance) => {
        let lastMotionUpdate: null | { position: number; timestamp: number; velocity: number } = null;
        let lastPlayheadDifference = 0;
        let mediaElementDelay = 0;

        return (timingStateVector, currentTime) => {
            if (timingStateVector.position < 0 || timingStateVector.velocity === 0) {
                lastMotionUpdate = null;

                return { position: timingStateVector.position, velocity: timingStateVector.velocity };
            }

            if (lastMotionUpdate !== null) {
                const playheadDifference = Math.abs(currentTime - lastMotionUpdate.position);

                // Bug #4: Safari decreases currentTime after playing for about 200 milliseconds.
                if (lastPlayheadDifference - 0.01 < playheadDifference && lastPlayheadDifference < 0.5) {
                    lastPlayheadDifference = playheadDifference;

                    return { position: currentTime, velocity: lastMotionUpdate.velocity };
                }

                lastPlayheadDifference = Number.POSITIVE_INFINITY;
            }

            const positionDifference = Math.abs(currentTime - timingStateVector.position);

            if (positionDifference > tolerance) {
                if (lastMotionUpdate !== null) {
                    const elapsedTime = timingStateVector.timestamp - lastMotionUpdate.timestamp;

                    const { position } = translateTimingStateVector({ acceleration: 0, ...lastMotionUpdate }, elapsedTime);

                    mediaElementDelay = position - currentTime;
                }

                const positioWithDelay = timingStateVector.position + mediaElementDelay;

                lastMotionUpdate = {
                    position: positioWithDelay,
                    timestamp: timingStateVector.timestamp,
                    velocity: timingStateVector.velocity
                };
                lastPlayheadDifference = 0;

                return { position: positioWithDelay, velocity: timingStateVector.velocity };
            }

            lastMotionUpdate = null;

            return { position: currentTime, velocity: timingStateVector.velocity };
        };
    };
};
