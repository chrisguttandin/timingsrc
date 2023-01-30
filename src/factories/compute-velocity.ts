export const createComputeVelocity = (timeConstant: number) => (delta: number, minValue: number, maxValue: number, velocity: number) => {
    const factor = (Math.abs(delta) + timeConstant) / timeConstant;

    return Math.max(minValue, Math.min(maxValue, delta > 0 ? velocity / factor : factor * velocity));
};
