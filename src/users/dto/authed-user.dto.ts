import { IsJWT, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";
import { User } from "@prisma/client";

export class AuthedUserDto extends UserDto {
  @IsJWT()
  @IsNotEmpty()
  tokens: {
    accessToken: string,
    refreshToken: string
  } = { accessToken: null, refreshToken: null };
}
