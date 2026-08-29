const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.inquiry.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.industry.deleteMany();
  await prisma.fAQ.deleteMany();

  console.log('Seeding Categories & Services...');
  const itCategory = await prisma.serviceCategory.create({
    data: {
      title: 'IT Services',
      slug: 'it-services',
      description: 'Comprehensive software and IT infrastructure solutions.',
      services: {
        create: [
          {
            title: 'Custom Enterprise Software',
            slug: 'custom-enterprise-software',
            description: 'Scalable cloud-native applications tailored for your business needs.',
            active: true
          },
          {
            title: 'Cloud Infrastructure & DevOps',
            slug: 'cloud-infrastructure',
            description: 'Secure and automated cloud environments on AWS and Azure.',
            active: true
          }
        ]
      }
    }
  });

  const logisticsCategory = await prisma.serviceCategory.create({
    data: {
      title: 'Logistics',
      slug: 'logistics',
      description: 'End-to-end supply chain and freight forwarding.',
      services: {
        create: [
          {
            title: 'Global Freight Forwarding',
            slug: 'global-freight',
            description: 'Reliable air and sea freight logistics.',
            active: true
          }
        ]
      }
    }
  });

  console.log('Seeding Industries...');
  await prisma.industry.createMany({
    data: [
      {
        title: 'Healthcare & Pharma',
        slug: 'healthcare',
        description: 'Compliant digital transformation for healthcare providers.',
      },
      {
        title: 'Financial Services',
        slug: 'finance',
        description: 'Secure software and infrastructure for fintech and banking.',
      }
    ]
  });

  console.log('Seeding Projects...');
  await prisma.project.create({
    data: {
      title: 'Global Supply Chain Modernization',
      slug: 'supply-chain-modernization',
    }
  });

  console.log('Seeding FAQs...');
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'What is your typical project timeline?',
        answer: 'Most enterprise software projects take between 3 to 6 months depending on complexity.'
      },
      {
        question: 'Do you offer post-launch support?',
        answer: 'Yes, we provide 24/7 SLA-backed support and maintenance contracts.'
      }
    ]
  });

  console.log('Seeding dummy Leads for Admin Dashboard...');
  const lead1 = await prisma.lead.create({
    data: {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91-9876543210',
      companyName: 'TechCorp India',
      status: 'NEW',
      priority: 'HIGH',
      serviceId: (await prisma.service.findFirst({ where: { slug: 'custom-enterprise-software' } })).id,
      inquiries: {
        create: {
          subject: 'CRM Rebuild Quote', message: 'We are looking to rebuild our internal CRM. Please contact me to discuss a quote.'
        }
      }
    }
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: 'Sarah Jenkins',
      email: 'sarah.j@logistics-pro.com',
      status: 'CONTACTED',
      priority: 'MEDIUM',
      serviceId: (await prisma.service.findFirst({ where: { slug: 'global-freight' } })).id,
      inquiries: {
        create: {
          subject: 'Air Freight Rates', message: 'Need rates for regular air freight from Mumbai to London.'
        }
      }
    }
  });

  console.log('Database successfully seeded with realistic data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
