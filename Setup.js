const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log(`
   _____      __                                         
  / ___/___  / /___  ______                              
  \\__ \\/ _ \\/ __/ / / / __ \\                             
 ___/ /  __/ /_/ /_/ / /_/ /      (By DRT)                   
/____/\\___/\\__/\\__,_/ .___/                              
                   /_/ 
`);

class Setup {
  constructor() {
    this.options = [
      { name: 'Setup Linters', value: 'linters' },
      { name: 'Setup Webpack', value: 'webpack' },
      { name: 'Setup React', value: 'react' },
    ];

    this.rootDir = path.resolve(process.env.HOME, 'MicroverseSetup');
  }

  async run() {
    const inquirer = require('inquirer');
    const questions = [
      {
        type: 'checkbox',
        name: 'options',
        message: 'Select your configuration:',
        choices: this.options,
        validate: (answer) => {
          if (answer.length === 0) {
            return 'You have to choose a configuration!';
          }
          return true;
        },
      },
    ];

    const answers = await inquirer.prompt(questions);

    if (answers.options.includes('linters')) {
      const Linters = require(path.join(
        this.rootDir,
        '.config/Components/Linters'
      ));
      await Linters.setup();
    }

    if (answers.options.includes('webpack')) {
      const Webpack = require(path.join(
        this.rootDir,
        '.config/Components/Webpack'
      ));
      await Webpack.setup();
    }

    if (answers.options.includes('react')) {
      const React = require(path.join(
        this.rootDir,
        '.config/Components/React'
      ));
      await React.setup();
    }

    console.log('YOU ARE READY TO GO 🚀');
  }
}

const install = () => {
  if (!fs.existsSync('package.json')) {
    execSync('npm init -y > /dev/null 2>&1');
  }

  if (!fs.existsSync('node_modules/inquirer')) {
    execSync('npm i -D inquirer@8.0.0 > /dev/null 2>&1');
  }

  new Setup().run();
};

install();
