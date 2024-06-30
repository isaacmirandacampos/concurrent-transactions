import { Knex } from 'knex';
import {
  RecyclingFlow,
  RecyclingFlowId,
} from '@src/domain/models/recycling-flow';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';
import { userFactory } from './user';
import { machineFactory } from './machine';

export const recyclingFlowFactory = async (
  uow: Knex.Transaction,
  data?: Partial<RecyclingFlow>,
) => {
  const [recycling_flow] = await uow
    .from<RecyclingFlow>('recycling_flows')
    .insert({
      id: data?.id || generateRandomIntId(),
      user_id:
        data && data.user_id ? data.user_id : (await userFactory(uow)).user_id,
      machine_id:
        data && data.machine_id
          ? data.machine_id
          : (await machineFactory(uow)).machine_id,
      flow_date:
        data && data.flow_date ? data.flow_date : new Date().toISOString(),
    })
    .returning(['id', 'created_at', 'user_id', 'machine_id']);

  return {
    recycling_flow_id: recycling_flow.id as RecyclingFlowId,
    created_at: recycling_flow.created_at as Date,
    user_id: recycling_flow.user_id,
    machine_id: recycling_flow.machine_id,
  };
};
