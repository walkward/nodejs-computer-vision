import * as Hapi from 'hapi';
import { IServerConfigurations } from './config';
import { IPlugin } from './plugins/interfaces';

export async function init(
  configs: IServerConfigurations,
): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: process.env.PORT,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix;
    }

    //  Setup Hapi Plugins
    const plugins: string[] = configs.plugins;
    const pluginOptions = {
      serverConfigs: configs,
    };

    const pluginPromises: Array<Promise<any>> = [];

    plugins.forEach((pluginName: string) => {
      const plugin: IPlugin = require('./plugins/' + pluginName).default();
      console.log(
        `Register Plugin ${plugin.info().name} v${plugin.info().version}`,
      );
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    await Promise.all(pluginPromises);

    console.log('All plugins registered successfully.');

    console.log('Register Routes');
    // Logs.init(server, configs, database);
    console.log('Routes registered sucessfully.');

    return server;
  } catch (err) {
    console.log('Error starting server: ', err);
    throw err;
  }
}
