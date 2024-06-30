import { Knex } from 'knex';
import { StoreId } from '@src/domain/models/store';
import { storeFactory } from './store';
import { productFactory } from './product';

type IPartialData = {
  id?: number;
  storeId?: StoreId;
  voucherReciclaAiCost?: number;
  productCode?: string;
};

export const storeProductConnectionFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [storeProductConnection] = await uow('store_product_connections')
    .insert({
      id: data?.id || -1,
      store_id: data?.storeId || (await storeFactory(uow)),
      voucher_recicla_ai_cost: data?.voucherReciclaAiCost || 1,
      product_code:
        data?.productCode || (await productFactory(uow)).product_code,
    })
    .returning('id');

  return storeProductConnection.id;
};
