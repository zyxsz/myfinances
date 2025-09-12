export class BaseError extends Error {
  private _code?: string;
  private _message: string;

  constructor(message: string, code?: string) {
    super(message);

    this._code = code;
    this._message = message;
  }

  public get code() {
    return this._code;
  }

  public get message() {
    return this._message;
  }
}
