import { Knex } from 'knex';

type IPartialData = {
  id?: number;
  slug?: string;
  name?: string;
  shortDescription?: string;
  description?: string;
  previewBackgroundImageUrl?: string;
  backgroundImageUrl?: string;
  logoImageUrl?: string;
  deletedAt?: string;
};

export const retailerFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [retailer] = await uow('retailers')
    .insert({
      id: data?.id || -1,
      slug: data?.slug || 'any_slug',
      name: data?.name || 'any_name',
      short_description: data?.shortDescription || 'any_short_description',
      description: data?.description || 'any_description',
      preview_background_image_url: data?.previewBackgroundImageUrl,
      background_image_url: data?.backgroundImageUrl,
      logo_image_url: data?.logoImageUrl,
      deleted_at: data?.deletedAt,
    })
    .returning('id');

  return retailer.id;
};
