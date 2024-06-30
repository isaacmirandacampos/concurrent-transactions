import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

let dotenvConfigFileName: string;
if (process.env.CI === 'true') {
  dotenvConfigFileName = '.env.pipeline';
} else {
  dotenvConfigFileName = '.env.testing';
}
const pathname = path.resolve(__dirname, '../../..', dotenvConfigFileName);
if (!fs.existsSync(pathname)) {
  throw new Error(`Create a ${dotenvConfigFileName} file and try again!`);
}
dotenv.config({ path: dotenvConfigFileName });
