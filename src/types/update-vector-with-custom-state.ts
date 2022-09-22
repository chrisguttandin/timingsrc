import { TUpdateFunction } from './update-function';

export type TUpdateVectorWithCustomState<UpdateFunction> = UpdateFunction extends TUpdateFunction<infer UpdateVectorWithCustomState>
    ? UpdateVectorWithCustomState
    : never;
