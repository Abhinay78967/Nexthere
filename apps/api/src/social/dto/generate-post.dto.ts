import { IsOptional, IsString, IsArray } from 'class-validator';

export enum GenerationTone {
  AUTHORITATIVE = 'Authoritative & Expert',
  CONVERSATIONAL = 'Conversational & Engaging',
  INSPIRATIONAL = 'Inspirational & Thought-Provoking',
  PROMOTIONAL = 'Value-Driven Promotional',
  EDUCATIONAL = 'Educational / How-To',
  STORYTELLING = 'Behind the Scenes / Storytelling',
}

export class GeneratePostDto {
  @IsString()
  topic: string;

  @IsOptional()
  @IsString()
  brandProfileId?: string;

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  platforms?: string[];

  @IsOptional()
  @IsString()
  callToAction?: string;

  @IsOptional()
  @IsString()
  customInstructions?: string;
}
