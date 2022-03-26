import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiOkResponse, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { testJwtExamples } from "./swagger/responses.swagger";

@ApiTags("JWT testing")
@Controller("testjwt")
export class TestJwtController {
  @ApiOkResponse(testJwtExamples.Ok)
  @ApiResponse(testJwtExamples.Forbidden)
  @UseGuards(JwtAuthGuard)
  @ApiSecurity("JWT")
  @Get()
  async testJwt() {
    return "SUCCESSSSS!";
  }
}
