import { HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersDtoFactory } from "../users/dto/users-dto.factory";
import { CreatUserDto } from "../users/dto/creat-user.dto";
import { AuthedUserDto } from "../users/dto/authed-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject("USERS_DTO_FACTORY")
    private readonly usersDtoFactory: UsersDtoFactory
  ) {
  }

  async validateUser({ email, password }: CreatUserDto, existingUser: User): Promise<boolean> {
    return await bcrypt.compare(password, existingUser.password);
  }

  async generateToken({ email }: CreatUserDto) {
    return this.jwtService.sign({ email });
  }

  async generateRefreshToken() {

  }

  async login(dto: CreatUserDto): Promise<AuthedUserDto> {
    const existingUser = await this.usersService.findUserByEmail(dto);
    if (!existingUser) throw new UnauthorizedException("Email or password aren't valid!");

    const isPasswordValid = await this.validateUser(dto, existingUser);
    if (!isPasswordValid) throw new UnauthorizedException("Email or password aren't valid!");

    const token = await this.generateToken(existingUser);

    return this.usersDtoFactory.produceAuthedUserDto(existingUser, token);
  }

  async register(dto: CreatUserDto): Promise<AuthedUserDto> {
    let candidate = await this.usersService.findUserByEmail(dto);
    if (candidate) {
      throw new HttpException("This user already exists!", 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    candidate = await this.usersService.createUser({ ...dto, password: hashedPassword });
    const token = await this.generateToken(candidate);

    return this.usersDtoFactory.produceAuthedUserDto(candidate, token);
  }
}
