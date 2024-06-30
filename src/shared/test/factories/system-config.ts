import { Knex } from 'knex';

type IData = {
  key?: string;
  value?: string;
};

export const systemConfigFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [systemConfig] = await uow('system_configs')
    .insert({
      key: data?.key || 'any_key',
      value: data?.value || 'any_value',
    })
    .returning('key');
  return systemConfig.key;
};
