const { env } = require('process');
const { DefinePlugin } = require('webpack');

module.exports = (config) => {
    config.set({
        basePath: '../../',

        browserDisconnectTimeout: 100000,

        browserNoActivityTimeout: 100000,

        client: {
            mocha: {
                bail: true,
                timeout: 20000
            }
        },

        concurrency: 1,

        files: ['test/expectation/chrome/**/*.js'],

        frameworks: ['mocha', 'sinon-chai'],

        preprocessors: {
            'test/expectation/chrome/**/*.js': 'webpack'
        },

        reporters: ['dots'],

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    declaration: false,
                                    declarationMap: false
                                }
                            }
                        }
                    }
                ]
            },
            plugins: [
                new DefinePlugin({
                    'process.env': {
                        CI: JSON.stringify(env.CI)
                    }
                })
            ],
            resolve: {
                extensions: ['.js', '.ts'],
                fallback: { util: false }
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    });

    if (env.CI) {
        config.set({
            browserStack: {
                accessKey: env.BROWSER_STACK_ACCESS_KEY,
                build: `${env.GITHUB_RUN_ID}/expectation-chrome`,
                forceLocal: true,
                localIdentifier: `${Math.floor(Math.random() * 1000000)}`,
                project: env.GITHUB_REPOSITORY,
                username: env.BROWSER_STACK_USERNAME,
                video: false
            },

            browsers: ['ChromeBrowserStack'],

            captureTimeout: 300000,

            customLaunchers: {
                ChromeBrowserStack: {
                    base: 'BrowserStack',
                    browser: 'chrome',
                    captureTimeout: 300,
                    os: 'OS X',
                    os_version: 'Big Sur' // eslint-disable-line camelcase
                }
            }
        });
    } else {
        config.set({
            browsers: ['ChromeCanaryHeadlessWithNoRequiredUserGesture', 'ChromeHeadlessWithNoRequiredUserGesture'],

            customLaunchers: {
                ChromeCanaryHeadlessWithNoRequiredUserGesture: {
                    base: 'ChromeCanaryHeadless',
                    flags: ['--autoplay-policy=no-user-gesture-required']
                },
                ChromeHeadlessWithNoRequiredUserGesture: {
                    base: 'ChromeHeadless',
                    flags: ['--autoplay-policy=no-user-gesture-required']
                }
            }
        });
    }
};
