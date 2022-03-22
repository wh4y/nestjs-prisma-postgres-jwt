import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    return await this.usersService.createUser(data);
  }
}
