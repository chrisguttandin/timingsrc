import { createSetTimingsrc } from '../../../src/factories/set-timingsrc';
import { stub } from 'sinon';

describe('setTimingsrc()', () => {
    let mediaElement;
    let setTimingsrc;
    let setTimingsrcWithCustomUpdateFunction;
    let subscription;
    let timingObject;
    let update;

    beforeEach(() => {
        mediaElement = 'a fake MediaElement';
        setTimingsrcWithCustomUpdateFunction = stub();
        subscription = 'a fake subscription';
        timingObject = 'a fake TimingObject';
        update = 'a fake update() function';

        setTimingsrc = createSetTimingsrc(setTimingsrcWithCustomUpdateFunction, update);

        setTimingsrcWithCustomUpdateFunction.returns(subscription);
    });

    describe('with a provided prepareTimingStateVector function', () => {
        let prepareTimingStateVector;

        beforeEach(() => {
            prepareTimingStateVector = 'a fake prepareTimingStateVector() function';
        });

        describe('without a provided prepareUpdateVector function', () => {
            it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies updates', () => {
                setTimingsrc(mediaElement, timingObject, prepareTimingStateVector);

                expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                    mediaElement,
                    timingObject,
                    update,
                    prepareTimingStateVector,
                    null
                );
            });

            it('should return the value returned by setTimingsrcWithCustomUpdateFunction', () => {
                expect(setTimingsrc(mediaElement, timingObject, prepareTimingStateVector)).to.equal(subscription);
            });
        });

        describe('with a provided prepareUpdateVector function', () => {
            let prepareUpdateVector;

            beforeEach(() => {
                prepareUpdateVector = 'a fake prepareUpdateVector() function';
            });
            it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies updates', () => {
                setTimingsrc(mediaElement, timingObject, prepareTimingStateVector, prepareUpdateVector);

                expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                    mediaElement,
                    timingObject,
                    update,
                    prepareTimingStateVector,
                    prepareUpdateVector
                );
            });

            it('should return the value returned by setTimingsrcWithCustomUpdateFunction', () => {
                expect(setTimingsrc(mediaElement, timingObject, prepareTimingStateVector)).to.equal(subscription);
            });
        });
    });

    describe('without a provided prepareTimingStateVector function', () => {
        it('should call setTimingsrcWithCustomUpdateFunction internally with the function that applies updates', () => {
            setTimingsrc(mediaElement, timingObject);

            expect(setTimingsrcWithCustomUpdateFunction).to.have.been.calledOnce.and.calledWithExactly(
                mediaElement,
                timingObject,
                update,
                null,
                null
            );
        });

        it('should return the value returned by setTimingsrcWithCustomUpdateFunction', () => {
            expect(setTimingsrc(mediaElement, timingObject)).to.equal(subscription);
        });
    });
});
