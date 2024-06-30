import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';
import { Knex } from 'knex';

type IPartialData = {
  id?: number;
  slug?: string;
  description?: string;
  deleted_at?: string;
};

export const productCategoryFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const randomId = generateRandomIntId();
  const [category] = await uow('product_categories')
    .insert({
      id: data?.id || randomId,
      slug: data?.slug || `any_slug_${randomId}`,
      description: data?.description || 'any_description',
      deleted_at: data?.deleted_at,
    })
    .returning('id');

  return category.id;
};
