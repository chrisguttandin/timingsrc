const DEFAULT_VALUES = [Number.MIN_VALUE, Number.MAX_VALUE] as const;

export const determineSupportedPlaybackRateValues = (window: null | (Window & typeof globalThis)) => {
    if (window === null) {
        return DEFAULT_VALUES;
    }

    const audio = new window.Audio();

    try {
        // Bug #2: Chrome does not support values above 16.
        audio.playbackRate = 17;
    } catch {
        // Bug #1: Chrome does not support values below 0.625.
        return [0.625, 16] as const;
    }

    try {
        // Bug #3: Firefox does not support negative values.
        audio.playbackRate = -1;
    } catch {
        return [0, DEFAULT_VALUES[1]] as const;
    }

    return DEFAULT_VALUES;
};
