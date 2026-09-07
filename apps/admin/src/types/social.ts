export type SocialPlatform = 'LINKEDIN' | 'INSTAGRAM' | 'TWITTER' | 'FACEBOOK' | 'YOUTUBE';
export type SocialPostStatus = 'DRAFT' | 'AI_GENERATING' | 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED';
export type SocialContentType = 'TEXT_POST' | 'CAROUSEL' | 'IMAGE_POST' | 'REEL_SCRIPT' | 'THREAD';

export interface BrandProfile {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  toneOfVoice?: string | null;
  targetAudience?: string | null;
  defaultHashtags: string[];
  brandColors?: any;
  websiteUrl?: string | null;
  ctaText?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
    accounts: number;
  };
}

export interface CarouselSlide {
  slideNumber: number;
  heading: string;
  body: string;
  visualCue: string;
}

export interface SocialPost {
  id: string;
  brandProfileId?: string | null;
  brandProfile?: BrandProfile | null;
  socialAccountId?: string | null;
  campaignId?: string | null;
  platform: SocialPlatform;
  contentType: SocialContentType;
  status: SocialPostStatus;
  title?: string | null;
  content: string;
  mediaUrls: string[];
  carouselSlides?: CarouselSlide[] | null;
  scheduledAt?: string | null;
  publishedAt?: string | null;
  externalPostId?: string | null;
  externalPostUrl?: string | null;
  errorMessage?: string | null;
  metrics?: {
    likes?: number;
    comments?: number;
    impressions?: number;
    clicks?: number;
    shares?: number;
  } | null;
  aiPrompt?: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GeneratedVariant {
  platform: SocialPlatform;
  contentType: SocialContentType;
  title: string;
  content: string;
  hook: string;
  callToAction: string;
  hashtags: string[];
  carouselSlides?: CarouselSlide[];
  suggestedBestTime: string;
  estimatedViralityScore: number;
}

export interface SocialStats {
  totalPosts: number;
  scheduledCount: number;
  publishedCount: number;
  failedCount: number;
  brandsCount: number;
  estimatedImpressions: number;
  totalLikes: number;
  totalClicks: number;
}

export interface SocialAccount {
  id: string;
  brandProfileId?: string | null;
  brandProfile?: BrandProfile | null;
  platform: SocialPlatform;
  accountName: string;
  accountHandle: string;
  profileUrl?: string | null;
  avatarUrl?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiresAt?: string | null;
  isActive: boolean;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
  };
}

export interface InboundCaptureResult {
  leadCaptured: boolean;
  leadId?: string;
  inquiryId?: string;
  autoReplyText: string;
  customerName: string;
  intentDetected: string;
}

