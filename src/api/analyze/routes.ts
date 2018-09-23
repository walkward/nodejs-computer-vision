import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../config';
import AnalyzeController from './analyze-controller';
import * as AnalyzeValidator from './analyze-validator';

export default function(
  server: Hapi.Server,
  configs: IServerConfigurations,
) {
  const analyzeController = new AnalyzeController();
  server.bind(analyzeController);

  server.route({
    method: 'POST',
    path: '/analyze/labels',
    options: {
      handler: analyzeController.analyzeLabels,
      tags: ['api', 'analyze'],
      description: 'Analyze the labels for the given asset',
      validate: {
        payload: AnalyzeValidator.analyzeInput,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'Successfully analyzed assets',
            },
            404: {
              description: 'Unable to analyze assets',
            },
          },
        },
      },
    },
  });
}
