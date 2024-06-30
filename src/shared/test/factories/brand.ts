import { Knex } from 'knex';
import { BrandId } from '@src/domain/models/brand';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';

type IData = {
  id?: BrandId;
  name?: string;
  description?: string;
  logo?: string;
  banner?: string;
};

export const brandFactory = async (uow: Knex.Transaction, data?: IData) => {
  const [brand] = await uow('brands')
    .insert({
      id: data?.id || generateRandomIntId(),
      name: data && data.name ? data.name : 'any_name',
      description:
        data && data.description ? data.description : 'any_description',
      logo: data && data.logo ? data.logo : 'any_logo',
      banner: data && data.banner ? data.banner : 'any_banner',
    })
    .returning('id');
  return { brand_id: brand.id };
};
