const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.inquiry.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.article.deleteMany();
  await prisma.industry.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.companyProfile.deleteMany();

  console.log('Seeding Company Profile & Site Settings...');
  await prisma.siteSettings.create({ 
    data: { 
      siteName: 'NextHere Services', 
      tagline: 'Technology, Electrical Infrastructure, and Logistics. Delivered.', 
      defaultSEO: { title: 'NextHere Services | Official Corporate Portal' } 
    } 
  });
  
  const profile = await prisma.companyProfile.create({
    data: {
      displayName: 'NextHere Services',
      legalName: 'NextHere Services Private Limited',
      shortDescription: 'Providing integrated IT advisory, electrical infrastructure, and road freight logistics solutions.',
      longDescription: 'NextHere Services Private Limited is a registered enterprise offering a unique triad of business solutions. We specialize in comprehensive IT consultancy and systems management, commercial and industrial electrical installations, and nationwide motorised road freight logistics. Our integrated approach empowers businesses with seamless technology, robust power distribution, and efficient supply chain operations.',
      mission: 'To deliver reliable, technology-enabled business solutions across IT networks, electrical installations, and commercial transportation.',
      vision: 'To be the most trusted integrated service provider for businesses seeking robust infrastructure and logistics support.',
      primaryEmail: 'nexthereservices@outlook.com',
      primaryPhone: '+91 94729 57044',
      address: 'House No Pvt.129, Plot No 75-A, Kh.No. 15/7, 1st Floor, Salempur Mazra, Burari Extn, Street No 5, Village Burari',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      foundedYear: 2023,
      logo: { url: '/logo.png', alt: 'NextHere Logo' }
    }
  });

  console.log('Seeding Categories & Services...');
  const itCategory = await prisma.serviceCategory.create({
    data: {
      title: 'IT & Technology Solutions',
      slug: 'it-technology',
      description: 'Computer consultancy, systems planning, networks, and technology-enabled business solutions.',
      media: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
      services: {
        create: [
          {
            title: 'IT Advisory & Consultancy',
            slug: 'it-consultancy',
            description: 'Systems planning, implementation, integration, and technology support services for institutions and organizations.',
            capabilities: ['IT Consultancy', 'Systems Planning', 'Technology Support', 'Facilities Management'],
            media: { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Network & Infrastructure Management',
            slug: 'network-infrastructure',
            description: 'Design, development, and maintenance of computer systems, networks, and software environments.',
            capabilities: ['Network Maintenance', 'Data Systems', 'IT Infrastructure', 'Software Environments'],
            media: { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Digital Logistics Systems',
            slug: 'digital-logistics-systems',
            description: 'Technology-enabled transport solutions including fleet management and shipment monitoring.',
            capabilities: ['Vehicle Tracking', 'Route Management', 'Fleet Management', 'Shipment Monitoring'],
            media: { url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop' },
            active: true
          }
        ]
      }
    }
  });

  const electricalCategory = await prisma.serviceCategory.create({
    data: {
      title: 'Electrical Infrastructure',
      slug: 'electrical-infrastructure',
      description: 'Installation, commissioning, and maintenance of commercial and industrial electrical systems.',
      media: { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop' },
      services: {
        create: [
          {
            title: 'Commercial Electrical Installations',
            slug: 'commercial-installations',
            description: 'Power distribution, cabling, lighting, and control panels for commercial and industrial premises.',
            capabilities: ['Power Distribution', 'Cabling', 'Control Panels', 'Lighting Systems'],
            media: { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Testing, Repair & Maintenance',
            slug: 'electrical-maintenance',
            description: 'Testing, repair, servicing, and maintenance of allied electrical installations and equipment.',
            capabilities: ['Commissioning', 'Testing', 'Repair', 'Servicing'],
            media: { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Automation & Control Systems',
            slug: 'automation-control',
            description: 'Integrated technology and electrical infrastructure solutions including monitoring and automation.',
            capabilities: ['Automation', 'Monitoring Systems', 'Control Systems', 'Integrated Tech'],
            media: { url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=800&auto=format&fit=crop' },
            active: true
          }
        ]
      }
    }
  });

  const logisticsCategory = await prisma.serviceCategory.create({
    data: {
      title: 'Freight & Logistics Operations',
      slug: 'freight-logistics',
      description: 'Motorised road freight transportation, warehousing, and comprehensive logistics support.',
      media: { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a02?q=80&w=800&auto=format&fit=crop' },
      services: {
        create: [
          {
            title: 'Motorised Road Freight',
            slug: 'road-freight',
            description: 'Carriage, movement, delivery, and distribution of goods via commercial vehicles, trucks, and trailers.',
            capabilities: ['Trucks & Tempos', 'Goods Movement', 'Domestic Distribution', 'Commercial Fleets'],
            media: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Warehousing & Inventory Handling',
            slug: 'warehousing',
            description: 'Storage, inventory handling, freight coordination, and allied logistics activities.',
            capabilities: ['Storage Solutions', 'Inventory Handling', 'Freight Coordination', 'Loading/Unloading'],
            media: { url: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800&auto=format&fit=crop' },
            active: true
          },
          {
            title: 'Route Coordination & Support',
            slug: 'route-coordination',
            description: 'Logistics support services for domestic and commercial consignments including route management.',
            capabilities: ['Route Coordination', 'Consignment Management', 'Delivery Support', 'Logistics Operations'],
            media: { url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop' },
            active: true
          }
        ]
      }
    }
  });

  console.log('Seeding Industries...');
  const indCommercial = await prisma.industry.create({
    data: {
      title: 'Commercial & Institutional',
      slug: 'commercial-institutional',
      shortDescription: 'Integrated IT, electrical, and facility management for institutions.',
      description: 'We provide end-to-end electrical installations, network infrastructure, and facilities management for large commercial premises and institutions as mandated by our core business objects.',
      media: { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
      status: 'PUBLISHED'
    }
  });

  const indIndustrial = await prisma.industry.create({
    data: {
      title: 'Industrial Operations',
      slug: 'industrial',
      shortDescription: 'Automation, power distribution, and logistics for industrial units.',
      description: 'Delivering robust control panels, heavy electrical wiring, and dedicated trucking/freight operations to keep industrial supply chains and factories running seamlessly.',
      media: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' },
      status: 'PUBLISHED'
    }
  });

  console.log('Seeding Projects...');
  await prisma.project.create({
    data: {
      title: 'Institutional Network & Electrical Integration',
      slug: 'institutional-integration',
      status: 'PUBLISHED',
      industryId: indCommercial.id,
      location: 'Pune, India',
      challenge: 'A newly constructed educational campus required a unified approach to their IT network rollout and campus-wide electrical power distribution.',
      solution: 'NextHere Services deployed a synchronized team to install main control panels, campus cabling, and establish a managed IT software environment.',
      results: 'Successfully commissioned all systems 2 weeks ahead of schedule with 100% compliance to applicable electrical safety laws.',
      coverMedia: { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' }
    }
  });

  await prisma.project.create({
    data: {
      title: 'Digital Fleet Management Rollout',
      slug: 'fleet-management-rollout',
      status: 'PUBLISHED',
      industryId: indIndustrial.id,
      location: 'New Delhi - Delhi Corridor',
      challenge: 'A manufacturing client needed to overhaul the movement of commercial consignments to reduce transit delays and inventory mismatch.',
      solution: 'We leased and deployed a fleet of commercial trucks integrated with our proprietary vehicle tracking and shipment monitoring technology.',
      results: 'Optimized route coordination resulted in a 20% reduction in delivery times and seamless inventory handling across warehouses.',
      coverMedia: { url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop' }
    }
  });

  console.log('Seeding Insights...'); await prisma.article.create({ data: { title: 'Integrating IT with Electrical Infrastructure for Modern Industries', slug: 'integrating-it-electrical', excerpt: 'How commercial and industrial premises are benefiting from integrated technology and electrical automation systems.', content: 'In line with our commitment to providing integrated technology and electrical infrastructure solutions, we explore how automation, monitoring, and control systems are revolutionizing commercial operations...', status: 'PUBLISHED', coverMedia: { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' } } }); console.log('Seeding FAQs...');
  await prisma.fAQ.createMany({
    data: [
      {
        question: 'Do you own your transport fleet?',
        answer: 'Yes, as per our mandate, we operate, own, lease, and manage commercial vehicles, trucks, and tempos for carrying goods and providing nationwide logistics services.',
        status: 'PUBLISHED'
      },
      {
        question: 'Are your electrical installations compliant with safety laws?',
        answer: 'Absolutely. All our installation, commissioning, testing, and repair works are strictly subjected to and compliant with applicable regional and national electrical laws.',
        status: 'PUBLISHED'
      },
      {
        question: 'Do you offer combined IT and Electrical solutions?',
        answer: 'Yes, we provide integrated technology and electrical infrastructure solutions, including automation, monitoring, and control systems for commercial premises.',
        status: 'PUBLISHED'
      },
      {
        question: 'Can you handle warehouse inventory as well as transportation?',
        answer: 'Yes, we undertake complete warehousing, storage, inventory handling, and freight coordination alongside our motorised road freight transportation.',
        status: 'PUBLISHED'
      }
    ]
  });

  console.log('Database successfully seeded with MCA MOA compliant data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
