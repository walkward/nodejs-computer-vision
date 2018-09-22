/**
 * App entrypoint
 */

import './lib/uncaught';
import * as dotenv from 'dotenv'; // tslint:disable-line
import * as Configs from './config';
import * as Server from './server';

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`); // tslint:disable-line

// Loading environment variables
dotenv.config();

// Loading environment variables
dotenv.config();

// Define async start function
const start = async ({ config }: any) => {
  try {
    const server = await Server.init(config);
    await server.start();
    console.log('Server running at:', server.info.uri); // tslint:disable-line
  } catch (err) {
    console.error('Error starting server: ', err.message); // tslint:disable-line
    throw err;
  }
};

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Start the server
start({ config: serverConfigs });
