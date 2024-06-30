import { StoreId } from '@src/domain/models/store';
import { Knex } from 'knex';
import { RetailerId } from '@src/domain/models/retailer';

type IPartialData = {
  id?: number;
  belongsSolelyToStoreId?: StoreId;
  belongsSolelyToRetailerId?: RetailerId;
  deletedAt?: string;
};

export const creditBatchFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [creditBatch] = await uow('credit_batches')
    .insert({
      id: data?.id || -1,
      belongs_solely_to_store_id: data?.belongsSolelyToStoreId,
      belongs_solely_to_retailer_id: data?.belongsSolelyToRetailerId,
      deleted_at: data?.deletedAt,
    })
    .returning('id');

  return creditBatch.id;
};
