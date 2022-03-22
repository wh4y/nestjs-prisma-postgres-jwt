import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
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
}
