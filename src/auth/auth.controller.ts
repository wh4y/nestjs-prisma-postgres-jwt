import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("/login")
  async login(@Body() dto: Prisma.UserCreateInput) {
    return await this.authService.login(dto);
  }

  @Post("/register")
  async register(@Body() dto: Prisma.UserCreateInput) {
    return await this.authService.register(dto);
  }
}
