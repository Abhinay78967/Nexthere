import { PrismaClient, ContentStatus, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // EXISTING ORGANIZATION
  const existingOrg = await prisma.organization.findFirst();
  if (!existingOrg) {
    await prisma.organization.create({
      data: {
        name: 'NextHere Services Private Limited',
        industry: 'Multi-disciplinary Services',
        contactEmail: 'contact@nexthere.com',
      }
    });
  }

  // SERVICES
  const itCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'it' },
    update: {},
    create: {
      title: 'IT Services',
      slug: 'it',
      description: 'Enterprise-grade IT infrastructure, networking, and system integration.',
      media: { url: '/images/services/it-placeholder.svg', type: 'PLACEHOLDER', altText: 'Conceptual visualization' },
      services: {
        create: [
          {
            title: 'Network Infrastructure',
            slug: 'network-infrastructure',
            description: 'Design, deployment, and management of secure and scalable networks.',
            capabilities: { details: ['LAN/WAN Design', 'Wireless Solutions', 'Network Security'] },
            media: { url: '/images/services/it-placeholder.svg', type: 'PLACEHOLDER', altText: 'Conceptual visualization' }
          }
        ]
      }
    }
  });

  const electricalCategory = await prisma.serviceCategory.upsert({
    where: { slug: 'electrical' },
    update: {},
    create: {
      title: 'Electrical Services',
      slug: 'electrical',
      description: 'Comprehensive electrical installations, maintenance, and power infrastructure.',
      media: { url: '/images/services/electrical-placeholder.svg', type: 'PLACEHOLDER', altText: 'Conceptual visualization' },
      services: {
        create: [
          {
            title: 'Electrical Installation',
            slug: 'electrical-installation',
            description: 'Safe and compliant electrical installations for commercial and industrial spaces.',
            capabilities: { details: ['Commercial Fit-outs', 'Industrial Wiring', 'Panel Board Installation'] },
            media: { url: '/images/services/electrical-placeholder.svg', type: 'PLACEHOLDER', altText: 'Conceptual visualization' }
          }
        ]
      }
    }
  });

  // COMPANY PROFILE (Draft placeholders)
  const existingProfile = await prisma.companyProfile.findFirst();
  if (!existingProfile) {
    await prisma.companyProfile.create({
      data: {
        legalName: '[VERIFIED LEGAL NAME REQUIRED]',
        displayName: 'NextHere Services',
        shortDescription: 'Enterprise-grade multidisciplinary services.',
        mission: '[VERIFIED MISSION REQUIRED]',
        primaryEmail: '[VERIFIED EMAIL REQUIRED]',
        primaryPhone: '[VERIFIED PHONE REQUIRED]',
      }
    });
  }

  // SITE SETTINGS
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        siteName: 'NextHere',
        tagline: 'Enterprise Digital & Physical Infrastructure',
      }
    });
  }

  // DEMO INDUSTRY (PUBLISHED)
  const industry = await prisma.industry.upsert({
    where: { slug: 'manufacturing' },
    update: {},
    create: {
      title: 'Manufacturing',
      slug: 'manufacturing',
      shortDescription: 'Industrial automation and infrastructure support.',
      description: 'Comprehensive electrical and IT solutions for manufacturing environments.',
      status: ContentStatus.PUBLISHED,
    }
  });

  // DEMO PROJECT (DRAFT - NOT PUBLISHED)
  const project = await prisma.project.upsert({
    where: { slug: 'demo-facility-upgrade' },
    update: {},
    create: {
      title: 'Demo Facility Upgrade',
      slug: 'demo-facility-upgrade',
      status: ContentStatus.DRAFT,
      projectStatus: ProjectStatus.COMPLETED,
      challenge: 'Legacy infrastructure required complete overhaul without downtime.',
      solution: 'Phased implementation of new networking and electrical systems.',
      industryId: industry.id,
    }
  });

  // DEMO ARTICLE (PUBLISHED)
  const article = await prisma.article.upsert({
    where: { slug: 'future-of-industrial-networking' },
    update: {},
    create: {
      title: 'The Future of Industrial Networking',
      slug: 'future-of-industrial-networking',
      excerpt: 'How modern IT infrastructure is reshaping the manufacturing landscape.',
      content: 'This is a placeholder article discussing industrial networking trends.',
      status: ContentStatus.PUBLISHED,
      author: 'NextHere Technical Team',
      industryId: industry.id,
      publishedAt: new Date()
    }
  });

  // DEMO FAQ (PUBLISHED)
  const faq = await prisma.fAQ.findFirst({ where: { question: 'What areas do you serve?' } });
  if (!faq) {
    await prisma.fAQ.create({
      data: {
        question: 'What areas do you serve?',
        answer: 'Please contact us for specific service availability in your region.',
        status: ContentStatus.PUBLISHED
      }
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
