import { FastifyInstance } from 'fastify';
import { Knex } from 'knex';
import { DatabaseConnection } from '@src/infra/database/DatabaseConnection';
import TestApp from './test-app';

const withApp =
  (callback: (app: FastifyInstance, uow: Knex.Transaction) => Promise<void>) =>
  async (): Promise<void> => {
    const app = new TestApp();
    const databaseInstance = new DatabaseConnection();
    const connection = await databaseInstance.getConnection();
    await connection.transaction(async trx => {
      await app.mountRoutes();
      try {
        await callback(app.server, trx);
        /** IMPORTANT:
         * Do not move trx rollback to try-finally block!
         * Because all tests must pass regardless of exceptions being thrown
         *
         * Otherwise, if you implements "done" (DoneCallback) jest method example,
         * available in: <https://jestjs.io/pt-BR/docs/asynchronous> last access: 14-01-2022 14:00,
         * catch block gets any error, even those one we want fastify error hook throws
         * (e.g. InvalidStateOrDataError) and will make transactions be completed registering test data,
         * because the async transaction is finished.
         */
        await trx.rollback();
      } catch (err: any) {
        console.info(err.message, err);
        throw err;
      } finally {
        app.server.close();
      }
    });
  };

export default withApp;
