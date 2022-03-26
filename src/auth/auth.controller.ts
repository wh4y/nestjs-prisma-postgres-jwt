import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatUserDto } from "../users/dto/creat-user.dto";
import { JwtHelperService } from "./jwt-helper/jwt-helper.service";
import { TokensResponseObject } from "./interfaces";
import { Response } from "express";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { loginExamples, refreshAccessTokenExamples } from "./swagger/responses.swagger";
import { TokensDto } from "./dto/tokens.dto";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService
  ) {
  }

  @ApiResponse(loginExamples.ok)
  @Post("/login")
  async login(@Body() dto: CreatUserDto) {
    return await this.authService.login(dto);
  }

  @ApiResponse(loginExamples.ok)
  @Post("/register")
  async register(@Body() dto: CreatUserDto, @Res() res: Response) {
    const user = await this.authService.register(dto);
    res.status(HttpStatus.CREATED).json(user);
  }

  @ApiResponse(refreshAccessTokenExamples.ok)
  @Post("/refresh")
  async refreshAccessToken(@Body() tokensObject: TokensDto) {
    return this.jwtHelper.refreshAccessToken(tokensObject);
  }
}
