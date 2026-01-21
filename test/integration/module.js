import * as timingsrc from '../../src/module';
import { describe, expect, it } from 'vitest';

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
