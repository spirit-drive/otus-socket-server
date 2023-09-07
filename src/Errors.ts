enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_USER_NOT_REGISTER = 'ERR_USER_NOT_REGISTER',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_INVALID_EMAIL = 'ERR_INVALID_EMAIL',
  ERR_TOKEN_REQUIRED_ERROR = 'ERR_TOKEN_REQUIRED_ERROR',
  ERR_JWT_ERROR = 'ERR_JWT_ERROR',
  ERR_DATA_BASE_ERROR = 'ERR_DATA_BASE_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  ERR_INVALID_NICKNAME = 'ERR_INVALID_NICKNAME',
}

export class DataBaseError {
  code: string;
  name: string;
  message: string;
  constructor(error: Error) {
    this.code = ErrorCode.ERR_DATA_BASE_ERROR;
    this.message = error.message;
    Object.defineProperty(this, 'name', { value: 'DataBaseError' });
  }
}

export class InvalidNickNameError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_INVALID_NICKNAME;

    Object.defineProperty(this, 'name', { value: 'InvalidNickNameError' });
  }
}

export class JWTError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_JWT_ERROR;

    Object.defineProperty(this, 'name', { value: 'JWTError' });
  }
}

export class TokenRequiredError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_TOKEN_REQUIRED_ERROR;
    Object.defineProperty(this, 'name', { value: 'TokenRequiredError' });
  }
}

export class IncorrectPasswordOrEmailError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordOrEmailError' });
  }
}

export class IncorrectPasswordError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_INCORRECT_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordError' });
  }
}

export class AccountAlreadyExistError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_ACCOUNT_ALREADY_EXIST;

    Object.defineProperty(this, 'name', { value: 'AccountAlreadyExistError' });
  }
}

export class InvalidPasswordError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_INVALID_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'InvalidPasswordError' });
  }
}

export class UserNotFoundError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_USER_NOT_REGISTER;
    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class NotFoundError {
  code: string;

  name: string;
  constructor(public message: string) {
    this.code = ErrorCode.ERR_NOT_FOUND;

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
