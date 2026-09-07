import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SocialService } from './services/social.service';
import { GeneratePostDto } from './dto/generate-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostsDto } from './dto/query-posts.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post('generate')
  generateWithAi(@Body() dto: GeneratePostDto) {
    return this.socialService.generatePostsWithAi(dto);
  }

  @Get('stats')
  getOverviewStats() {
    return this.socialService.getOverviewStats();
  }

  @Get('calendar')
  getCalendarFeed(
    @Query('year') year?: string,
    @Query('month') month?: string
  ) {
    return this.socialService.getCalendarFeed(
      year ? parseInt(year, 10) : undefined,
      month ? parseInt(month, 10) : undefined
    );
  }

  @Get('brands')
  getBrands() {
    return this.socialService.getBrandProfiles();
  }

  @Post('brands')
  createBrand(@Body() dto: CreateBrandDto) {
    return this.socialService.createBrandProfile(dto);
  }

  @Get('posts')
  getPosts(@Query() query: QueryPostsDto) {
    return this.socialService.getPosts(query);
  }

  @Get('posts/:id')
  getPostById(@Param('id') id: string) {
    return this.socialService.getPostById(id);
  }

  @Post('posts')
  createPost(@Body() dto: CreatePostDto) {
    return this.socialService.createPost(dto);
  }

  @Put('posts/:id')
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.socialService.updatePost(id, dto);
  }

  @Delete('posts/:id')
  deletePost(@Param('id') id: string) {
    return this.socialService.deletePost(id);
  }

  @Post('posts/:id/publish-now')
  publishNow(@Param('id') id: string) {
    return this.socialService.publishNow(id);
  }

  // ---------------------------------------------------------
  // SOCIAL ACCOUNTS / CHANNELS
  // ---------------------------------------------------------

  @Get('accounts')
  getAccounts() {
    return this.socialService.getSocialAccounts();
  }

  @Post('accounts')
  createAccount(@Body() dto: any) {
    return this.socialService.createSocialAccount(dto);
  }

  @Put('accounts/:id')
  updateAccount(@Param('id') id: string, @Body() dto: any) {
    return this.socialService.updateSocialAccount(id, dto);
  }

  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.socialService.deleteSocialAccount(id);
  }

  @Post('accounts/:id/test')
  testAccount(@Param('id') id: string) {
    return this.socialService.testAccountConnection(id);
  }
}
