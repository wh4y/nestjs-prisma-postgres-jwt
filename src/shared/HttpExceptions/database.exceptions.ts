import { ConflictException } from "@nestjs/common";

export class AlreadyExistsException extends ConflictException {
  constructor(existingInstanceName: string) {
    const instance = existingInstanceName
      .split("")
      .map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
      .join("");

    super(`${instance} already exists!`);
  }
}
