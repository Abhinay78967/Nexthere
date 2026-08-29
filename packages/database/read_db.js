const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const leads = await prisma.lead.findMany();
  console.log('Leads:', leads.map(l => ({ id: l.id, email: l.email })));
  
  const inquiries = await prisma.inquiry.findMany();
  console.log('Inquiries:', inquiries.map(i => ({ id: i.id, subject: i.subject })));
}
main().finally(() => prisma.$disconnect());
