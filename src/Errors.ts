export class DataBaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'DataBaseError' });
  }
}

export class InvalidNickNameError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'InvalidNickNameError' });
  }
}

export class JWTError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'JWTError' });
  }
}

export class TokenRequiredError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'TokenRequiredError' });
  }
}

export class SamePasswordsError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'SamePasswordsError' });
  }
}

export class SendingEmailError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'SendingEmailError' });
  }
}

export class IncorrectPasswordOrEmailError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordOrEmailError' });
  }
}

export class IncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'IncorrectPasswordError' });
  }
}

export class AccountAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'AccountAlreadyExistError' });
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'InvalidPasswordError' });
  }
}

export class NotAllowedError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'NotAllowedError' });
  }
}

export class InvalidResetPasswordError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'InvalidResetPasswordError' });
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
