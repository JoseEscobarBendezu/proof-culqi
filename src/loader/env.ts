import * as dotenv from 'dotenv';

dotenv.config();

export default {
  key: process.env.AWS_KEY ?? '',
};
