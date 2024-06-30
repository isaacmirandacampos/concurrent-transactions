import { BudgetType } from '@src/shared/constants/budgets';
import { Knex } from 'knex';

type IPartialData = {
  id?: number;
  initial_value_in_cents?: number;
  remaining_value_in_cents?: number;
  valid_from?: Date;
  valid_until?: Date;
  is_active?: boolean;
  type?: BudgetType;
  deleted_at?: string;
};

export const budgetFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [budget] = await uow('budgets')
    .insert({
      id: data?.id || -1,
      initial_value_in_cents: data?.initial_value_in_cents || 100,
      remaining_value_in_cents: data?.remaining_value_in_cents || 100,
      valid_from: data?.valid_from || new Date(),
      valid_until: data?.valid_until || new Date(),
      is_active: data?.is_active === true || true,
      type: data?.type || BudgetType.BY_STORE,
      deleted_at: data?.deleted_at,
    })
    .returning('id');

  return budget.id;
};
