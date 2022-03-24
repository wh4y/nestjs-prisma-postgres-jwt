import { UserDto } from "./user.dto";
import { User } from "@prisma/client";
import { AuthedUserDto } from "./authed-user.dto";
import { AbstractUsersFactory } from "./factory/abstract.users-factory";
import { CreatUserDto } from "./creat-user.dto";

export class UsersDtoFactory extends AbstractUsersFactory<User, CreatUserDto | UserDto | AuthedUserDto> {

  async create<R>(user, schema): Promise<R> {
    Object.keys(user).forEach((prop) => {
      if (schema.hasOwnProperty(prop)) schema[prop] = user[prop];
    });

    return schema;
  }

  async produceUserDto(user: User): Promise<UserDto> {
    return this.create<UserDto>(user, new UserDto());
  }

  async produceAuthedUserDto(user: User, token: string): Promise<AuthedUserDto> {
    return this.create<AuthedUserDto>({ ...user, token }, new AuthedUserDto());
  }

  async produceCreateUserDto(user: User): Promise<CreatUserDto> {
    return this.create<CreatUserDto>(user, new CreatUserDto());
  }
}
