import { Knex } from 'knex';
import { v4 } from 'uuid';
import { RecycledItemId } from '@src/domain/models/recycled-item';
import { ProductId } from '@src/domain/models/product';
import { TypeOfMaterialId } from '@src/domain/models/type-of-material';
import { RecyclingFlowId } from '@src/domain/models/recycling-flow';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';
import { recyclingFlowFactory } from './recycling-flow';

type IData = {
  id?: RecycledItemId;
  type_of_material_id?: TypeOfMaterialId;
  product_id?: ProductId;
  uuid?: string;
  recycled_date?: string;
  recycling_flow_id?: RecyclingFlowId;
  rewarded?: boolean;
};

export const recycledItemFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [recycled_items] = await uow('recycled_items')
    .insert({
      id: data?.id || generateRandomIntId(),
      type_of_material_id: data?.type_of_material_id,
      product_id: data && data.product_id,
      recycling_flow_id:
        data && data.recycling_flow_id
          ? data.recycling_flow_id
          : (await recyclingFlowFactory(uow)).recycling_flow_id,
      recycled_date:
        data && data.recycled_date
          ? data.recycled_date
          : new Date().toISOString(),
      uuid: data && data.uuid ? data.uuid : v4(),
      rewarded: data && data.rewarded,
    })
    .returning(['id', 'uuid']);
  return {
    recycled_item_id: recycled_items.id,
    recycled_item_uuid: recycled_items.uuid,
  };
};
