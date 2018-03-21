import { config as containerConfig } from '../src/app/container/container.config';
import { Container, interfaces } from 'inversify';

export const container = new Container();
container.load(containerConfig);

export function rebindContainer(
  rebindType:
    | string
    | symbol
    | interfaces.Newable<any>
    | interfaces.Abstract<any>,
  loadInstead: {}
) {
  container.unbind(rebindType);
  container.bind(rebindType).toConstantValue(loadInstead);
}
