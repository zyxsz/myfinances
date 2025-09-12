import { BaseError } from './base.error';

export interface ValidationIssue {
  field: string;
  message: string;
}

export class ValidationError extends BaseError {
  private _issues: ValidationIssue[];

  constructor(message: string, issues: ValidationIssue[], code?: string) {
    super(message, code);

    this._issues = issues;
  }

  public get issues() {
    return this._issues;
  }
}
