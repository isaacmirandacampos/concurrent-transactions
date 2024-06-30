import { Knex } from 'knex';
import { ProductId } from '@src/domain/models/product';
import { CreditId } from '@src/domain/models/credit';
import { productFactory } from './product';
import { creditFactory } from './credit';

type IPartialData = {
  id?: number;
  creditId?: CreditId;
  productId?: ProductId;
};

export const creditProductConnectionFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [creditProductConnection] = await uow('credit_product_connections')
    .insert({
      id: data?.id || -1,
      credit_id: data?.creditId || (await creditFactory(uow)),
      product_id: data?.productId || (await productFactory(uow)).product_id,
    })
    .returning('id');

  return creditProductConnection.id;
};
