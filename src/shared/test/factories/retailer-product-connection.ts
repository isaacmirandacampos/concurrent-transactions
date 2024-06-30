import { Knex } from 'knex';
import { RetailerId } from '@src/domain/models/retailer';
import { retailerFactory } from './retailer';
import { productFactory } from './product';

type IPartialData = {
  id?: number;
  retailerId?: RetailerId;
  voucherReciclaAiCost?: number;
  productCode?: string;
};

export const retailerProductConnectionFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [retailerProductConnection] = await uow('retailer_product_connections')
    .insert({
      id: data?.id || -1,
      retailer_id: data?.retailerId || (await retailerFactory(uow)),
      voucher_recicla_ai_cost: data?.voucherReciclaAiCost || 1,
      product_code:
        data?.productCode || (await productFactory(uow)).product_code,
    })
    .returning('id');

  return retailerProductConnection.id;
};
