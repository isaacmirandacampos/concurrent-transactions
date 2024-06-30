const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

let dotenvConfigFileName: string;
if (process.env.CI === 'true') {
  dotenvConfigFileName = '.env.pipeline';
} else if (process.env.NODE_ENV === 'test') {
  dotenvConfigFileName = '.env.testing';
} else {
  dotenvConfigFileName = '.env';
}
const pathname = path.resolve(__dirname, dotenvConfigFileName);
if (!fs.existsSync(pathname)) {
  throw new Error(`Create a ${dotenvConfigFileName} file and try again!`);
}
dotenv.config({ path: dotenvConfigFileName });

module.exports = {
  client: 'pg',
  connection: process.env.CI_DATABASE_URL || process.env.DATABASE_URL,
  pool: { min: 1, max: 1 },
  migrations: {
    name: 'migrations',
    directory: 'src/infra/database/knex/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: 'src/infra/database/knex/seeds',
    extension: 'ts',
  },
};

export {};
