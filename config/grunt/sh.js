module.exports = () => {
    return {
        'build': {
            cmd: 'npm run build'
        },
        'test-expectation-chrome': {
            cmd: 'npm run test:expectation-chrome'
        },
        'test-expectation-firefox': {
            cmd: 'npm run test:expectation-firefox'
        },
        'test-expectation-safari': {
            cmd: 'npm run test:expectation-safari'
        },
        'test-integration': {
            cmd: 'npm run test:integration'
        },
        'test-unit': {
            cmd: 'npm run test:unit'
        }
    };
};
