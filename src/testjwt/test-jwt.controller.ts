import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("testjwt")
export class TestJwtController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async testJwt() {
    return "SUCCESSSSS!";
  }
}
