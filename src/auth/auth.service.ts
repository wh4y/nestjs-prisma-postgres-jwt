import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Prisma, User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser({ email, password }: Prisma.UserCreateInput, existingUser: User) {
    return await bcrypt.compare(password, existingUser.password);
  }

  async generateToken({ email, role }: Prisma.UserCreateInput) {
    return this.jwtService.sign({ email, role });
  }

  async login(dto: Prisma.UserCreateInput) {
    const existingUser = await this.usersService.findUserByEmail(dto);
    if (!existingUser) throw new UnauthorizedException("Email or password aren't valid!");

    const isPasswordValid = await this.validateUser(dto, existingUser);
    if (!isPasswordValid) throw new UnauthorizedException("Email or password aren't valid!");

    return {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      token: await this.generateToken(existingUser)
    };
  }

  async register(dto: Prisma.UserCreateInput) {
    let candidate = await this.usersService.findUserByEmail(dto);
    if (candidate) {
      throw new HttpException("This user already exists!", 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    candidate = await this.usersService.createUser({ ...dto, password: hashedPassword });

    return {
      id: candidate.id,
      email: candidate.email,
      role: candidate.role,
      token: await this.generateToken(candidate)
    };
  }
}
