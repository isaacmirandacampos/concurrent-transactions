import { WalletId } from '../domain/models/wallet';
import { WalletRepository } from '../domain/repositories/wallet.repository';

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export type Response =
  | {
      status: 'error';
      type: 'not_found';
      message: string;
    }
  | {
      status: 'success';
      data: void;
    };

export class DepositMoneyWithConcurrentTransactionUseCase {
  constructor(private readonly walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(wallet_id: WalletId, deposit: number): Promise<Response> {
    const wallet = await this.walletRepository.findByIdLocked(wallet_id);
    if (!wallet)
      return {
        status: 'error',
        type: 'not_found',
        message: 'Wallet not found',
      };
    await delay(100);
    wallet.deposit(deposit);
    await this.walletRepository.update(wallet_id, wallet);
    return { status: 'success', data: undefined };
  }
}
