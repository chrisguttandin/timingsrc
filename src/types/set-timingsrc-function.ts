import { ITimingObject } from 'timing-object';
import { TPrepareTimingStateVectorFunction } from './prepare-timing-state-vector-function';

export type TSetTimingsrcFunction = (
    mediaElement: HTMLMediaElement,
    timingObject: ITimingObject,
    prepareTimingStateVector?: null | TPrepareTimingStateVectorFunction
) => () => void;
