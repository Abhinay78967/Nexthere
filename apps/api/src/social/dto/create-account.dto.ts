import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { SocialPlatform } from '@nexthere/database';

export class CreateAccountDto {
  @IsOptional()
  @IsString()
  brandProfileId?: string;

  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @IsString()
  accountName: string;

  @IsString()
  accountHandle: string;

  @IsOptional()
  @IsString()
  profileUrl?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  metadata?: any;
}
