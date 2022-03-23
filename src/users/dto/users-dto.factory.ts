import { UserDto } from "./user.dto";
import { User } from "@prisma/client";
import { AuthedUserDto } from "./authed-user.dto";
import { AbstractFactory } from "../../shared/factory/abstract.factory";
import { CreatUserDto } from "./creat-user.dto";

export class UsersDtoFactory extends AbstractFactory<User, CreatUserDto | UserDto | AuthedUserDto> {

  create(user, schema) {
    Object.keys(user).forEach((prop) => {
      if (schema.hasOwnProperty(prop)) schema[prop] = user[prop];
    });

    return schema;
  }

  produceUserDto(user: User) {
    return this.create(user, new UserDto());
  }

  produceAuthedUserDto(user: User, token: string) {
    return this.create({ ...user, token }, new AuthedUserDto());
  }

  produceCreateUserDto(user: User) {
    return this.create(user, new CreatUserDto());
  }
}
