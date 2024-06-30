import { Knex } from 'knex';
import { User } from '@src/domain/models/user';
import { walletFactory } from './wallet';

type IData = Partial<User> & {
  current_points?: number;
  current_vouchers_recicla_ai?: number;
};

export const userFactory = async (uow: Knex.Transaction, data?: IData) => {
  let wallet = { wallet_id: undefined };
  const [user] = await uow('users')
    .insert({
      id: data && data.id ? data.id : '8065143e-5ab0-42e4-98ac-b40b5cbfa8ea',
      name: data && data.name ? data.name : 'any_name',
      cpf: data && data.cpf ? data.cpf : 'any_cpf',
      phone_number:
        data && data.phone_number ? data.phone_number : 'any_phone_number',
      country_code:
        data && data.country_code ? data.country_code : 'any_country_code',
      calling_code:
        data && data.calling_code ? data.calling_code : 'any_calling_code',
      deleted_at: data && data.deleted_at ? data.deleted_at : null,
      email: data && data.email ? data.email : 'any_email',
      secondary_email:
        data && data.secondary_email
          ? data.secondary_email
          : 'any_secondary_email',
      secondary_phone_number:
        data && data.secondary_phone_number
          ? data.secondary_phone_number
          : 'any_secondary_phone_number',
    })
    .returning('id');
  if (
    data?.current_points !== undefined ||
    data?.current_vouchers_recicla_ai !== undefined
  )
    wallet = await walletFactory(uow, {
      user_id: user.id,
      current_points: data.current_points,
      current_vouchers_recicla_ai: data.current_vouchers_recicla_ai,
    });
  return { user_id: user.id, wallet_id: wallet.wallet_id };
};
