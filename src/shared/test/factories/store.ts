import { StoreId } from '@src/domain/models/store';
import { Knex } from 'knex';

type IData = {
  id?: number;
  slug?: string;
  name?: string;
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  zipCode?: string;
  address?: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  lat?: string;
  lon?: string;
  retailerId?: number;
  deletedAt?: string;
  highlight?: boolean;
};

export const storeFactory = async (
  uow: Knex.Transaction,
  data?: IData,
): Promise<StoreId> => {
  const [store] = await uow('stores')
    .insert({
      id: data?.id || -1,
      slug: data?.slug || 'any_slug',
      name: data?.name || 'any_name',
      background_image_url: data?.backgroundImageUrl,
      logo_image_url: data?.logoImageUrl,
      zip_code: data?.zipCode || '00000-000',
      address: data?.address || 'any_address',
      city: data?.city || 'any_city',
      state: data?.state || 'any_state',
      neighborhood: data?.neighborhood || 'any_neighborhood',
      lat: data?.lat || '0',
      lon: data?.lon || '0',
      retailer_id: data?.retailerId,
      deleted_at: data?.deletedAt,
      highlight: data?.highlight || false,
    })
    .returning('id');

  return store.id;
};
