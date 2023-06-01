class SetupLinters {
  constructor() {
    this.configLinters = '~/MicroverseSetup/.config/Linters';
    this.dependencies = [
      'lighthouse',
      'hint@7.x',
      'stylelint@13.x',
      'stylelint-scss@3.x',
      'stylelint-config-standard@21.x',
      'stylelint-csstree-validator@1.x',
      'eslint@7.x',
      'eslint-config-airbnb-base@14.x',
      'eslint-plugin-import@2.x',
      'babel-eslint@10.x',
    ];
  }

  async setup() {
    console.log('Running setup...');
    await this.getLintersConfig();
    await this.setDependencies();
    console.log('LINTERS SETUP COMPLETE ✅');
  }

  async getLintersConfig() {
    console.log('Copying linter config...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec(`cp -r ${this.configLinters}/. .`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        console.log('Linter config copied successfully ✅');
        resolve();
      });
    });
  }

  async setDependencies() {
    console.log('Installing dependencies...');
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec('npm init -y', async (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        for (const dependency of this.dependencies) {
          await new Promise((resolve, reject) => {
            exec(
              `npm install --save-dev ${dependency}`,
              (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                }
                console.log(
                  `Dependency ${dependency} installed successfully ✅`
                );
                resolve();
              }
            );
          });
        }
        resolve();
      });
    });
  }
}

module.exports = new SetupLinters();
