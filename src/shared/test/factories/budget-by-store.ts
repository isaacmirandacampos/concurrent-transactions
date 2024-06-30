import { BudgetId } from '@src/domain/models/budget';
import { StoreId } from '@src/domain/models/store';
import { Knex } from 'knex';
import { budgetFactory } from './budget';
import { storeFactory } from './store';

type IPartialData = {
  id?: number;
  budget_id?: BudgetId;
  store_id?: StoreId;
};

export const budgetByStoreFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [budgetByStore] = await uow('budgets_by_store')
    .insert({
      id: data?.id || -1,
      budget_id: data?.budget_id || (await budgetFactory(uow)),
      store_id: data?.store_id || (await storeFactory(uow)),
    })
    .returning('id');

  return budgetByStore.id;
};
