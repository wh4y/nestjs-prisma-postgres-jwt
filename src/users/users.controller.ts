import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreatUserDto } from "./dto/creat-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('all')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() data: CreatUserDto) {
    return await this.usersService.createUser(data);
  }

  @Get()
  async getUserByEmail(@Query("email") email: string) {
    return await this.usersService.findUserByEmail(email);
  }
}
