import { injectable } from 'inversify';
import knex from 'knex';
import knexHandle from '../../database';

@injectable()
export class KnexGateway {
  private trx?: knex.Transaction;

  public getBuilder(arg: any): knex.QueryBuilder {
    return this.trx ? this.trx(arg) : knexHandle(arg);
  }

  public async startTransaction() {
    this.trx = await knexHandle.transaction();
  }
}
