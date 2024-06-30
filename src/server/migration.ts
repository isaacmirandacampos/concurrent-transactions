import knex from '@src/infra/database/knex';

export const lambdaHandler = async () => {
  try {
    console.info('run migrations');
    await knex.migrate.latest({
      directory: './database/knex/migrations',
      loadExtensions: ['.js'],
    });
    console.info('migrations finished');
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
};
