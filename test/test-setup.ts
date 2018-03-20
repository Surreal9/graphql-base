import 'jest';
import { config as containerConfig } from '../src/app/container/container.config';
import { Container } from 'inversify';
import { TYPES } from '../src/app/container/constants';

export function getContainer() {
  const container = new Container();
  container.load(containerConfig);
  container.unbind(TYPES.KnexGateway);
  return container;
}
