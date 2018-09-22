/**
 * Central error handling
 */

import AppError from '../models/AppError';
import logging from './logging';

// const trusted = (err: AppError): boolean => err.isOperational;

export const handleError = (err: AppError): object => {
  return logging.error(err);
};
