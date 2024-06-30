export type WalletId = number;
export interface WalletTable {
  id?: WalletId;
  money: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}