import { FastifyInstance } from 'fastify';
import DepositController from './Deposit.controller';
import { DepositMoneySchema } from './deposit-money.schema';

export const depositsRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    'wallets/:wallet_id', // only use this way because do not have authentication and users table
    {
      schema: DepositMoneySchema,
    },
    DepositController.depositMoney as any,
  );
};
