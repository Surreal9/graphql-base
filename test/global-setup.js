// As of yet the jest does not support TS in "globalSetup"
const {
  checkForRecentDatabaseChanges,
  checkForTestShaCache,
  reset,
} = require('./global-setup-util');

const resetDbPromise =
  // Try to not reset the test db if we don't think we need to
  Promise.all([checkForRecentDatabaseChanges(), checkForTestShaCache()])
    .then(([dbWork, newSha]) => {
      console.log({ dbWork, newSha });
      if (dbWork || newSha) {
        return reset();
      }
    })
    .catch(err => console.log(err));

module.exports = async () => resetDbPromise;
