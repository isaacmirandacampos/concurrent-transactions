import { StoreId } from '@src/domain/models/store';
import { CreditConfig } from '@src/domain/models/credit-config';
import { Knex } from 'knex';
import {
  CreditOrigin,
  CreditStatus,
  CreditType,
} from '@src/shared/constants/credits';
import { CreditBatchId } from '@src/domain/models/credit-batch';
import { CreditId } from '@src/domain/models/credit';
import { generateRandomIntId } from '@src/shared/utils/ids/generate-random-int-id';

type IData = {
  id?: CreditId;
  code?: string;
  used_at?: Date;
  value?: number;
  machine_serial?: string;
  redeemed_in_store_id?: StoreId;
  credit_config_id?: CreditConfig;
  deleted_at?: Date;
  type?: CreditType;
  status?: CreditStatus;
  credit_batch_id?: CreditBatchId;
  origin?: CreditOrigin;
  needsToBeRedeemedInAppFirst?: boolean;
  validFrom?: Date;
  redeemedAt?: Date;
  validityInMinutesToUse?: number;
  validityInMinutesToUseAfterRedeem?: number;
};

export const creditFactory = async (uow: Knex.Transaction, data?: IData) => {
  const [creditConfig] = await uow('credits')
    .insert({
      id: data && data.id ? data.id : generateRandomIntId(),
      code: data && data.code ? data.code : generateRandomIntId(),
      used_at: data && data.used_at ? data.used_at : null,
      value: data && data.value ? data.value : 20,
      machine_serial: data?.machine_serial,
      redeemed_in_store_id: data?.redeemed_in_store_id,
      credit_config_id: data?.credit_config_id,
      deleted_at: data && data.deleted_at ? data.deleted_at : null,
      type: data?.type || CreditType.CASH_IN_CENTS,
      status: data?.status || CreditStatus.PRINTED_BY_FIRMWARE,
      credit_batch_id: data?.credit_batch_id,
      origin: data?.origin || CreditOrigin.AUTO_GENERATED_FOR_FIRMWARE_PRINTING,
      needs_to_be_redeemed_in_app_first:
        data?.needsToBeRedeemedInAppFirst || false,
      valid_from: data?.validFrom || new Date(),
      redeemed_at: data?.redeemedAt,
      validity_in_minutes_to_redeem: data?.validityInMinutesToUse,
      validity_in_minutes_to_use_after_redeem:
        data?.validityInMinutesToUseAfterRedeem,
    })
    .returning(['id', 'code']);

  return { id: creditConfig.id, code: creditConfig.code };
};
