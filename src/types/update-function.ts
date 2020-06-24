import { ITimingStateVector } from 'timing-object';
import { IUpdateVector } from '../interfaces';

export type TUpdateFunction = (timingStateVector: ITimingStateVector, currentTime: number) => IUpdateVector;
