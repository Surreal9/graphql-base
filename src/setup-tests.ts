import { startupPromise } from './../database/index';
import 'jest';

console.log('setup!');

beforeAll(() => startupPromise);
