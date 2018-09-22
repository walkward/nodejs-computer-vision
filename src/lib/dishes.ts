/*!
 * File summary...
 */

import classifyImg from '../utils/classifyImg';
// @ts-ignore: Cannot find module
import * as cv from '/usr/lib/node_modules/opencv4nodejs';

export const runDetectDishesExample = () => {
  const img = cv.imread('data/dishes.jpg');
  const minConfidence = 0.2;
  const predictions = classifyImg(img).filter((res: any) => res.confidence > minConfidence);
  console.log(predictions); // tslint:disable-line
};
