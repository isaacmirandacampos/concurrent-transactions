import { Knex } from 'knex';
import { WalletHistoryId } from '@src/domain/models/wallet-history';
import { WalletHistoryCode } from '@src/shared/constants/wallet-history';
import { WalletId } from '@src/domain/models/wallet';
import { RecycledItemId } from '@src/domain/models/recycled-item';
import { walletFactory } from './wallet';
import { recycledItemFactory } from './recycled-item';

type IData = {
  id?: WalletHistoryId;
  event?: string;
  eventCode?: WalletHistoryCode;
  points?: number;
  vouchersReciclaAi?: number;
  walletId?: WalletId;
  recycledItemId?: RecycledItemId;
  userRead?: boolean;
};

export const walletHistoryFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [walletHistoryItem] = await uow('wallet_histories')
    .insert({
      id: data?.id || -1,
      event: data?.event || 'any_event_description',
      event_code:
        data?.eventCode ||
        WalletHistoryCode.TOTAL_POINTS_INCREASED_AUTOMATICALLY_BY_RECYCLED_ITEM,
      points: data?.points !== undefined ? data.points : 100,
      vouchers_recicla_ai:
        data?.vouchersReciclaAi !== undefined ? data.vouchersReciclaAi : 1,
      wallet_id: data?.walletId || (await walletFactory(uow)),
      recycled_item_id:
        data?.recycledItemId ||
        (await recycledItemFactory(uow))?.recycled_item_id,
      user_read: data?.userRead === true,
    })
    .returning<{ id: WalletHistoryId }[]>('id');

  return walletHistoryItem.id;
};
