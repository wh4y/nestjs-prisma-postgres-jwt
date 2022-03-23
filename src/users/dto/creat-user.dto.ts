import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatUserDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string = '';

  @IsString()
  @IsNotEmpty()
  password: string = '';
}
