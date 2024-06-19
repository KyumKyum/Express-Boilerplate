import _ from 'lodash';
import dotenv from 'dotenv';
import * as process from 'node:process';

const mode = process.env.NODE_ENV || 'development';
const cwd = process.cwd();
const path = mode === 'development' ? `${cwd}/src/env/.env.development` : `${cwd}/src/env/.env.production`;

const configDotenv = _.get(dotenv.config({ path }), 'parsed');
const configProcess = process.env || {};

//* Generate new config file with config dotenv. Gather defined but unrecognized envs in dotenv.
const config = _.assign({}, configDotenv, _.pick(configProcess, _.keysIn(configDotenv)));

export default config;
