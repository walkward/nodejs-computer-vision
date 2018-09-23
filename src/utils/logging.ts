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

const level = () => {
  if (process.env.NODE_ENV === 'production') return 'info';
  if (process.env.NODE_ENV === 'test') return 'error';
  return 'debug';
};

const logger: winston.Logger = winston.createLogger({
  level: level(),
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});

export default logger;
