const { env } = require('process');
const { DefinePlugin } = require('webpack');

module.exports = (config) => {
    config.set({
        browserNoActivityTimeout: 20000,

        files: ['../../test/unit/**/*.js'],

        frameworks: ['mocha', 'sinon-chai'],

        preprocessors: {
            '../../test/unit/**/*.js': 'webpack'
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: {
                            loader: 'ts-loader'
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
                extensions: ['.js', '.ts']
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
                build: `${env.GITHUB_REPOSITORY}/${env.GITHUB_RUN_ID}/unit-${env.TARGET}`,
                username: env.BROWSER_STACK_USERNAME,
                video: false
            },

            browsers:
                env.TARGET === 'chrome'
                    ? ['ChromeBrowserStack']
                    : env.TARGET === 'firefox'
                    ? ['FirefoxBrowserStack']
                    : ['ChromeBrowserStack', 'FirefoxBrowserStack'],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeBrowserStack: {
                    base: 'BrowserStack',
                    browser: 'chrome',
                    os: 'OS X',
                    os_version: 'Mojave' // eslint-disable-line camelcase
                },
                FirefoxBrowserStack: {
                    base: 'BrowserStack',
                    browser: 'firefox',
                    os: 'Windows',
                    os_version: '10' // eslint-disable-line camelcase
                }
            }
        });
    } else {
        config.set({
            browsers: ['ChromeCanaryHeadless', 'ChromeHeadless', 'FirefoxDeveloperHeadless', 'FirefoxHeadless']
        });
    }
};
