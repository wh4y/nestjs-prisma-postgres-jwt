import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  createdAt: string;
}
