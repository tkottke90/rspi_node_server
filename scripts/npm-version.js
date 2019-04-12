const fs = require('fs');
const chalk = require('chalk');
const logger = require('../src/logger');

const validCommands = ['major', 'minor', 'revision'];

const versionManager = {
  major: (version) => {
    version[0]++;
    return version;
  },
  minor: (version) => {
    version[1]++;
    return version;
  }, 
  revision: (version) => {
    version[2]++;
    return version;
  }
};

function logChange(original) {
  return updated => {
    return `${new Date().toISOString()} - Update App Version ${original} => ${updated}`;
  };
}

// Check if user entered a valid command (major, minor, or revision)
if (process.argv.length < 3 || !validCommands.includes(process.argv[2]) ) {
  console.error(chalk.red(`Invalid Argument! - '${process.argv[2]}'`));
  console.log('Usage: node npm-version.js [major | minor | revision]');
  process.exit(1);
}

// Check if current directory includes 
const packageExists = fs.existsSync('./package.json');

if (packageExists) {
  // Get Version Number from package.json
  const packageJSON = fs.readFileSync('./package.json');
  const body = JSON.parse(packageJSON);

  // Convert string to arr of numbers
  const version = body.version.split('.').map( num => +num);
  const log = logChange(body.version);

  // Update version based on user input
  body.version = versionManager[process.argv[2]](version).join('.');

  fs.writeFileSync('./package.json', JSON.stringify(body, null, 2), 'utf8');

  logger ? logger.info(log(body.version)) : console.log(chalk.green(log(body.version)));
} else {
  console.error(chalk.red(`Missing package.json at ${process.cwd()}`));
}
