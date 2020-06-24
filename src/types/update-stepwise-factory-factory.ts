import { TTranslateTimingStateVectorFunction } from 'timing-object';
import { TUpdateStepwiseFactory } from './update-stepwise-factory';

export type TUpdateStepwiseFactoryFactory = (translateTimingStateVector: TTranslateTimingStateVectorFunction) => TUpdateStepwiseFactory;
