import type { TTranslateTimingStateVectorFunction } from 'timing-object';
import { IUpdateVector } from '../interfaces';
import { TUpdateFunction } from '../types';

const MAXIMUM_PLAYHEAD_DIFFERENCE = 0.5;

export const createUpdateStepwiseFactory = (translateTimingStateVector: TTranslateTimingStateVectorFunction) => {
    return (
        tolerance: number
    ): TUpdateFunction<
        IUpdateVector & {
            lastAppliedPostion: number;
            lastAppliedTimestamp: number;
            lastAppliedVelocity: number;
            lastPlayheadDifference: number;
            mediaElementDelay: number;
            numberOfDetectedResets: number;
            numberOfExpectedResets: number;
        }
    > => {
        return (timingStateVector, currentTime, previousUpdateVectorWithCustomState) => {
            let {
                lastAppliedPostion,
                lastAppliedTimestamp,
                lastAppliedVelocity,
                lastPlayheadDifference,
                mediaElementDelay,
                numberOfDetectedResets,
                numberOfExpectedResets
            } = previousUpdateVectorWithCustomState ?? {
                lastAppliedPostion: 0,
                lastAppliedTimestamp: 0,
                lastAppliedVelocity: 0,
                lastPlayheadDifference: 0,
                mediaElementDelay: 0,
                numberOfDetectedResets: 0,
                numberOfExpectedResets: 1
            };

            if (timingStateVector.position < 0 || timingStateVector.velocity === 0) {
                lastAppliedPostion = timingStateVector.position;
                lastAppliedVelocity = timingStateVector.velocity;

                return {
                    lastAppliedPostion,
                    lastAppliedTimestamp: 0,
                    lastAppliedVelocity,
                    lastPlayheadDifference,
                    mediaElementDelay,
                    numberOfDetectedResets,
                    numberOfExpectedResets,
                    position: lastAppliedPostion,
                    velocity: lastAppliedVelocity
                };
            }

            // Bug #4: Safari decreases currentTime after playing for about 200 milliseconds.
            if (lastAppliedVelocity === timingStateVector.velocity && lastPlayheadDifference < MAXIMUM_PLAYHEAD_DIFFERENCE) {
                const playheadDifference = Math.abs(currentTime - lastAppliedPostion) * lastAppliedVelocity;

                if (playheadDifference < MAXIMUM_PLAYHEAD_DIFFERENCE) {
                    if (playheadDifference + 0.001 > lastPlayheadDifference) {
                        lastPlayheadDifference = playheadDifference;

                        if (numberOfDetectedResets < numberOfExpectedResets) {
                            return {
                                lastAppliedPostion,
                                lastAppliedTimestamp,
                                lastAppliedVelocity,
                                lastPlayheadDifference,
                                mediaElementDelay,
                                numberOfDetectedResets,
                                numberOfExpectedResets,
                                position: currentTime,
                                velocity: lastAppliedVelocity
                            };
                        }
                    } else {
                        lastPlayheadDifference = playheadDifference;
                        numberOfDetectedResets += 1;

                        if (numberOfDetectedResets <= numberOfExpectedResets) {
                            return {
                                lastAppliedPostion,
                                lastAppliedTimestamp,
                                lastAppliedVelocity,
                                lastPlayheadDifference,
                                mediaElementDelay,
                                numberOfDetectedResets,
                                numberOfExpectedResets,
                                position: currentTime,
                                velocity: lastAppliedVelocity
                            };
                        }

                        numberOfExpectedResets += 1;
                    }
                } else {
                    lastPlayheadDifference = playheadDifference;
                    numberOfExpectedResets = Math.max(numberOfDetectedResets, 1);
                }
            } else {
                lastAppliedTimestamp = 0;
            }

            const positionDifference = Math.abs(currentTime - timingStateVector.position);
            const velocityHasChanged =
                lastAppliedVelocity === 0 ||
                (lastAppliedVelocity < 0 && timingStateVector.velocity > 0) ||
                (lastAppliedVelocity > 0 && timingStateVector.velocity < 0);

            if (positionDifference > tolerance || velocityHasChanged) {
                if (lastAppliedTimestamp > 0) {
                    const elapsedTime = timingStateVector.timestamp - lastAppliedTimestamp;
                    const { position } = translateTimingStateVector(
                        { acceleration: 0, position: lastAppliedPostion, timestamp: lastAppliedTimestamp, velocity: lastAppliedVelocity },
                        elapsedTime
                    );

                    mediaElementDelay = position - currentTime;
                }

                lastAppliedPostion = timingStateVector.position + mediaElementDelay;
                lastAppliedVelocity = timingStateVector.velocity;

                return {
                    lastAppliedPostion,
                    lastAppliedTimestamp: timingStateVector.timestamp,
                    lastAppliedVelocity,
                    lastPlayheadDifference: 0,
                    mediaElementDelay,
                    numberOfDetectedResets: 0,
                    numberOfExpectedResets,
                    position: lastAppliedPostion,
                    velocity: lastAppliedVelocity
                };
            }

            return {
                lastAppliedPostion,
                lastAppliedTimestamp,
                lastAppliedVelocity,
                lastPlayheadDifference,
                mediaElementDelay,
                numberOfDetectedResets,
                numberOfExpectedResets,
                position: currentTime,
                velocity: timingStateVector.velocity
            };
        };
    };
};
