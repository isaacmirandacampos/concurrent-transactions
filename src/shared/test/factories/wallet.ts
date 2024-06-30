import { Knex } from 'knex';
import { v4 } from 'uuid';

type IData = {
  id?: string;
  user_id: string;
  current_points?: number;
  current_vouchers_recicla_ai?: number;
  accumulated_total_points?: number;
  accumulated_total_vouchers_recicla_ai?: number;
  accumulated_total_recycled_items?: number;
  deleted_at?: string;
};

export const walletFactory = async (
  uow: Knex.Transaction,
  data: IData | undefined = undefined,
) => {
  const [wallet] = await uow('wallets')
    .insert({
      id: data?.id || v4(),
      user_id: data?.user_id,
      current_points: data?.current_points || 0,
      current_vouchers_recicla_ai: data?.current_vouchers_recicla_ai || 0,
      accumulated_total_points: data?.accumulated_total_points || 0,
      accumulated_total_vouchers_recicla_ai:
        data?.accumulated_total_vouchers_recicla_ai || 0,
      accumulated_total_recycled_items:
        data?.accumulated_total_recycled_items || 0,
      deleted_at: data?.deleted_at,
    })
    .returning('id');
  return { wallet_id: wallet.id };
};
