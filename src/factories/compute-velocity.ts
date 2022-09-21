export const createComputeVelocity = (timeConstant: number) => (delta: number, minValue: number, maxValue: number, velocity: number) =>
    Math.max(minValue, Math.min(maxValue, ((timeConstant - delta) / timeConstant) * velocity));
