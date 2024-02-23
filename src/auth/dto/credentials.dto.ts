import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}