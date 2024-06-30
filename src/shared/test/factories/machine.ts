import { Knex } from 'knex';
import { MachineId } from '@src/domain/models/machine';
import { v4 } from 'uuid';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';

type IData = {
  id?: MachineId;
  serial?: string;
  place_id?: string;
};

export const machineFactory = async (uow: Knex.Transaction, data?: IData) => {
  const [machine] = await uow('machines')
    .insert({
      id: data?.id || generateRandomIntId(),
      serial: data && data.serial ? data.serial : 'any_name',
      place_id: data && data.place_id ? data.place_id : v4(),
    })
    .returning('*');
  return {
    machine_id: machine.id,
    machine_serial: machine.serial,
    place_id: machine.place_id,
  };
};
