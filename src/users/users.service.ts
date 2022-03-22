import { HttpException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: DatabaseService) {
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }

  async createUser(data: any): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findUserByEmail({ email }: Prisma.UserCreateInput): Promise<User | undefined> {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (e) {
      throw new HttpException(e, 404);
    }
  }
}
