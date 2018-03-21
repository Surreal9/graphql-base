import { injectable } from 'inversify';
import knex from 'knex';
import knexHandle from '../../database';

function createTransaction(trx?: knex.Transaction): Promise<knex.Transaction> {
  return new Promise(resolve => {
    return (trx ? trx : knexHandle).transaction(resolve).catch(() => ({}));
  });
}

@injectable()
export class KnexGateway {
  protected trx?: knex.Transaction;

  public getBuilder(arg: any): knex.QueryBuilder {
    return this.trx ? this.trx(arg) : knexHandle(arg);
  }

  public async startTransaction() {
    const trx = await createTransaction(this.trx);
    this.trx = trx;
    return trx;
  }

  public setTransaction(trx: knex.Transaction) {
    this.trx = trx;
  }

  public commitTransaction() {
    if (this.trx) {
      this.trx.commit();
    }
  }

  public rollbackTransaction() {
    if (this.trx) {
      this.trx.rollback();
    }
  }
}
