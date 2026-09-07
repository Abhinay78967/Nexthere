import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialContentType, SocialPlatform, SocialPostStatus } from '@nexthere/database';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  brandProfileId?: string;

  @IsOptional()
  @IsString()
  socialAccountId?: string;

  @IsOptional()
  @IsString()
  campaignId?: string;

  @IsEnum(SocialPlatform)
  platform: SocialPlatform;

  @IsOptional()
  @IsEnum(SocialContentType)
  contentType?: SocialContentType;

  @IsOptional()
  @IsEnum(SocialPostStatus)
  status?: SocialPostStatus;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @IsOptional()
  carouselSlides?: any;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsString()
  aiPrompt?: string;

  @IsOptional()
  aiParameters?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
