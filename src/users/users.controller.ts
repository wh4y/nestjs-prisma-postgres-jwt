import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreatUserDto } from "./dto/creat-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserExamples, GetAllExamples, GetUserByEmailExamples } from "./swagger/responses.swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get("all")
  @ApiResponse(GetAllExamples.Ok)
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  @ApiResponse(CreateUserExamples.created)
  async createUser(@Body() data: CreatUserDto) {
    return await this.usersService.createUser(data);
  }

  @Get()
  @ApiResponse(GetUserByEmailExamples.ok)
  async getUserByEmail(@Query("email") email: string) {
    return await this.usersService.findUserByEmail(email);
  }
}
