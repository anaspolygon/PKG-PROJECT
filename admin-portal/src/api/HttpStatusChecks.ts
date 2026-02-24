

export enum HttpStatus {
  Unauthorized = 401,
}

export class HttpError extends Error {
  public readonly code: HttpStatus;

  constructor(code: HttpStatus, msg: string) {
    super(msg);
    this.code = code;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor(msg: string) {
    super(HttpStatus.Unauthorized, msg);

    Object.setPrototypeOf(this, HttpUnauthorizedError.prototype);
  }
}

export function isUnauthorized(status: number) {
  return status === HttpStatus.Unauthorized;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildHttpError(status: HttpStatus , data: any) {
  const msg =
    "message" in data
      ? data["message"]
      : "error" in data
      ? data["error"]
      : "otp_response" in data
      ? data.otp_response.message
      : "Failed to fetch data";

  return new HttpError(status, msg);
}
