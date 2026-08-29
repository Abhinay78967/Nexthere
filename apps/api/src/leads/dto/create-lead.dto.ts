import {
  IsEmail,
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  companyName?: string;

  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  requirements: string;

  @IsOptional()
  @IsString()
  honeypot?: string;
}
