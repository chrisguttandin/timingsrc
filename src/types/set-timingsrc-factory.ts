import { TSetTimingsrcFunction } from './set-timingsrc-function';
import { TSetTimingsrcWithCustomUpdateFunctionFunction } from './set-timingsrc-with-custom-update-function-function';
import { TUpdateGraduallyFactory } from './update-gradually-factory';
import { TUpdateStepwiseFactory } from './update-stepwise-factory';

export type TSetTimingsrcFactory = (
    createUpdateGradually: TUpdateGraduallyFactory,
    createUpdateStepwise: TUpdateStepwiseFactory,
    setTimingsrcWithCustomUpdateFunction: TSetTimingsrcWithCustomUpdateFunctionFunction,
    window: null | Window
) => TSetTimingsrcFunction;
