import { FastifyRequest } from 'fastify';

export interface GenericFastifyRequest<TParams, TBody, TQuery>
  extends FastifyRequest {
  params: TParams;
  body: TBody;
  query: TQuery;
}
