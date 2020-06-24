import { TUpdateFunction } from './update-function';

export type TUpdateGraduallyFactory = (timeConstant: number, threshold: number, tolerance: number) => TUpdateFunction;
