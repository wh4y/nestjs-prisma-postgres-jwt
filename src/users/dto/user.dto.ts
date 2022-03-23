import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "@prisma/client";

export class UserDto {

  @IsNumber()
  @IsNotEmpty()
  id: number = -1;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string = "";

  createdAt: Date;
}
