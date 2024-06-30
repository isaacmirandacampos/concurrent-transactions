import { RecycledItemId } from '@src/domain/models/recycled-item';
import { UserId } from '@src/domain/models/user';
import { Knex } from 'knex';
import { machineFactory } from './machine';

type IData = {
  id?: string;
  name?: string;
  recycled_item_id?: RecycledItemId;
  user_id?: UserId;
  payload: any;
  deleted_at?: string;
  machine_serial: string;
  s3_keys?: string;
  timestamp?: string;
};

export const eventFactory = async (uow: Knex.Transaction, data?: IData) => {
  const [event] = await uow('events')
    .insert({
      id: data && data.id ? data.id : Math.round(Math.random() * 10000),
      user_id: data && data.user_id,
      name: (data && data.name) || 'any_name',
      machine_serial:
        data && data.machine_serial
          ? data.machine_serial
          : (await machineFactory(uow)).machine_serial,
      s3_keys: data && data.s3_keys,
      recycled_item_id: data && data.recycled_item_id,
      deleted_at: data && data.deleted_at ? data.deleted_at : null,
      timestamp:
        data && data.timestamp ? data.timestamp : new Date().toISOString(),
    })
    .returning(['id']);
  return { event_id: event.id };
};
