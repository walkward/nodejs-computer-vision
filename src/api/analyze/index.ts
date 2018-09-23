import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../config';
import Routes from './routes';

export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
) {
  Routes(server, configs);
}
