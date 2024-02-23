import { Type } from "class-transformer";
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, } from "class-validator";


export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  description: string;
}