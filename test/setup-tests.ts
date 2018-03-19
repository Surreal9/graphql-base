import { reset } from './../database/db-reset';
import { some } from 'lodash';
import 'jest';

const { getChangedFilesForRoots } = require('jest-changed-files');

// Get list of files since last git commit, look for database work to reset the test db
getChangedFilesForRoots(['./'])
  .then(({ changedFiles }: any) => {
    const files = Array.from(changedFiles);
    if (
      some(
        files,
        (file: string) => file.includes('migration') || file.includes('seed')
      )
    ) {
      console.log('resetting test db');
      beforeAll(() => reset().catch((err: any) => console.log(err)));
    }
  })
  .catch((err: any) => console.log(err));
