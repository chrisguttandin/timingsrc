import { TSetPlaybackRateFunction } from './set-playback-rate-function';

export type TSetPlaybackRateFactory = (playbackRateAssignments: WeakMap<HTMLMediaElement, [number, number]>) => TSetPlaybackRateFunction;
