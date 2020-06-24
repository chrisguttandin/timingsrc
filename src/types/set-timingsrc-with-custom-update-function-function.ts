import { ITimingObject } from 'timing-object';
import { TPrepareTimingStateVectorFunction } from './prepare-timing-state-vector-function';
import { TUpdateFunction } from './update-function';

export type TSetTimingsrcWithCustomUpdateFunctionFunction = (
    mediaElement: HTMLMediaElement,
    timingObject: ITimingObject,
    updateFunction: TUpdateFunction,
    prepareTimingStateVector?: null | TPrepareTimingStateVectorFunction
) => () => void;
