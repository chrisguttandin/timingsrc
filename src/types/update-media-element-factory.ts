import { TPauseFunction } from './pause-function';
import { TPlayFunction } from './play-function';
import { TUpdateMediaElementFunction } from './update-media-element-function';

export type TUpdateMediaElementFactory = (pause: TPauseFunction, play: TPlayFunction) => TUpdateMediaElementFunction;
