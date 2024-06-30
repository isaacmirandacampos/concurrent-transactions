import { Knex } from 'knex';
import { UserId } from '@src/domain/models/user';
import { StoreId } from '@src/domain/models/store';
import { UserFavoriteStoreId } from '@src/domain/models/user-favorite-store';
import { userFactory } from './user';
import { storeFactory } from './store';

type IData = {
  id?: UserFavoriteStoreId;
  userId?: UserId;
  storeId?: StoreId;
  deleted_at?: Date;
};

export const userFavoriteStoreFactory = async (
  uow: Knex.Transaction,
  data?: IData,
) => {
  const [userFavoriteStore] = await uow('user_favorite_stores')
    .insert({
      id: data?.id || -1,
      user_id: data?.userId || (await userFactory(uow)).user_id,
      store_id: data?.storeId || (await storeFactory(uow)),
      deleted_at: data?.deleted_at,
    })
    .returning<{ id: UserFavoriteStoreId }[]>(['id']);

  return userFavoriteStore.id;
};
