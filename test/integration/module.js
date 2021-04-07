import * as timingsrc from '../../src/module';

describe('module', () => {
    it('should export all expected exports', () => {
        expect(timingsrc).to.have.keys(
            'createSetTimingsrc',
            'createUpdateGradually',
            'createUpdateStepwise',
            'setTimingsrc',
            'setTimingsrcWithCustomUpdateFunction'
        );
    });
});
