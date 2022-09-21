import type { determineSupportedPlaybackRateValues } from '../functions/determine-supported-playback-rate-values';
import { TUpdateFunction } from '../types';
import type { createComputeVelocity } from './compute-velocity';

export const createUpdateGradually = (
    computeVelocity: ReturnType<typeof createComputeVelocity>,
    [minValue, maxValue]: ReturnType<typeof determineSupportedPlaybackRateValues>,
    threshold: number,
    tolerance: number
): TUpdateFunction => {
    let lastPosition: null | number = null;
    let mediaElementDelay = 0;

    return ({ position, velocity }, currentTime) => {
        if (velocity < minValue || velocity > maxValue) {
            lastPosition = position;

            return { position, velocity: 0 };
        }

        if (position < 0 || velocity === 0) {
            lastPosition = position;

            return { position, velocity };
        }

        const positionDifference = currentTime - position;
        const absolutePositionDifference = Math.abs(positionDifference);

        if (absolutePositionDifference > threshold) {
            if (positionDifference < 0 || positionDifference > mediaElementDelay) {
                if (lastPosition === currentTime) {
                    mediaElementDelay += absolutePositionDifference;
                }

                lastPosition = position + mediaElementDelay;

                return { position: lastPosition, velocity: computeVelocity(lastPosition - position, minValue, maxValue, velocity) };
            }

            if (lastPosition !== currentTime) {
                mediaElementDelay -= absolutePositionDifference;
                lastPosition = position + mediaElementDelay;

                return { position: lastPosition, velocity: computeVelocity(lastPosition - position, minValue, maxValue, velocity) };
            }
        }

        if (absolutePositionDifference > tolerance) {
            lastPosition = currentTime;

            return {
                position: currentTime,
                velocity: computeVelocity(positionDifference, minValue, maxValue, velocity)
            };
        }

        lastPosition = currentTime;

        return { position: currentTime, velocity };
    };
};
