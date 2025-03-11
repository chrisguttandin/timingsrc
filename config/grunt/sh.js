module.exports = (grunt) => {
    const continuous = grunt.option('continuous') === true;

    return {
        'build': {
            cmd: 'npm run build'
        },
        'test-expectation-chrome': {
            cmd: `karma start config/karma/config-expectation-chrome.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-expectation-firefox': {
            cmd: `karma start config/karma/config-expectation-firefox.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-expectation-safari': {
            cmd: `karma start config/karma/config-expectation-safari.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-integration': {
            cmd: `karma start config/karma/config-integration.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-unit': {
            cmd: `karma start config/karma/config-unit.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        }
    };
};
