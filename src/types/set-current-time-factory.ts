import { TSetCurrentTimeFunction } from './set-current-time-function';

export type TSetCurrentTimeFactory = (currentTimeAssignments: WeakMap<HTMLMediaElement, [number, number]>) => TSetCurrentTimeFunction;
