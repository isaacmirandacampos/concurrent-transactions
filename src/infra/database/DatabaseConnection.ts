import knex, { Knex } from 'knex';

export class DatabaseConnection {
  private connection: Knex;
  constructor() {
    this.connection = knex({
      client: 'pg',
      connection: process.env.CI_DATABASE_URL || process.env.DATABASE_URL,
    }).on('query-error', error => {
      throw new Error(error.message);
    });
  }

  public async getConnection() {
    return this.connection;
  }

  public async getTransaction() {
    return this.connection.transaction();
  }

  public async close() {
    await this.connection.destroy();
  }
}
