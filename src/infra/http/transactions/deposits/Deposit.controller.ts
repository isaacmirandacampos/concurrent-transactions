import { FastifyReply } from 'fastify';
import { STATUS_CODE } from '@src/shared/constants/status-code';
import { WalletRepository } from '@src/application/domain/repositories/wallet.repository';
import { DatabaseConnection } from '@src/infra/database/DatabaseConnection';
import { DepositMoneyUseCase } from '@src/application/use-cases/deposite-money';
import { GenericFastifyRequest } from '@src/shared/types/fastify';
import { InputBody, InputParam } from './deposit-money.schema';

export class DepositController {
  public async depositMoney(
    req: GenericFastifyRequest<InputParam, InputBody, null>,
    res: FastifyReply,
  ) {
    const { deposit } = req.body;
    const { wallet_id } = req.params;
    const databaseConnection = new DatabaseConnection();
    const uow = await databaseConnection.getTransaction();
    const walletRepository = new WalletRepository(uow);
    const depositMoneyUseCase = new DepositMoneyUseCase(walletRepository);
    const result = await depositMoneyUseCase.execute(wallet_id, deposit);
    if (result.status === 'error') {
      await uow.rollback();
      res.status(STATUS_CODE.NOT_FOUND).send({ message: result.message });
      return;
    }
    await uow.commit();
    await databaseConnection.close();
    res.status(STATUS_CODE.NO_CONTENT).send(undefined);
  }
}

export default new DepositController();
