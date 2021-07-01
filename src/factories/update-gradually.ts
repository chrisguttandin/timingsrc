import { TUpdateGraduallyFactory } from '../types';

export const createUpdateGradually: TUpdateGraduallyFactory = (timeConstant, threshold, tolerance) => {
    return ({ position, velocity }, currentTime) => {
        if (position < 0 || velocity === 0) {
            return { position, velocity };
        }

        const positionDifference = currentTime - position;
        const absolutePositionDifference = Math.abs(positionDifference);

        if (absolutePositionDifference > threshold) {
            return { position, velocity };
        }

        if (absolutePositionDifference > tolerance) {
            return { position: currentTime, velocity: ((positionDifference + timeConstant) / timeConstant) * velocity };
        }

        return { position: currentTime, velocity };
    };
};
