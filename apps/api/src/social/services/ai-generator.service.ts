import { Injectable, Logger } from '@nestjs/common';
import { GeneratePostDto } from '../dto/generate-post.dto';
import { SocialContentType, SocialPlatform } from '@nexthere/database';

export interface GeneratedVariant {
  platform: SocialPlatform;
  contentType: SocialContentType;
  title: string;
  content: string;
  hook: string;
  callToAction: string;
  hashtags: string[];
  carouselSlides?: Array<{ slideNumber: number; heading: string; body: string; visualCue: string }>;
  suggestedBestTime: string;
  estimatedViralityScore: number; // 0 - 100
}

@Injectable()
export class AiGeneratorService {
  private readonly logger = new Logger(AiGeneratorService.name);

  /**
   * Generates tailored social posts for requested platforms
   */
  async generatePosts(
    dto: GeneratePostDto,
    brand?: { name: string; toneOfVoice?: string | null; targetAudience?: string | null; defaultHashtags?: string[]; ctaText?: string | null }
  ): Promise<GeneratedVariant[]> {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const platforms = (dto.platforms && dto.platforms.length > 0)
      ? dto.platforms.map((p) => p.toUpperCase() as SocialPlatform)
      : [SocialPlatform.LINKEDIN, SocialPlatform.INSTAGRAM, SocialPlatform.TWITTER];

    const results: GeneratedVariant[] = [];

    for (const platform of platforms) {
      if (apiKey) {
        try {
          const generated = await this.generateWithGemini(dto, platform, brand, apiKey);
          if (generated) {
            results.push(generated);
            continue;
          }
        } catch (error) {
          this.logger.warn(`Gemini API generation failed for ${platform}, falling back to intelligent template engine:`, error);
        }
      }

      // Fallback or offline smart generator
      results.push(this.generateSmartFallback(dto, platform, brand));
    }

    return results;
  }

  /**
   * Directly queries the Gemini REST API for content generation
   */
  private async generateWithGemini(
    dto: GeneratePostDto,
    platform: SocialPlatform,
    brand: any,
    apiKey: string
  ): Promise<GeneratedVariant | null> {
    const brandName = brand?.name || 'NextHere';
    const tone = dto.tone || brand?.toneOfVoice || 'Authoritative, Engaging & Growth-Oriented';
    const audience = dto.targetAudience || brand?.targetAudience || 'Business leaders, founders, tech decision-makers, and industry professionals';
    const cta = dto.callToAction || brand?.ctaText || 'Connect with NextHere or drop a comment below';

    const systemPrompt = `You are an elite, top 1% B2B and consumer social media strategist and ghostwriter for ${brandName}.
Generate a viral, high-converting social media post for platform: ${platform}.
Topic: "${dto.topic}".
Tone of Voice: ${tone}.
Target Audience: ${audience}.
Call To Action: ${cta}.
${dto.customInstructions ? `Special Instructions: ${dto.customInstructions}` : ''}

Output ONLY a valid JSON object matching this exact schema:
{
  "title": "Short internal title",
  "hook": "Eye-catching opening hook (first line)",
  "content": "Full post text formatted for ${platform} with linebreaks, emojis, and styling",
  "callToAction": "Clear CTA statement",
  "hashtags": ["tag1", "tag2", "tag3"],
  "suggestedBestTime": "e.g. Tuesday at 10:00 AM IST",
  "estimatedViralityScore": 88,
  "carouselSlides": [ // only if Instagram or multi-slide format is appropriate, else null
    { "slideNumber": 1, "heading": "...", "body": "...", "visualCue": "..." }
  ]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) return null;

    const parsed = JSON.parse(rawJson);
    return {
      platform,
      contentType: parsed.carouselSlides?.length ? SocialContentType.CAROUSEL : SocialContentType.TEXT_POST,
      title: parsed.title || `${platform} post on ${dto.topic}`,
      content: parsed.content || parsed.hook,
      hook: parsed.hook || '',
      callToAction: parsed.callToAction || cta,
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : ['NextHere', 'BusinessGrowth', 'Innovation'],
      carouselSlides: parsed.carouselSlides || undefined,
      suggestedBestTime: parsed.suggestedBestTime || 'Tuesday at 11:00 AM',
      estimatedViralityScore: typeof parsed.estimatedViralityScore === 'number' ? parsed.estimatedViralityScore : 85,
    };
  }

  /**
   * Smart rule-based dynamic generator with platform-specific heuristics
   */
  private generateSmartFallback(
    dto: GeneratePostDto,
    platform: SocialPlatform,
    brand?: any
  ): GeneratedVariant {
    const brandName = brand?.name || 'NextHere';
    const topic = dto.topic.trim();
    const tone = dto.tone || brand?.toneOfVoice || 'Professional & Actionable';
    const cta = dto.callToAction || brand?.ctaText || 'Share your perspective in the comments below or DM us for a free strategy audit!';
    const defaultTags = brand?.defaultHashtags?.length ? brand.defaultHashtags : ['NextHere', 'BusinessGrowth', 'Leadership', 'TechStrategy'];

    const cleanTopic = topic.replace(/[?.,!]+$/, '');

    if (platform === SocialPlatform.LINKEDIN) {
      const hook = `90% of businesses struggle with ${cleanTopic}. Here is the exact framework we use at ${brandName} to solve it:`;
      const content = `${hook}

When scaling, most teams focus on the symptoms rather than the root operational bottlenecks.

Here are 3 key principles that changed the game for us:

1️⃣ Audit & Systematize First
Before adding more tools or complexity, map out every handoff and eliminate friction points.

2️⃣ Prioritize Scalability over Short-term Hacks
Sustainable growth comes from predictable infrastructure, not one-off shortcuts.

3️⃣ Measure What Moves the Needle
Focus strictly on customer value, throughput speed, and ROI.

💡 Key Takeaway:
Success isn't about doing 100 new things—it's about doing the top 3 critical things with 10x consistency.

👇 ${cta}

#${defaultTags.join(' #')}`;

      return {
        platform: SocialPlatform.LINKEDIN,
        contentType: SocialContentType.TEXT_POST,
        title: `LinkedIn Thought Leadership: ${cleanTopic}`,
        hook,
        content,
        callToAction: cta,
        hashtags: defaultTags,
        suggestedBestTime: 'Tuesday & Thursday at 9:30 AM IST',
        estimatedViralityScore: 91,
      };
    }

    if (platform === SocialPlatform.INSTAGRAM) {
      const hook = `Stop making this mistake with ${cleanTopic} 🚨 (Save this for later!)`;
      const slides = [
        {
          slideNumber: 1,
          heading: `The Blueprint for ${cleanTopic}`,
          body: `What top 1% companies do differently to dominate their industry.`,
          visualCue: `Bold modern typography on dark gradient background with ${brandName} watermark`,
        },
        {
          slideNumber: 2,
          heading: `Mistake #1: Overcomplicating`,
          body: `Trying to do everything manually without unified systems creates massive delays.`,
          visualCue: `Warning badge icon with high-contrast callout card`,
        },
        {
          slideNumber: 3,
          heading: `The 3-Step Fix`,
          body: `• Automate routine pipelines\n• Establish clear SLAs\n• Leverage AI-driven oversight`,
          visualCue: `Minimalist 3-bullet checklist graphic`,
        },
        {
          slideNumber: 4,
          heading: `The Outcome`,
          body: `Over 40% reduction in operational turnaround time and predictable revenue growth.`,
          visualCue: `Growth chart icon + metric spotlight badge`,
        },
        {
          slideNumber: 5,
          heading: `Ready to Elevate?`,
          body: `Comment "GROWTH" below and we'll send you our full implementation checklist!`,
          visualCue: `${brandName} Logo with interactive swipe CTA`,
        },
      ];

      const content = `${hook}

Swipe through 👉 for the full step-by-step breakdown on mastering ${cleanTopic}.

At ${brandName}, we help businesses transform complex challenges into scalable advantages.

💬 Which slide resonated with your current stage? Drop a comment below!
📩 ${cta}

.
.
#${defaultTags.join(' #')} #InstaBusiness #EntrepreneurMindset #ScaleUp`;

      return {
        platform: SocialPlatform.INSTAGRAM,
        contentType: SocialContentType.CAROUSEL,
        title: `Instagram Carousel: ${cleanTopic}`,
        hook,
        content,
        callToAction: cta,
        hashtags: [...defaultTags, 'BusinessStrategy', 'ScaleFast'],
        carouselSlides: slides,
        suggestedBestTime: 'Wednesday & Saturday at 6:30 PM IST',
        estimatedViralityScore: 88,
      };
    }

    if (platform === SocialPlatform.TWITTER) {
      const hook = `How to master ${cleanTopic} in 2026 without burning out your team: 🧵👇`;
      const content = `${hook}

1/ Most businesses overcomplicate ${cleanTopic}. 

Here's the simplified 4-step framework we use at @${brandName.toLowerCase().replace(/\s+/g, '')}:

2/ 🎯 Step 1: Remove friction.
Audit your slowest process and cut unnecessary approvals. Speed is your competitive moat.

3/ ⚙️ Step 2: Standardize before automating.
Bad processes automated just create faster mistakes. Clean the foundation first.

4/ 📈 Step 3: Iterate with data.
Track 2 metrics only: Customer Cycle Time & ROI. Everything else is noise.

5/ 🚀 Ready to scale your operations?
${cta}

RT if you found this insightful! 🔁`;

      return {
        platform: SocialPlatform.TWITTER,
        contentType: SocialContentType.THREAD,
        title: `X / Twitter Thread: ${cleanTopic}`,
        hook,
        content,
        callToAction: cta,
        hashtags: defaultTags.slice(0, 3),
        suggestedBestTime: 'Monday & Wednesday at 12:00 PM IST',
        estimatedViralityScore: 84,
      };
    }

    // Default Facebook / Other
    return {
      platform,
      contentType: SocialContentType.TEXT_POST,
      title: `${platform} Update: ${cleanTopic}`,
      hook: `Exciting updates around ${cleanTopic} at ${brandName}!`,
      content: `Exciting updates around ${cleanTopic} at ${brandName}!\n\nWe are committed to helping organizations optimize their performance and achieve measurable growth.\n\n👉 ${cta}\n\n#${defaultTags.join(' #')}`,
      callToAction: cta,
      hashtags: defaultTags,
      suggestedBestTime: 'Everyday at 3:00 PM IST',
      estimatedViralityScore: 80,
    };
  }
}
