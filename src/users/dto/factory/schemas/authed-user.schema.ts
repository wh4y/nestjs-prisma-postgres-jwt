import { IsJWT, IsNotEmpty } from "class-validator";
import { UserSchema } from "./user.schema";
import { TokensResponseObject } from "../../../../auth/interfaces";

export class AuthedUserSchema extends UserSchema {
  tokens: TokensResponseObject = { accessToken: null, refreshToken: null };
}
