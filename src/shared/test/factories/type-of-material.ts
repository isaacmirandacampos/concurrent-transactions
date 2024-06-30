import { Knex } from 'knex';
import {
  TypeOfMaterialName,
  TypeOfMaterialId,
} from '@src/domain/models/type-of-material';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';

type IData = {
  id?: TypeOfMaterialId;
  name?: TypeOfMaterialName;
  points?: number;
};

export const typeOfMaterialFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const randomId = generateRandomIntId();
  const [type_of_materials] = await uow('type_of_materials')
    .insert({
      id: data && data.id ? data.id : randomId,
      name: data && data.name ? data.name : `any_name_${randomId}`,
      points: data && data.points ? data.points : 10,
    })
    .returning(['id', 'name']);

  return {
    type_of_material_id: type_of_materials.id,
    type_of_material_type: type_of_materials.name,
  };
};
