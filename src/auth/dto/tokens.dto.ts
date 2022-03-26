import { TokensResponseObject } from "../interfaces";
import { IsJWT } from "class-validator";

export class TokensDto implements TokensResponseObject {
  @IsJWT()
  accessToken: string;
  @IsJWT()
  refreshToken: string;
}
