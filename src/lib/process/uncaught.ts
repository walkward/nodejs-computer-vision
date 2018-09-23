/**
 * Uncaught Errors
 * ------------------
 * Uncaught errors are forwarded to our error handling.
 *
 */

import { AppError, handleError } from '../../utils/errors';

process.on('unhandledRejection', (err: AppError) => {
  throw err;
});

process.on('uncaughtException', (err: AppError) => {
  handleError(err);
  if (err.isOperational !== true) { process.exit(1); }
});
