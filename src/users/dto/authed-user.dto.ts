import { IsJWT, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";
import { User } from "@prisma/client";
import { TokensResponseObject } from "../../auth/interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class AuthedUserDto extends UserDto {

  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  tokens: TokensResponseObject;
}
