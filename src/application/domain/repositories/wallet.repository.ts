import { Knex } from 'knex';
import { WalletId, WalletTable } from '../models/wallet';
import { WalletEntity } from '../entities/wallet.entity';

export class WalletRepository {
  constructor(private readonly uow: Knex.Transaction) {
    this.uow = uow;
  }
  async create(wallet: WalletEntity): Promise<WalletId> {
    const [row] = await this.uow
      .from<WalletTable>('wallets')
      .insert(wallet.getValues())
      .returning<[{ id: WalletId }]>('id');
    return row.id;
  }

  async findById(id: WalletId): Promise<WalletEntity | undefined> {
    const row = await this.uow
      .from<WalletTable>('wallets')
      .where('id', id)
      .whereNull('deleted_at')
      .first();
    if (!row) return undefined;
    return new WalletEntity(row);
  }

  async findByIdLocked(id: WalletId): Promise<WalletEntity | undefined> {
    const row = await this.uow
      .from<WalletTable>('wallets')
      .where('id', id)
      .whereNull('deleted_at')
      .forUpdate()
      .first();
    if (!row) return undefined;
    return new WalletEntity(row);
  }

  async update(wallet_id: WalletId, wallet: WalletEntity): Promise<void> {
    await this.uow
      .from<WalletTable>('wallets')
      .update(wallet.getValues())
      .where('id', wallet_id);
  }

  async delete(id: WalletId): Promise<void> {
    await this.uow
      .from<WalletTable>('wallet')
      .update({ deleted_at: new Date() })
      .where('id', id);
  }
}
