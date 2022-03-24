import { HttpException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { DatabaseService } from "../shared/database/database.service";
import { CreatUserDto } from "./dto/creat-user.dto";

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

  async findUserByEmail({ email }: CreatUserDto): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (e) {
      throw new HttpException(e, 404);
    }
  }
}
