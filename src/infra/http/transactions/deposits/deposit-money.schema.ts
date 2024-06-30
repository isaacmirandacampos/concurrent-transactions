import * as joi from 'joi';
import { FastifySchema } from 'fastify';
import { WalletId } from '@src/application/domain/models/wallet';

export type InputParam = {
  wallet_id: WalletId;
};

export type InputBody = {
  deposit: number;
};

export const DepositMoneySchema: FastifySchema = {
  params: joi.object<InputParam>({
    wallet_id: joi.number().required(),
  }),
  body: joi.object<InputBody>({
    deposit: joi.number().required(),
  }),
};
