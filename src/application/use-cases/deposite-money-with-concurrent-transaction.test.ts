import { DatabaseConnection } from '@src/infra/database/DatabaseConnection';
import { DepositMoneyWithConcurrentTransactionUseCase } from './deposite-money-with-concurrent-transaction';
import { WalletRepository } from '../domain/repositories/wallet.repository';

describe('DepositMoneyWithConcurrentTransactionUseCase', () => {
  describe('Should deposit money in a wallet without locking the table', () => {
    it('should deposit money in a wallet', async () => {
      const databaseInstance = new DatabaseConnection();
      const connection = await databaseInstance.getConnection();
      try {
        await connection.transaction(async uow => {
          const [wallet] = await uow
            .from('wallets')
            .insert({ money: 0 })
            .returning('id');
          const depositMoneyUseCase =
            new DepositMoneyWithConcurrentTransactionUseCase(
              new WalletRepository(uow),
            );
          const response = await depositMoneyUseCase.execute(wallet.id, 100);
          expect(response).toEqual({ status: 'success', data: undefined });

          await uow.rollback();
        });
      } finally {
        await databaseInstance.close();
      }
    });

    afterEach(async () => {
      const databaseInstance = new DatabaseConnection();
      const connection = await databaseInstance.getConnection();
      await connection.from('wallets').delete();
      await databaseInstance.close();
    });

    it(
      'should deposit money in a wallet with concurrent transactions' +
        'the count of money will correct',
      async () => {
        const databaseInstance = new DatabaseConnection();
        const connection = await databaseInstance.getConnection();
        const [wallet] = await connection
          .from('wallets')
          .insert({ money: 0 })
          .returning('id');
        const promises = Array.from({ length: 20 }).map(async () => {
          await connection.transaction(async uow => {
            try {
              const walletRepository = new WalletRepository(uow);
              const depositMoneyUseCase =
                new DepositMoneyWithConcurrentTransactionUseCase(
                  walletRepository,
                );

              await depositMoneyUseCase.execute(wallet.id, 100.0);
            } catch (err) {
              await uow.rollback();
              throw err;
            }
            await uow.commit();
          });
        });
        await Promise.allSettled(promises);
        const transaction = await databaseInstance.getTransaction();
        const walletRepository = new WalletRepository(transaction);

        const wallet_att = await walletRepository.findById(wallet.id);
        await transaction.rollback();
        await databaseInstance.close();
        expect(wallet_att).toBeDefined();
        expect(wallet_att!.getValues().money).toBe(2000.0);
      },
    );
  });
});
