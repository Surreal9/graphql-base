const path = require('path');
const { some, toNumber } = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const npmRun = require('npm-run');

const asyncReadFile = promisify(fs.readFile);
const asyncWriteFile = promisify(fs.writeFile);

const { getChangedFilesForRoots } = require('jest-changed-files');

async function getCachedSha() {
  const cacheFile = path.join(__dirname, 'cached_sha');
  const content = await asyncReadFile(cacheFile, 'utf8').catch(() => '');
  return content;
}

async function putCachedSha(sha) {
  const cacheFile = path.join(__dirname, 'cached_sha');
  const content = await asyncWriteFile(cacheFile, sha, 'utf8').catch(() => '');
}

// Return true if either
async function checkForTestShaCache() {
  // See if we've cached the last git SHA of when we ran tests
  const cachedSha = await getCachedSha();
  const curSha = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();
  if (cachedSha === curSha) {
    return false;
  }
  await putCachedSha(curSha);
  return true;
}

// Get list of files since last git commit, look for database work to reset the test db
function checkForRecentDatabaseChanges() {
  return getChangedFilesForRoots(['./']).then(({ changedFiles }) => {
    const files = Array.from(changedFiles);
    return some(
      files,
      file =>
        file.includes('migration') ||
        file.includes('seed') ||
        file.includes('fixtures')
    );
  });
}

function reset() {
  npmRun.sync(`ts-node -e "require('./database/db-reset').resetFromCLI()"`, {
    stdio: [0, 1, 2],
  });
}

module.exports = {
  checkForTestShaCache,
  checkForRecentDatabaseChanges,
  reset,
};
