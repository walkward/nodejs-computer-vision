/**
 * Testing download methods
 */

import test from 'ava';
import * as fs from 'fs';

import downloadFile from '../src/lib/download';

test('images download', async (t) => {
  t.plan(2);

  const path = await downloadFile('http://picsum.photos/200/300.png');

  t.is(typeof path, 'string');
  t.true(fs.existsSync(path));

  // Deleting the file
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
});
