import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialPlatform, SocialPostStatus } from '@nexthere/database';

export class QueryPostsDto {
  @IsOptional()
  @IsEnum(SocialPlatform)
  platform?: SocialPlatform;

  @IsOptional()
  @IsEnum(SocialPostStatus)
  status?: SocialPostStatus;

  @IsOptional()
  @IsString()
  brandProfileId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}
