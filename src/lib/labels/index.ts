import * as fs from 'fs';
// @ts-ignore
import * as cv from '/usr/lib/node_modules/opencv4nodejs';

import { AppError } from '../../utils/errors';
import logging from '../../utils/logging';
import download from '../download';
import { settings } from './constants';
import extractResults from './extractResults';

if (!fs.existsSync(settings.prototxt) || !fs.existsSync(settings.modelFile)) {
  // 'download the model from: https://drive.google.com/file/d/0BzKzrI_SkD1_dUY1Ml9GRTFpUWc/view'
  logging.error(new AppError('exiting: could not find ssdcoco model', false));
}

// initialize ssdcoco model from prototxt and modelFile
const net = cv.readNetFromCaffe(settings.prototxt, settings.modelFile);

export default async (url: string) => {
  const imgPath: string = await download(url);
  const img: cv.Mat = cv.imread(imgPath);

  // ssdcoco model works with 300 x 300 images
  const imgResized = img.resize(300, 300);

  // network accepts blobs as input
  const inputBlob = cv.blobFromImage(imgResized);
  net.setInput(inputBlob);

  // forward pass input through entire network, will return classification result as 1x1xNxM Mat
  let outputBlob = net.forward();
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3]); // extract NxM Mat

  return extractResults(outputBlob, img)
    .filter((res) => res.confidence > 0.2);
};
