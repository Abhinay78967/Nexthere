import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('Seeding database...');
    // Reset logic is omitted as requested by the user, but we will use upsert to avoid conflicts.
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
    const itCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'it' },
        update: {
            media: {
                url: '/images/services/it-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of enterprise network infrastructure'
            }
        },
        create: {
            title: 'IT Services',
            slug: 'it',
            description: 'Enterprise-grade IT infrastructure, networking, and system integration.',
            media: {
                url: '/images/services/it-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of enterprise network infrastructure'
            },
            services: {
                create: [
                    {
                        title: 'Network Infrastructure',
                        slug: 'network-infrastructure',
                        description: 'Design, deployment, and management of secure and scalable networks.',
                        capabilities: { details: ['LAN/WAN Design', 'Wireless Solutions', 'Network Security'] },
                        media: {
                            url: '/images/services/it-placeholder.svg',
                            type: 'PLACEHOLDER',
                            altText: 'Conceptual visualization of enterprise network infrastructure'
                        }
                    },
                    {
                        title: 'Structured Cabling',
                        slug: 'structured-cabling',
                        description: 'High-performance structured cabling systems for modern commercial facilities.',
                        capabilities: { details: ['Fiber Optic', 'Copper Systems', 'Data Center Cabling'] },
                        media: {
                            url: '/images/services/it-placeholder.svg',
                            type: 'PLACEHOLDER',
                            altText: 'Conceptual visualization of structured cabling'
                        }
                    }
                ]
            }
        }
    });
    const electricalCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'electrical' },
        update: {
            media: {
                url: '/images/services/electrical-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of commercial electrical infrastructure'
            }
        },
        create: {
            title: 'Electrical Services',
            slug: 'electrical',
            description: 'Comprehensive electrical installations, maintenance, and power infrastructure.',
            media: {
                url: '/images/services/electrical-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of commercial electrical infrastructure'
            },
            services: {
                create: [
                    {
                        title: 'Electrical Installation',
                        slug: 'electrical-installation',
                        description: 'Safe and compliant electrical installations for commercial and industrial spaces.',
                        capabilities: { details: ['Commercial Fit-outs', 'Industrial Wiring', 'Panel Board Installation'] },
                        media: {
                            url: '/images/services/electrical-placeholder.svg',
                            type: 'PLACEHOLDER',
                            altText: 'Conceptual visualization of commercial electrical infrastructure'
                        }
                    }
                ]
            }
        }
    });
    const logisticsCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'logistics' },
        update: {
            media: {
                url: '/images/services/logistics-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of logistics and mobility operations'
            }
        },
        create: {
            title: 'Logistics',
            slug: 'logistics',
            description: 'End-to-end transportation, fleet services, and freight solutions.',
            media: {
                url: '/images/services/logistics-placeholder.svg',
                type: 'PLACEHOLDER',
                altText: 'Conceptual visualization of logistics and mobility operations'
            },
            services: {
                create: [
                    {
                        title: 'Transportation',
                        slug: 'transportation',
                        description: 'Reliable and tracked transportation services for critical deliveries.',
                        capabilities: { details: ['FTL & LTL', 'Last Mile Delivery', 'Cold Chain'] },
                        media: {
                            url: '/images/services/logistics-placeholder.svg',
                            type: 'PLACEHOLDER',
                            altText: 'Conceptual visualization of logistics and mobility operations'
                        }
                    }
                ]
            }
        }
    });
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
