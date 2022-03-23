import { UserDto } from "./user.dto";
import { User } from "@prisma/client";
import { AuthedUserDto } from "./authed-user.dto";
import { AbstractFactory } from "../../shared/factory/abstract.factory";
import { CreatUserDto } from "./creat-user.dto";

export class UsersDtoFactory extends AbstractFactory<User, CreatUserDto | UserDto | AuthedUserDto> {

  async create<R>(user, schema): Promise<R> {
    Object.keys(user).forEach((prop) => {
      if (schema.hasOwnProperty(prop)) schema[prop] = user[prop];
    });

    return schema;
  }

  async produceUserDto(user: User): Promise<UserDto> {
    return this.create(user, new UserDto());
  }

  async produceAuthedUserDto(user: User, token: string): Promise<AuthedUserDto> {
    return this.create({ ...user, token }, new AuthedUserDto());
  }

  async produceCreateUserDto(user: User): Promise<CreatUserDto> {
    return this.create(user, new CreatUserDto());
  }
}
