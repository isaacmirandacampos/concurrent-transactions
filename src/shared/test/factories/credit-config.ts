import { Knex } from 'knex';

type IData = {
  id?: string;
  maximum_value_per_day?: number;
  validity_in_minutes?: number;
  price_in_cents?: number;
  active?: boolean;
  deleted_at?: Date;
};

export const creditConfigFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [creditConfig] = await uow('credit_configs')
    .insert({
      id: data && data.id ? data.id : 1,
      maximum_value_per_day:
        data && data.maximum_value_per_day ? data.maximum_value_per_day : 100,
      validity_in_minutes:
        data && data.validity_in_minutes ? data.validity_in_minutes : 30,
      price_in_cents: data && data.price_in_cents ? data.price_in_cents : 20,
      active: (data && data.active) || false,
      deleted_at: data && data.deleted_at ? data.deleted_at : null,
    })
    .returning('id');

  return creditConfig.id;
};
