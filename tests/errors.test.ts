/**
 * Tests for any error related methods classes
 */

import test from 'ava';
import { AppError, handleError } from '../src/utils/errors';

test('Central error handler should log message', (t) => {
  const error = new AppError('Sample Error', false);
  const handled = handleError(error);
  t.is(handled.constructor.name, 'DerivedLogger');
});

test('Custom error object property tests', (t) => {
  const message = 'Sample Error';
  const err = new AppError(message, true);
  t.is(err.isOperational, true);
  t.is(err.message, message);
});
