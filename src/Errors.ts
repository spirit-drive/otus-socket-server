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
  data: string;
  name: string;
  message: string;
  constructor(error: Error) {
    this.data = ErrorCode.ERR_DATA_BASE_ERROR;
    this.message = error.message;
    Object.defineProperty(this, 'name', { value: 'DataBaseError' });
  }
}

export class InvalidNickNameError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_INVALID_NICKNAME;

    Object.defineProperty(this, 'name', { value: 'InvalidNickNameError' });
  }
}

export class JWTError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_JWT_ERROR;

    Object.defineProperty(this, 'name', { value: 'JWTError' });
  }
}

export class TokenRequiredError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_TOKEN_REQUIRED_ERROR;
    Object.defineProperty(this, 'name', { value: 'TokenRequiredError' });
  }
}

export class IncorrectPasswordOrEmailError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordOrEmailError' });
  }
}

export class IncorrectPasswordError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_INCORRECT_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordError' });
  }
}

export class AccountAlreadyExistError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_ACCOUNT_ALREADY_EXIST;

    Object.defineProperty(this, 'name', { value: 'AccountAlreadyExistError' });
  }
}

export class InvalidPasswordError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_INVALID_PASSWORD;
    Object.defineProperty(this, 'name', { value: 'InvalidPasswordError' });
  }
}

export class UserNotFoundError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_USER_NOT_REGISTER;
    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class NotFoundError {
  data: string;

  name: string;
  constructor(public message: string) {
    this.data = ErrorCode.ERR_NOT_FOUND;

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
