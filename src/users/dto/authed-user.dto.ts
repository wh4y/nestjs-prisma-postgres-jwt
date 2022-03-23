import { IsJWT, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";

export class AuthedUserDto extends UserDto{
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
