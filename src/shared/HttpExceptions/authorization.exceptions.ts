import { BadRequestException } from "@nestjs/common";

export class InvalidTokenException extends BadRequestException {
  constructor() {
    super("Invalid token!");
  }
}


export enum AuthorizationTypes {
  user = "user"
}

export class AuthorizationFailedException extends BadRequestException {
  constructor(authorizationType: AuthorizationTypes) {
    let message: string;

    switch (authorizationType) {
      case AuthorizationTypes.user:
        message = "Email or password aren't correct!";
        break;
      default:
        message = "Authorization failed!";
    }

    super(message);
  }
}


