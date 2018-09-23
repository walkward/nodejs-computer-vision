import { classNames } from './constants';
// @ts-ignore
import * as cv from '/usr/lib/node_modules/opencv4nodejs';

interface IPrediction {
  label: string;
  confidence: number;
  rect: cv.Rect;
}

export default function(
  outputBlob: cv.Mat,
  imgDimensions: { rows: number, cols: number },
): IPrediction[] {
  return Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const confidence = outputBlob.at(i, 2);
      const labelIndex = outputBlob.at(i, 1);
      const label = classNames[labelIndex];

      const bottomLeft = new cv.Point2(
        outputBlob.at(i, 3) * imgDimensions.cols,
        outputBlob.at(i, 6) * imgDimensions.rows,
      );

      const topRight = new cv.Point2(
        outputBlob.at(i, 5) * imgDimensions.cols,
        outputBlob.at(i, 4) * imgDimensions.rows,
      );

      const rect = new cv.Rect(
        bottomLeft.x,
        topRight.y,
        topRight.x - bottomLeft.x,
        bottomLeft.y - topRight.y,
      );

      return ({
        label,
        confidence,
        rect,
      });
    });
}
