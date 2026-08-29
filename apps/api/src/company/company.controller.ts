import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getCompanyInfo() {
    const profile = await this.companyService.getCompanyProfile();
    const settings = await this.companyService.getSiteSettings();
    return {
      success: true,
      data: {
        profile: profile
          ? {
              legalName: profile.legalName,
              displayName: profile.displayName,
              shortDescription: profile.shortDescription,
              longDescription: profile.longDescription,
              mission: profile.mission,
              vision: profile.vision,
              primaryEmail: profile.primaryEmail,
              primaryPhone: profile.primaryPhone,
              address: profile.address,
              city: profile.city,
              state: profile.state,
              country: profile.country,
              logo: profile.logo,
              foundedYear: profile.foundedYear,
            }
          : null,
        settings: settings
          ? {
              siteName: settings.siteName,
              tagline: settings.tagline,
              logo: settings.logo,
              favicon: settings.favicon,
              socialLinks: settings.socialLinks,
              defaultSEO: settings.defaultSEO,
              footerContent: settings.footerContent,
            }
          : null,
      },
    };
  }
}
