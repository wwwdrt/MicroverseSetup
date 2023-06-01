const path = require('path');
const fs = require('fs');

class SetupWebpack {
  constructor() {
    this.configWebpack = '~/MicroverseSetup/.config/Webpack';
    this.dependencies = [
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'html-webpack-plugin',
      'style-loader',
      '@babel/core',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/preset-env',
      'babel-jest',
      'jest',
      'jest-environment-jsdom',
    ];
  }

  async setup() {
    console.log('Running setup...');
    await this.getWebpackConfig();
    await this.setDependencies();
    console.log('WEBPACK SETUP COMPLETE ✅');
  }

  async getWebpackConfig() {
    console.log('Copying webpack config...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec(`cp -r ${this.configWebpack}/. .`, (error) => {
        if (error) {
          reject(error);
        }
        console.log('Webpack config copied successfully ✅');
        resolve();
      });
    });
  }

  async setDependencies() {
    console.log('Installing dependencies...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec('npm init -y', async (error) => {
        if (error) {
          reject(error);
        }
        for (const dependency of this.dependencies) {
          await new Promise((resolve, reject) => {
            exec(`npm install --save-dev ${dependency}`, (error) => {
              if (error) {
                reject(error);
              }
              console.log(`Dependency ${dependency} installed successfully ✅`);
              resolve();
            });
          });
        }

        const packageJsonPath = path.resolve(process.cwd(), 'package.json');
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8')
        );

        packageJson.main = 'index.js';

        packageJson.scripts = {
          build: 'webpack',
          start: 'webpack serve --open',
          test: 'jest',
        };

        packageJson.jest = {
          testEnvironment: 'jest-environment-jsdom',
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log('Updating package.json...');
        console.log('Main entry point set to "index.js" ✅');
        console.log('Webpack build script added ✅');
        console.log('Webpack start script added ✅');
        console.log('Jest test script added ✅');
        console.log('Jest test environment enabled ✅');

        resolve();
      });
    });
  }
}

module.exports = new SetupWebpack();
