import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatUserDto } from "../users/dto/creat-user.dto";
import { JwtHelperService } from "./jwt-helper/jwt-helper.service";
import { TokensResponseObject } from "./interfaces";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService
  ) {
  }

  @Post("/login")
  async login(@Body() dto: CreatUserDto) {
    return await this.authService.login(dto);
  }

  @Post("/register")
  async register(@Body() dto: CreatUserDto) {
    return await this.authService.register(dto);
  }

  @Post("/refresh")
  async refreshAccessToken(@Body() tokensObject: TokensResponseObject) {
    return this.jwtHelper.refreshAccessToken(tokensObject);
  }
}
