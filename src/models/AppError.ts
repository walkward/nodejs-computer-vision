/**
 * Custom error object for app specific errors
 */

export default class AppError extends Error {
  public isOperational: boolean;
  public name: string;

  constructor(message: string, isOperational: boolean) {
    super(message);
    this.isOperational = isOperational || false;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
  }
}
