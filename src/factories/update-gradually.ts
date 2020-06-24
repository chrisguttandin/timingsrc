import { TUpdateGraduallyFactory } from '../types';

export const createUpdateGradually: TUpdateGraduallyFactory = (timeConstant, threshold, tolerance) => {
    return (timingStateVector, currentTime) => {
        if (timingStateVector.position < 0 || timingStateVector.velocity === 0) {
            return { position: timingStateVector.position, velocity: timingStateVector.velocity };
        }

        const positionDifference = Math.abs(currentTime - timingStateVector.position);

        if (positionDifference > threshold) {
            return { position: timingStateVector.position, velocity: timingStateVector.velocity };
        }

        if (positionDifference > tolerance) {
            return { position: currentTime, velocity: ((positionDifference + timeConstant) / timeConstant) * timingStateVector.velocity };
        }

        return { position: currentTime, velocity: timingStateVector.velocity };
    };
};
