import { IsJWT, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";
import { User } from "@prisma/client";
import { TokensResponseObject } from "../../auth/interfaces";

export class AuthedUserDto extends UserDto {
  @IsJWT()
  @IsNotEmpty()
  tokens: TokensResponseObject;
}
