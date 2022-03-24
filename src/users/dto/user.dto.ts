import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {

  @IsNumber()
  @IsNotEmpty()
  id: number = -1;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string = "";

  @IsDate()
  createdAt: Date;
}
