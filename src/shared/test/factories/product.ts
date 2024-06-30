import { Knex } from 'knex';
import { ProductId } from '@src/domain/models/product';
import { BrandId } from '@src/domain/models/brand';
import { TypeOfMaterialId } from '@src/domain/models/type-of-material';
import { ProductCategoryId } from '@src/domain/models/product-category';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';
import { brandFactory, typeOfMaterialFactory } from '.';
import { productCategoryFactory } from './product-category';

type IData = {
  id?: ProductId;
  brandId?: BrandId;
  typeOfMaterialId?: TypeOfMaterialId;
  name?: string;
  image?: string;
  barcode?: string;
  productCode?: string;
  categoryId?: ProductCategoryId;
};

export const productFactory = async (uow: Knex.Transaction, data?: IData) => {
  const randomId = generateRandomIntId();
  const [product] = await uow('products')
    .insert({
      id: data?.id || randomId,
      name: data && data.name ? data.name : 'any_name',
      product_code:
        data && data.productCode
          ? data.productCode
          : `any_product_code_${randomId}`,
      brand_id:
        data && data.brandId
          ? data.brandId
          : (await brandFactory(uow)).brand_id,
      type_of_material_id:
        data && data.typeOfMaterialId
          ? data.typeOfMaterialId
          : (await typeOfMaterialFactory(uow)).type_of_material_id,
      image: data && data.image ? data.image : 'any_image',
      barcode: data && data.barcode ? data.barcode : 'any_barcode',
      category_id: data?.categoryId || (await productCategoryFactory(uow)),
    })
    .returning(['id', 'product_code']);
  return { product_id: product.id, product_code: product.product_code };
};
