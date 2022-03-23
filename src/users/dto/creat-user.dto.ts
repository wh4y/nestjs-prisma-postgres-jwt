import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreatUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.+[A-Z])(?=.+[0-9])[a-zA-Z0-9\-_]/g)
  password: string;
}
