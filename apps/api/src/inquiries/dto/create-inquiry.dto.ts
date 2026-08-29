import {
  IsEmail,
  IsString,
  IsOptional,
  MaxLength,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateInquiryDto {
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

  @IsOptional()
  @IsUUID()
  serviceId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  message: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  timeline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  budgetRange?: string;

  @IsOptional()
  @IsString()
  honeypot?: string; // We will check this in the controller
}
