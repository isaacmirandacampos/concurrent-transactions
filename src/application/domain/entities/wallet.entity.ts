import { WalletTable } from '../models/wallet';

export class WalletEntity {
  private readonly id: number | undefined = undefined;
  private money: number;
  private readonly created_at: Date | undefined = undefined;
  private updated_at: Date | undefined = undefined;
  private deleted_at: Date | undefined = undefined;

  constructor(wallet: WalletTable) {
    this.id = wallet.id;
    this.money = Number(wallet.money);
    this.created_at = wallet.created_at;
    this.updated_at = wallet.updated_at;
    this.deleted_at = wallet.deleted_at;
  }

  public getValues(): WalletTable {
    return {
      id: this.id,
      money: Number(this.money),
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
    };
  }

  delete() {
    this.deleted_at = new Date();
  }

  deposit(money: number) {
    this.money += money;
  }
}
