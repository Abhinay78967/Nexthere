import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanyProfile() {
    return this.prisma.client.companyProfile.findFirst();
  }

  async getSiteSettings() {
    return this.prisma.client.siteSettings.findFirst();
  }
}
