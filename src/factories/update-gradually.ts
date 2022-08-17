import { TUpdateGraduallyFactory } from '../types';

export const createUpdateGradually: TUpdateGraduallyFactory = ([minValue, maxValue], timeConstant, threshold, tolerance) => {
    return ({ position, velocity }, currentTime) => {
        if (velocity < minValue || velocity > maxValue) {
            return { position, velocity: 0 };
        }

        if (position < 0 || velocity === 0) {
            return { position, velocity };
        }

        const positionDifference = currentTime - position;
        const absolutePositionDifference = Math.abs(positionDifference);

        if (absolutePositionDifference > threshold) {
            return { position, velocity };
        }

        if (absolutePositionDifference > tolerance) {
            return {
                position: currentTime,
                velocity: Math.max(minValue, Math.min(maxValue, ((timeConstant - positionDifference) / timeConstant) * velocity))
            };
        }

        return { position: currentTime, velocity };
    };
};
