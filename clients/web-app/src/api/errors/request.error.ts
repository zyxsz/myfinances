import { BaseError } from "./base-error";

export class RequestError extends BaseError {
  constructor(public message: string) {
    super(message);
  }
}
