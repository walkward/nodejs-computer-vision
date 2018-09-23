import * as Configs from '../src/config';
import * as Server from '../src/server';

// Create a server which will be started/stopped for each test
export const makeServer = async () => {
  const serverConfigs = Configs.getServerConfigs();
  const server = await Server.init(serverConfigs);
  return server;
};
