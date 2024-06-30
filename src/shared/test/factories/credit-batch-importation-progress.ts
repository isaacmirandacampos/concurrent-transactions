import { Knex } from 'knex';
import { CreditBatchId } from '@src/domain/models/credit-batch';
import { v4 as uuid } from 'uuid';
import { CreditBatchImportationProgressStatus } from '@src/shared/constants/credit-batch-importation-progresses';
import { creditBatchFactory } from './credit-batch';

type IPartialData = {
  id?: string;
  creditBatchId?: CreditBatchId;
  totalRows?: number;
  processedRows?: number;
  failedRows?: number;
  successfulRows?: number;
  status?: number;
  csvFileReference?: string;
  originalCsvFilename?: string;
  deletedAt?: string;
  errorCode?: string;
  errorMessage?: string;
};

export const creditBatchImportationProgressFactory = async (
  uow: Knex.Transaction,
  data?: IPartialData,
) => {
  const [creditBatch] = await uow('credit_batch_importation_progresses')
    .insert({
      id: data?.id || uuid(),
      credit_batch_id: data?.creditBatchId || (await creditBatchFactory(uow)),
      total_rows: data?.totalRows !== undefined ? data?.totalRows : 100,
      processed_rows:
        data?.processedRows !== undefined ? data?.processedRows : 100,
      failed_rows: data?.failedRows !== undefined ? data?.failedRows : 50,
      successful_rows:
        data?.successfulRows !== undefined ? data?.successfulRows : 50,
      status:
        data?.status ||
        CreditBatchImportationProgressStatus.EVERY_ROW_WAS_PROCESSED_BUT_THERE_ARE_ISSUES,
      csv_file_reference: data?.csvFileReference || `${uuid()}.csv`,
      original_csv_filename: data?.originalCsvFilename || 'file.csv',
      deleted_at: data?.deletedAt,
      error_code: data?.errorCode,
      error_message: data?.errorMessage,
    })
    .returning('id');

  return creditBatch.id;
};
