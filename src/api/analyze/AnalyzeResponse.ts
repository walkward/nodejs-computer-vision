import { AnalyzeRequest, IInput } from './AnalyzeRequest';

export interface IOutput {
  label: string;
  confidence: number;
  rect: {
    height: number;
    width: number;
    y: number;
    x: number;
  };
}

export class AnalyzeResponse extends AnalyzeRequest {
  public outputs: IOutput[];

  constructor(input: IInput, outputs: IOutput[]) {
    super(input);
    this.outputs = outputs;
  }
}
