const { PrismaClient } = require('@prisma/client');
const { copyFileSync } = require('fs');
const { join, resolve } = require('path');
const { path, android } = require('./config.js');
const logger = require('log4js').getLogger('transfer');
logger.level = 'info';

copyFileSync(path, android);
logger.info('copy done');

const prisma = new PrismaClient({
  datasources: { db: { url: `file:${join(resolve(android))}` } },
});

async function task() {
  const tagList = (
    await prisma.tag.findMany({ where: { name: { in: ['R18', 'R18G'] } } })
  ).map(tag => tag.id);
  const artList = (
    await prisma['tagged'].findMany({ where: { tagId: { in: tagList } } })
  ).map(tagged => tagged.artId);
  await prisma['tagged'].deleteMany({
    where: { OR: [{ artId: { in: artList } }, { tagId: { in: tagList } }] },
  });
  await prisma.article.deleteMany({ where: { id: { in: artList } } });
  await prisma.tag.deleteMany({ where: { id: { in: tagList } } });
  logger.info('clean done');
  await prisma.$queryRaw`vacuum;`;
  logger.info('vacuum done');
}

task().then(async () => {
  await prisma.$disconnect();
  logger.info('task done');
});