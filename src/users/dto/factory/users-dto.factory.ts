import { UserDto } from "../user.dto";
import { User } from "@prisma/client";
import { AuthedUserDto } from "../authed-user.dto";
import { AbstractUsersFactory } from "./abstract.users-factory";
import { CreatUserDto } from "../creat-user.dto";
import { TokensResponseObject } from "../../../auth/interfaces";
import { AuthedUserSchema, CreateUserSchema, UserSchema } from "./schemas";


export class UsersDtoFactory extends AbstractUsersFactory<User, CreatUserDto | UserDto | AuthedUserDto> {

  async create<R>(user, schema): Promise<R> {
    Object.keys(user).forEach((prop) => {
      if (schema.hasOwnProperty(prop)) schema[prop] = user[prop];
    });

    return schema;
  }

  async produceUserDto(user: User): Promise<UserSchema> {
    return this.create<UserSchema>(user, new UserSchema());
  }

  async produceAuthedUserDto(user: User, tokens: TokensResponseObject): Promise<AuthedUserSchema> {
    return this.create<AuthedUserSchema>({ ...user, tokens }, new AuthedUserSchema());
  }

  async produceCreateUserDto(user: User): Promise<CreateUserSchema> {
    return this.create<CreateUserSchema>(user, new CreateUserSchema());
  }
}
