import { Knex } from 'knex';
import jwt from 'jsonwebtoken';

type SessionTokenI = {
  user_id: string;
};

export const sessionTokenFactory = async (
  trx: Knex.Transaction,
  data: SessionTokenI,
) => {
  const token = jwt.sign({ user_id: data.user_id }, 'anything', {
    expiresIn: '7 days',
  });

  return { 'session-token': token };
};
