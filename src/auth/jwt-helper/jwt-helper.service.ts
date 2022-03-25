import { BadRequestException, HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { TokensResponseObject } from "../interfaces";
import { JWT_OPTIONS } from "./constants";
import { JwtOptions } from "./interfaces";
import * as bcrypt from "bcrypt";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtHelperService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(JWT_OPTIONS)
    private readonly jwtOptions: JwtOptions
  ) {
  }

  async hashToken(token: string): Promise<string> {
    return await bcrypt.hash(token, 10);
  }

  async compareTokens(token: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(token, hash);
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

  async refreshAccessToken(tokensObject: TokensResponseObject) {
    try {
      const userFromRefreshToken = await this.jwtService.verifyAsync(tokensObject.refreshToken,
        { secret: this.jwtOptions.verification.refreshSecret });

      const user = await this.usersService.findOne({ email: userFromRefreshToken.email });
      const hashedRT = user.hashedRT;

      const isTokenMatches = this.compareTokens(tokensObject.refreshToken, hashedRT);
      if (!isTokenMatches) throw new BadRequestException("Invalid token!");

      tokensObject.accessToken = await this.generateAccessToken(user);

      return tokensObject;
    } catch (e) {
      return new HttpException(e.message, 400);
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
