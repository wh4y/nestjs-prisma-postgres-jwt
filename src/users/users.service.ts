import { HttpException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DatabaseService } from "../shared/database/database.service";
import { CreatUserDto } from "./dto/creat-user.dto";
import { AuthedUserDto } from "./dto/authed-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }

  async createUser(data: CreatUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.findOne({ email });
  }

  async findOne<T>(props: T) {
    try {
      return await this.prisma.user.findUnique({ where: props });
    } catch (e) {
      throw new HttpException(e, 404);
    }
  }

  async updateUser<T>(email: string, data: T) {
    return this.prisma.user.update({ where: { email }, data });
  }
}
