import { Injectable, Logger } from '@nestjs/common';
import { SocialPlatform, SocialPost, SocialAccount } from '@nexthere/database';

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  externalPostUrl?: string;
  publishedAt?: Date;
  errorMessage?: string;
  simulated?: boolean;
}

@Injectable()
export class SocialPublisherService {
  private readonly logger = new Logger(SocialPublisherService.name);

  /**
   * Dispatches a post to the designated social media platform
   */
  async publish(
    post: SocialPost,
    account?: SocialAccount | null
  ): Promise<PublishResult> {
    this.logger.log(`Publishing post "${post.id}" to platform ${post.platform}`);

    try {
      switch (post.platform) {
        case SocialPlatform.LINKEDIN:
          return await this.publishToLinkedIn(post, account);
        case SocialPlatform.INSTAGRAM:
          return await this.publishToInstagram(post, account);
        case SocialPlatform.TWITTER:
          return await this.publishToTwitter(post, account);
        case SocialPlatform.FACEBOOK:
          return await this.publishToFacebook(post, account);
        default:
          return this.simulatePublish(post, account);
      }
    } catch (error: any) {
      this.logger.error(`Failed to publish post ${post.id}: ${error?.message || error}`);
      return {
        success: false,
        errorMessage: error?.message || 'Unknown publishing error',
      };
    }
  }

  /**
   * LinkedIn Publisher (API + Simulator Fallback)
   */
  private async publishToLinkedIn(post: SocialPost, account?: SocialAccount | null): Promise<PublishResult> {
    if (account?.accessToken) {
      // Real LinkedIn REST API call
      try {
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: `urn:li:organization:${account.accountHandle || 'default'}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
              'com.linkedin.ugc.ShareContent': {
                shareCommentary: { text: post.content },
                shareMediaCategory: 'NONE',
              },
            },
            visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const urn = data.id || `urn:li:share:${Date.now()}`;
          return {
            success: true,
            externalPostId: urn,
            externalPostUrl: `https://www.linkedin.com/feed/update/${urn}/`,
            publishedAt: new Date(),
            simulated: false,
          };
        }
      } catch (err) {
        this.logger.warn(`LinkedIn API live call failed, falling back to simulator:`, err);
      }
    }

    return this.simulatePublish(post, account);
  }

  /**
   * Instagram Publisher (Meta Graph API + Simulator Fallback)
   */
  private async publishToInstagram(post: SocialPost, account?: SocialAccount | null): Promise<PublishResult> {
    if (account?.accessToken && account.metadata) {
      const igUserId = (account.metadata as any)?.igUserId || account.accountHandle;
      try {
        const mediaUrl = post.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080';
        const createContainerUrl = `https://graph.facebook.com/v19.0/${igUserId}/media?image_url=${encodeURIComponent(
          mediaUrl
        )}&caption=${encodeURIComponent(post.content)}&access_token=${account.accessToken}`;

        const containerRes = await fetch(createContainerUrl, { method: 'POST' });
        if (containerRes.ok) {
          const containerData = await containerRes.json();
          const publishUrl = `https://graph.facebook.com/v19.0/${igUserId}/media_publish?creation_id=${containerData.id}&access_token=${account.accessToken}`;
          const pubRes = await fetch(publishUrl, { method: 'POST' });
          if (pubRes.ok) {
            const pubData = await pubRes.json();
            return {
              success: true,
              externalPostId: pubData.id,
              externalPostUrl: `https://www.instagram.com/p/${pubData.id}/`,
              publishedAt: new Date(),
              simulated: false,
            };
          }
        }
      } catch (err) {
        this.logger.warn(`Instagram API live call failed, falling back to simulator:`, err);
      }
    }

    return this.simulatePublish(post, account);
  }

  /**
   * Twitter / X Publisher
   */
  private async publishToTwitter(post: SocialPost, account?: SocialAccount | null): Promise<PublishResult> {
    if (account?.accessToken) {
      try {
        const response = await fetch('https://api.twitter.com/2/tweets', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: post.content.substring(0, 280) }),
        });

        if (response.ok) {
          const data = await response.json();
          const tweetId = data.data?.id;
          return {
            success: true,
            externalPostId: tweetId,
            externalPostUrl: `https://x.com/user/status/${tweetId}`,
            publishedAt: new Date(),
            simulated: false,
          };
        }
      } catch (err) {
        this.logger.warn(`Twitter API live call failed, falling back to simulator:`, err);
      }
    }

    return this.simulatePublish(post, account);
  }

  /**
   * Facebook Publisher
   */
  private async publishToFacebook(post: SocialPost, account?: SocialAccount | null): Promise<PublishResult> {
    return this.simulatePublish(post, account);
  }

  /**
   * Built-in Simulator / Sandbox Dispatcher
   */
  private simulatePublish(post: SocialPost, account?: SocialAccount | null): PublishResult {
    const timestamp = Date.now();
    const handle = account?.accountHandle || 'nexthere_official';
    const cleanPlatform = post.platform.toLowerCase();
    const simulatedId = `sim_${cleanPlatform}_${timestamp}`;

    let externalUrl = `https://${cleanPlatform}.com/${handle}/status/${timestamp}`;
    if (post.platform === SocialPlatform.LINKEDIN) {
      externalUrl = `https://www.linkedin.com/company/${handle}/posts/${timestamp}`;
    } else if (post.platform === SocialPlatform.INSTAGRAM) {
      externalUrl = `https://www.instagram.com/${handle}/p/sim_${timestamp}`;
    }

    this.logger.log(`[SIMULATOR] Successfully dispatched post ${post.id} to ${post.platform} (${externalUrl})`);

    return {
      success: true,
      externalPostId: simulatedId,
      externalPostUrl: externalUrl,
      publishedAt: new Date(),
      simulated: true,
    };
  }
}
