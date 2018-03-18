import { ApiContext } from '../container/api-context';
import { TYPES } from './../container/constants';
import container from '../container/container.config';

export class GraphqlContext {
  public user: any;
  public api: ApiContext;
  constructor(user: any) {
    this.user = user;
    this.api = container.get<ApiContext>(TYPES.ApiContext);
  }
}
