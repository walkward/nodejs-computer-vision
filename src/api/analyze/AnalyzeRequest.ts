enum MediaType {
  'image',
}

export interface IInput {
  mediaType: MediaType;
  source: {
    url: string;
  };
}

export class AnalyzeRequest {
  public input: IInput;

  constructor(input: IInput) {
    this.input = input;
  }
}
