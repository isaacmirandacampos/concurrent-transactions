import fastify, { FastifyInstance } from 'fastify';
import { transactionsRoutes } from '@src/infra/http/transactions/transactions.routes';

class App {
  server: FastifyInstance;

  constructor() {
    this.server = fastify();
  }

  public async mountRoutes() {
    this.server.register(
      async (instance, _opts, done) => {
        transactionsRoutes(instance, null, done);
        done();
      },
      {
        prefix: 'transactions',
      },
    );
  }
}

export default App;
