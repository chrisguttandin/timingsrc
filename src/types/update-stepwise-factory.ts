import { TUpdateFunction } from './update-function';

export type TUpdateStepwiseFactory = (tolerance: number) => TUpdateFunction;
