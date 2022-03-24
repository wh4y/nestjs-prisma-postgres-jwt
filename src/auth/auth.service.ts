import { HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UsersDtoFactory } from "../users/dto/factory/users-dto.factory";
import { CreatUserDto } from "../users/dto/creat-user.dto";
import { AuthedUserDto } from "../users/dto/authed-user.dto";
import { USERS_DTO_FACTORY } from "../users/constants";
import { JwtHelperService } from "./jwt-helper/jwt-helper.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtHelper: JwtHelperService,
    @Inject(USERS_DTO_FACTORY)
    private readonly usersDtoFactory: UsersDtoFactory
  ) {
  }

  private static async validatePassword({ password }: CreatUserDto, existingUser: User): Promise<boolean> {
    return await bcrypt.compare(password, existingUser.password);
  }

  async login(dto: CreatUserDto): Promise<AuthedUserDto> {
    let existingUser = await this.usersService.findUserByEmail(dto);
    if (!existingUser) throw new UnauthorizedException("Email or password aren't valid!");

    const isPasswordValid = await AuthService.validatePassword(dto, existingUser);
    if (!isPasswordValid) throw new UnauthorizedException("Email or password aren't valid!");


    const accessToken: Promise<string> = this.jwtHelper.generateAccessToken(existingUser);
    const refreshToken: Promise<string> = existingUser.hashedRT ?
      Promise.resolve(existingUser.hashedRT) : this.jwtHelper.generateRefreshToken(existingUser);


    const tokensArray = await Promise.all([
      accessToken,
      refreshToken
    ]);

    if (!tokensArray) throw new UnauthorizedException("Access denied!");
    const tokens = await this.jwtHelper.mapTokensArrayIntoObject(tokensArray);

    if (!existingUser.hashedRT) existingUser = await this.usersService.updateUser(dto.email, { hashedRT: tokens.refreshToken });

    return this.usersDtoFactory.produceAuthedUserDto(existingUser, tokens);
  }

  async register(dto: CreatUserDto): Promise<AuthedUserDto> {
    let candidate = await this.usersService.findUserByEmail(dto);
    if (candidate) {
      throw new HttpException("This user already exists!", 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.usersService.createUser({ ...dto, password: hashedPassword });

    return await this.login(dto);
  }
}
