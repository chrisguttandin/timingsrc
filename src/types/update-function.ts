import { ITimingStateVector } from 'timing-object';
import { IUpdateVector } from '../interfaces';

export type TUpdateFunction<UpdateVectorWithCustomState extends IUpdateVector> = (
    timingStateVector: ITimingStateVector,
    currentTime: number,
    previousUpdateVectorWithCustomState: null | UpdateVectorWithCustomState
) => UpdateVectorWithCustomState;
