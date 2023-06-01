class SetupReact {
  constructor() {
    this.configReact = '~/MicroverseSetup/.config/React';
    this.dependencies = [
      'eslint@7.x',
      'eslint-config-airbnb@18.x',
      'eslint-plugin-import@2.x',
      'eslint-plugin-jsx-a11y@6.x',
      'eslint-plugin-react@7.x',
      'eslint-plugin-react-hooks@4.x',
      '@babel/eslint-parser@7.x',
      '@babel/core@7.x',
      '@babel/plugin-syntax-jsx@7.x',
      '@babel/preset-react@7.x',
      'stylelint@13.x',
      'stylelint-scss@3.x',
      'stylelint-config-standard@21.x',
      'stylelint-csstree-validator@1.x',
    ];
  }

  async setup() {
    console.log('Running setup...');
    await this.getReactConfig();
    await this.setDependencies();
    console.log('REACT SETUP COMPLETE ✅');
  }

  async getReactConfig() {
    console.log('Copying react config...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec(`cp -r ${this.configReact}/. .`, (error) => {
        if (error) {
          reject(error);
        }
        console.log('React config copied successfully ✅');
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
        resolve();
      });
    });
  }
}

module.exports = new SetupReact();
