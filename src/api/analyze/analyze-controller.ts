import * as Boom from 'boom';
import * as Hapi from 'hapi';
import labels from '../../lib/labels';
import { IRequest } from '../../types';
import { AnalyzeRequest } from './AnalyzeRequest';
import { AnalyzeResponse } from './AnalyzeResponse';

export default class AnalyzeController {
  public async analyzeLabels(request: IRequest, h: Hapi.ResponseToolkit) {
    const analyzeRequest: AnalyzeRequest = request.payload as AnalyzeRequest;

    try {
      const outputs = await labels(analyzeRequest.input.source.url);
      const analyzeResponse: AnalyzeResponse = new AnalyzeResponse(analyzeRequest.input, outputs);
      return h.response(analyzeResponse).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }
}
