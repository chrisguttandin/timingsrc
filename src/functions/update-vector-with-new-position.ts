export const updateVectorWithNewPosition = (
    mediaElementDelay: number,
    position: number,
    updateVelocity: (nextPosition: number) => number
) => {
    const nextPosition = position + mediaElementDelay;

    return { mediaElementDelay, position: nextPosition, velocity: updateVelocity(nextPosition) };
};
