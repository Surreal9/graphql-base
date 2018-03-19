const path = require('path');
const { some } = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const npmRun = require('npm-run');

const asyncReadFile = promisify(fs.readFileSync);
const asyncWriteFile = promisify(fs.writeFileSync);

const { getChangedFilesForRoots } = require('jest-changed-files');

async function getCachedSha() {
  const cacheFile = path.join(__dirname, 'cached_sha');
  const content = await asyncReadFile(path.join(cacheFile), 'utf8').catch(
    () => ''
  );
  console.log('content', content);
  return content;
}

// Return true if either
async function checkForTestShaCache() {
  // See if we've cached the last git SHA of when we ran tests
  const cachedSha = await getCachedSha();
  if (cachedSha) {
    const curSha = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
    console.log({ curSha });
    if (curSha !== cachedSha) {
      return true;
    }
  } else {
    return true;
  }
  return false;
}

// Get list of files since last git commit, look for database work to reset the test db
function checkForRecentDatabaseChanges() {
  return getChangedFilesForRoots(['./']).then(({ changedFiles }) => {
    const files = Array.from(changedFiles);
    return some(
      files,
      file => file.includes('migration') || file.includes('seed')
    );
  });
}

function reset() {
  // console.log('Attempt to reset db');
  // return new Promise(function(resolve, reject) {
  //   // const child = exec('. ~/.nvm/nvm.sh ; npm run reset-test-db');
  //   const child = spawn('pwd');

  //   child.stdout.on('data', function(data) {
  //     process.stdout.write(data);
  //   });

  //   child.on('error', function(data) {
  //     console.log('error', data);
  //     reject('Reset db errored!');
  //   });

  //   child.on('exit', function() {
  //     resolve('Reset test db success');
  //   });
  // });
  npmRun.sync(`ts-node -e "require('./database/db-reset').resetFromCLI()"`, {
    stdio: [0, 1, 2],
  });
}

module.exports = {
  checkForTestShaCache,
  checkForRecentDatabaseChanges,
  reset,
};
