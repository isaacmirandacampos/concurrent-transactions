import { Knex } from 'knex';
import { CreditBatchImportationProgressId } from '@src/domain/models/credit-batch-importation-progress';
import { CreditBatchImportationProgressFailedRowStatus } from '@src/shared/constants/credit-batch-importation-progress-failed-rows';
import { CreditBatchImportationProgressFailedRowId } from '@src/domain/models/credit-batch-importation-progress-failed-row';
import { creditBatchImportationProgressFactory } from './credit-batch-importation-progress';

type IPartialData = {
  id?: number;
  creditBatchImportationProgressId?: CreditBatchImportationProgressId;
  errorCode?: string;
  errorMessage?: string;
  rowData?: Record<string, any>;
  status?: CreditBatchImportationProgressFailedRowStatus;
};

export const creditBatchImportationProgressFailedRowFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
): Promise<CreditBatchImportationProgressFailedRowId> => {
  const [creditBatch] = await uow(
    'credit_batch_importation_progress_failed_rows',
  )
    .insert({
      id: data?.id || -1,
      credit_batch_importation_progress_id:
        data?.creditBatchImportationProgressId ||
        (await creditBatchImportationProgressFactory(uow)),
      status:
        data?.status || CreditBatchImportationProgressFailedRowStatus.PROCESSED,
      error_code: data?.errorCode || 'error_code',
      error_message: data?.errorMessage || 'error_message',
      row_data: data?.rowData || { any_property: 'any_value' },
    })
    .returning('id');

  return creditBatch.id;
};
