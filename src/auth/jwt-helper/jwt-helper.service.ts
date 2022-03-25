import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { TokensResponseObject } from "../interfaces";
import { JWT_OPTIONS } from "./constants";
import { JwtOptions } from "./interfaces";
import { UsersService } from "../../users/users.service";
import { InvalidTokenException } from "../../shared/HttpExceptions";

@Injectable()
export class JwtHelperService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(JWT_OPTIONS)
    private readonly jwtOptions: JwtOptions
  ) {
  }

  private async generateToken<T extends Object>(data: T, options?: JwtSignOptions): Promise<string> {
    return await this.jwtService.signAsync(data, options);
  }

  async generateAccessToken({ email, id, createdAt }: User): Promise<string> {
    return await this.generateToken({ email, id, createdAt }, this.jwtOptions.sign.accessToken);
  }

  async generateRefreshToken({ email, id, createdAt }: User): Promise<string> {
    return await this.generateToken({ email, id, createdAt }, this.jwtOptions.sign.refreshToken);
  }

  async refreshAccessToken(tokensObject: TokensResponseObject): Promise<TokensResponseObject | HttpException> {
    try {
      const userFromRefreshToken = await this.jwtService.verifyAsync(tokensObject.refreshToken,
        { secret: this.jwtOptions.verification.refreshSecret });

      try {
        await this.jwtService.verifyAsync(tokensObject.accessToken,
          { secret: this.jwtOptions.verification.accessSecret });
      } catch (e) {
        tokensObject.accessToken = await this.generateAccessToken(userFromRefreshToken);
      }

      return tokensObject;
    } catch (e) {
      return new InvalidTokenException();
    }
  }

  async mapTokensArrayIntoObject(tokensArray: string[]) {
    return tokensArray.reduce
      < TokensResponseObject >
      (
        (tokensObject, token, index) => {
          if (index === 0) tokensObject.accessToken = token;
          else tokensObject.refreshToken = token;

          return tokensObject;
        },
          {
            accessToken: null,
            refreshToken: null
          }
      );
  }
}
