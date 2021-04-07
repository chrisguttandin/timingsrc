import { animationFrame } from 'subscribable-things';
import { translateTimingStateVector } from 'timing-object';
import { createDefaultSetTimingsrc } from './factories/default-set-timingsrc';
import { createSetTimingsrc } from './factories/set-timingsrc';
import { createSetTimingsrcWithCustomUpdateFunction } from './factories/set-timingsrc-with-custom-update-function';
import { createUpdateGradually } from './factories/update-gradually';
import { createUpdateMediaElement } from './factories/update-media-element';
import { createUpdateStepwiseFactory } from './factories/update-stepwise-factory';
import { createWindow } from './factories/window';
import { pause } from './functions/pause';
import { play } from './functions/play';

export { createSetTimingsrc };

export { createUpdateGradually };

export const createUpdateStepwise = createUpdateStepwiseFactory(translateTimingStateVector);

const updateMediaElement = createUpdateMediaElement(pause, play);

export const setTimingsrcWithCustomUpdateFunction = createSetTimingsrcWithCustomUpdateFunction(animationFrame, updateMediaElement);

export const setTimingsrc = createDefaultSetTimingsrc(
    createSetTimingsrc,
    createUpdateGradually,
    createUpdateStepwise,
    setTimingsrcWithCustomUpdateFunction,
    createWindow()
);
