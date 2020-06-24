import { TUpdateStepwiseFactoryFactory } from '../types';

export const createUpdateStepwiseFactory: TUpdateStepwiseFactoryFactory = (translateTimingStateVector) => {
    return (tolerance) => {
        let lastMotionUpdate: null | { position: number; timestamp: number; velocity: number } = null;
        let mediaElementDelay = 0;

        return (timingStateVector, currentTime) => {
            if (timingStateVector.position < 0 || timingStateVector.velocity === 0) {
                lastMotionUpdate = null;

                return { position: timingStateVector.position, velocity: timingStateVector.velocity };
            }

            if (lastMotionUpdate !== null) {
                const playheadDifference = Math.abs(currentTime - lastMotionUpdate.position);

                // Check if at least 10ms were played since the last motion update.
                if (playheadDifference < 0.01) {
                    return { position: currentTime, velocity: lastMotionUpdate.velocity };
                }
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

                return { position: positioWithDelay, velocity: timingStateVector.velocity };
            }

            lastMotionUpdate = null;

            return { position: currentTime, velocity: timingStateVector.velocity };
        };
    };
};
