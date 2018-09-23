import * as Chance from 'chance';
import * as download from 'download';
import * as path from 'path';

import { AppError } from '../../utils/errors';

const chance = new Chance(Date.now());

export default async (url: string) => {
  const guid = chance.guid();
  const filePath = path.resolve('data/temp');
  const filename = `${guid}`;

  return download(url, filePath, { filename })
    .then(() => path.join(filePath, filename))
    .catch((err) => { throw new AppError(err.message, false); });
};
