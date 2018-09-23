/**
 * Central error handling
 */

import logging from './logging';

export class AppError extends Error {
  public isOperational: boolean;
  public name: string;
  public stack: string;

  constructor(message: string, isOperational: boolean) {
    super(message);
    this.isOperational = isOperational || false;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
  }
}

// const trusted = (err: AppError): boolean => err.isOperational;

export const handleError = (err: AppError): object => {
  return logging.error(err.stack);
};
