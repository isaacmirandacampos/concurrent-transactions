import { FastifyInstance } from 'fastify';
import { depositsRoutes } from './deposits/deposit.routes';

export const transactionsRoutes = (fastify: FastifyInstance, _, done) => {
  fastify.register(depositsRoutes, { prefix: 'deposits' });
  done();
};
