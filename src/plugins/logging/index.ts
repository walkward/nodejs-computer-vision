import * as Hapi from 'hapi';
import goodWinston from 'hapi-good-winston';
import { IPlugin } from '../../types/plugins';
import logging from '../../utils/logging';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([{
      plugin: require('good'),
      options: {
        reporters: {
          winston: [goodWinston(logging)],
        },
      },
    }]);
  } catch (err) {
    logging.error(`Error registering logging plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Good Logger', version: '1.0.0' };
    },
  };
};
