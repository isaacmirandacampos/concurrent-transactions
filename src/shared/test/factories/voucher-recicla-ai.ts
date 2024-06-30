import { Knex } from 'knex';
import { VoucherReciclaAiStatus } from '@src/shared/constants/voucher-recicla-ai';
import { RecycledItemId } from '@src/domain/models/recycled-item';
import { VoucherReciclaAiId } from '@src/domain/models/voucher-recicla-ai';
import { UserId } from '@src/domain/models/user';
import { recycledItemFactory } from './recycled-item';
import { userFactory } from './user';

type IData = {
  id?: VoucherReciclaAiId;
  used_at?: Date;
  recycledItemId?: RecycledItemId;
  status?: VoucherReciclaAiStatus;
  userId?: UserId;
  validFrom?: Date;
  validUntil?: Date;
  deletedAt?: Date;
};

export const voucherReciclaAiFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [registeredRow] = await uow('vouchers_recicla_ai')
    .insert({
      id: data?.id || -1,
      used_at: data?.used_at,
      recycled_item_id:
        data?.recycledItemId ||
        (await recycledItemFactory(uow))?.recycled_item_id,
      status: data?.status || VoucherReciclaAiStatus.AVAILABLE_TO_REDEEM_CREDIT,
      user_id: data?.userId || (await userFactory(uow))?.user_id,
      valid_from: data?.validFrom || new Date(),
      valid_until: data?.validUntil,
      deleted_at: data?.deletedAt,
    })
    .returning<{ id: VoucherReciclaAiId }[]>('id');

  return registeredRow.id;
};
