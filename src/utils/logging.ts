/**
 * Logging methods with stackdriver support
 *
 * Logging overview:
 * - error: Logging for crashing errors
 * - warn: Logging for non-crashing errors
 * - info: Process information & status updates
 * - verbose: Detailed logging about specific processes
 * - debug: Typically used for temporary logging which won't be enabled in normal production
 */

import * as winston from 'winston';

const logger: winston.Logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default logger;
