import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { UsersDtoFactory } from "../users/dto/factory/users-dto.factory";
import { CreatUserDto } from "../users/dto/creat-user.dto";
import { AuthedUserDto } from "../users/dto/authed-user.dto";
import { USERS_DTO_FACTORY } from "../users/constants";
import { JwtHelperService } from "./jwt-helper/jwt-helper.service";
import { AlreadyExistsException, AuthorizationFailedException } from "../shared/HttpExceptions";
import { AuthorizationTypes } from "../shared/HttpExceptions/authorization.exceptions";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtHelper: JwtHelperService,
    @Inject(USERS_DTO_FACTORY)
    private readonly usersDtoFactory: UsersDtoFactory
  ) {
  }

  private static async validatePassword(password: string, passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordToCompare);
  }

  async login(dto: CreatUserDto): Promise<AuthedUserDto> {

    let existingUser = await this.usersService.findUserByEmail(dto.email);
    if (!existingUser) throw new AuthorizationFailedException(AuthorizationTypes.user);

    const isPasswordValid = await AuthService.validatePassword(dto.password, existingUser.password);
    if (!isPasswordValid) throw new AuthorizationFailedException(AuthorizationTypes.user);


    const accessToken: Promise<string> = this.jwtHelper.generateAccessToken(existingUser);
    const refreshToken: Promise<string> = existingUser.refreshToken ?
      Promise.resolve(existingUser.refreshToken) : this.jwtHelper.generateRefreshToken(existingUser);


    const tokensArray = await Promise.all([
      accessToken,
      refreshToken
    ]);

    if (!tokensArray[0] || !tokensArray[1]) throw new UnauthorizedException("Access denied!");
    const tokens = await this.jwtHelper.mapTokensArrayIntoObject(tokensArray);

    if (!existingUser.refreshToken) existingUser =
      await this.usersService.updateUser(dto.email, { refreshToken: tokens.refreshToken });

    return this.usersDtoFactory.produceAuthedUserDto(existingUser, tokens);
  }

  async register(dto: CreatUserDto): Promise<AuthedUserDto> {
    let candidate = await this.usersService.findUserByEmail(dto.email);
    if (candidate) {
      throw new AlreadyExistsException("user");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.usersService.createUser({ ...dto, password: hashedPassword });

    return await this.login(dto);
  }
}
