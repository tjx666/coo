/* eslint-disable import/prefer-default-export */
import { resolve } from 'path';

const __DEV__ = process.env.NODE_ENV !== 'production';
const ENV = __DEV__ ? 'development' : 'production';
const PROJECT_ROOT = resolve(__dirname, '../');

export { __DEV__, ENV, PROJECT_ROOT };
