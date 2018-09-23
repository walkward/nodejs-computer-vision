/**
 * Testing analyze endpoints
 */

import test from 'ava';
import * as request from 'supertest';

import { IOutput } from '../src/api/analyze/AnalyzeResponse';
import { makeServer } from './utils';

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('analyze labels', async (t) => {
  t.plan(2);

  const res = await request(t.context.server.listener)
    .post('/analyze/labels')
    .send({
      input: {
        mediaType: 'image',
        source: {
          url: 'https://picsum.photos/400/300.png?image=1062',
        },
      },
    });

  t.is(res.status, 201);

  // The given image should be labeled as a dog
  t.true(res.body.outputs.some((output: IOutput) => output.label === 'dog'));
});
