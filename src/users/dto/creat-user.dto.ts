import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatUserDto {

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9\-_]{8,30}/)
  password: string;
}
