import * as Joi from 'joi';

export const analyzeInput = Joi.object().keys({
  input: {
    mediaType: Joi.string()
      .valid('image')
      .required()
      .description('mediaType to be analyzed')
      .notes(['this is special', 'this is important']),
    source: {
      url: Joi.string()
      .uri()
      .required()
      .description('image URL to be analyzed')
      .notes([
        'Supported image formats: JPEG, PNG, GIF, BMP.',
        'Image file size must be less than 4MB.',
        'Image dimensions must be at least 50 x 50.',
      ]),
    },
  },
});
