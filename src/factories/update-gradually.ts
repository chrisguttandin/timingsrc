import type { determineSupportedPlaybackRateValues } from '../functions/determine-supported-playback-rate-values';
import type { updateVectorWithNewPosition as updateVectorWithNewPositionFunction } from '../functions/update-vector-with-new-position';
import { IUpdateVector } from '../interfaces';
import { TUpdateFunction } from '../types';
import type { createComputeVelocity } from './compute-velocity';

export const createUpdateGradually = (
    computeVelocity: ReturnType<typeof createComputeVelocity>,
    [minValue, maxValue]: ReturnType<typeof determineSupportedPlaybackRateValues>,
    threshold: number,
    tolerance: number,
    updateVectorWithNewPosition: typeof updateVectorWithNewPositionFunction
): TUpdateFunction<IUpdateVector & { mediaElementDelay: number }> => {
    return ({ position, velocity }, currentTime, previousUpdateVectorWithCustomState) => {
        let { mediaElementDelay } = previousUpdateVectorWithCustomState ?? { mediaElementDelay: 0 };

        if (velocity < minValue || velocity > maxValue) {
            return { mediaElementDelay, position, velocity: 0 };
        }

        if (position < 0 || velocity === 0) {
            return { mediaElementDelay, position, velocity };
        }

        const positionDifference = currentTime - position;
        const absolutePositionDifference = Math.abs(positionDifference);

        if (absolutePositionDifference > threshold) {
            const { position: lastPosition } = previousUpdateVectorWithCustomState ?? { position: null };

            if (positionDifference < 0 || positionDifference > mediaElementDelay) {
                if (lastPosition === currentTime) {
                    mediaElementDelay += absolutePositionDifference;
                }

                return updateVectorWithNewPosition(mediaElementDelay, position, (nextPosition) =>
                    computeVelocity(nextPosition - position, minValue, maxValue, velocity)
                );
            }

            if (lastPosition !== currentTime) {
                return updateVectorWithNewPosition(mediaElementDelay - absolutePositionDifference, position, (nextPosition) =>
                    computeVelocity(nextPosition - position, minValue, maxValue, velocity)
                );
            }
        }

        if (absolutePositionDifference > tolerance) {
            return {
                mediaElementDelay,
                position: currentTime,
                velocity: computeVelocity(positionDifference, minValue, maxValue, velocity)
            };
        }

        return { mediaElementDelay, position: currentTime, velocity };
    };
};
