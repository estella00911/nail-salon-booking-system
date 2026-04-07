import { Tag } from '../src/generated/prisma/client.js';
import { pool, prisma } from '../src/lib/prisma.js';

async function main() {
  // users ========
  const admin = await prisma.user.upsert({
    where : {email: "admin@prisma.io"},
    update: {},
    create: {
      email: "admin@prisma.io",
      password: "$2b$10$tAmQ2noL8w7ikykxmmSkyO7hA/qRiP0/TjYFhp2yoSdn4q2eJAllS",
      name: 'Admin',
      role: 'ADMIN'
    }
  })
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      password: "$2b$10$xeAYpfDKlncbdqBQwqc/Xu1FraS/p6XRiwVSMJQoSAlOrEh/TaZ7a",
      name: "Alice"
    }
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      password: "$2b$10$TCSdbleqo0Odb5LApbKazeFdHDT8TikYUROJpfkekZdzTJUgbqRMe",
      name: "Bob",
    }
  });
  const Mia = await prisma.user.upsert({
    where: { email: "mia@prisma.io" },
    update: {},
    create: {
      email: "mia@prisma.io",
      password: "$2b$10$RzSREjPwbO9zo4nmFl84r.Zt4KT9pxIYTyPrhpp45LZlesQ10bVp2",
      name: "Mia",
      role: 'ARTIST'
    }
  });
  // tags ========
  await prisma.tag.createMany({
    data: [
      { name: '韓式簡約', displayOrder: 1, type: 'STYLE', slug: 'kr-simple'},
      { name: '日系可愛', displayOrder: 3, type: 'STYLE', slug: 'jp-cute'},
      { name: '歐美個性', displayOrder: 2, type: 'STYLE', slug: 'eu-personality'},
      { name: '氣質裸色', displayOrder: 4, type: 'STYLE', slug: 'nude-color'},
      { name: '可愛插畫', displayOrder: 5, type: 'STYLE', slug: 'cute-illustration'},
      { name: '貓眼', type: 'TECHNIQUE', slug: 'cat-eye'},
      { name: '法式', type: 'TECHNIQUE', slug: 'french'},
      { name: '延甲', type: 'TECHNIQUE', slug: 'extension'},
      { name: '漸層', type: 'TECHNIQUE', slug: 'ombre'},
      { name: '手繪', type: 'TECHNIQUE', slug: 'illustration'},
      { name: '貼鑽', type: 'TECHNIQUE', slug: 'bling'},
    ],
    skipDuplicates: true,
  });

  const tags: Tag[] = await prisma.tag.findMany();

  const getTagId = (name: string) => {
    const tag = tags.find((t) => t.name === name);
    if (!tag) {
      throw new Error(`Tag not found: ${name}`);
    }
    return tag.id;
  };
  // services ====
  const service1 = await prisma.service.upsert({
    where: { name: '日系可愛插畫' },
    update: {},
    create: {
      name: "日系可愛插畫",
      isFeatured: true,
      featureOrder: 1,
      durationMin: 60,
      basePrice: 900,
      imgUrl: "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      shortDescription: "日系可愛繪畫風設計",
      isActive: true,
      artistId: 4,
    }
  })
  const service2 = await prisma.service.upsert({
    where: { name: '氣質法式'},
    update: {},
    create: {
      name: "氣質法式",
      isFeatured: true,
      featureOrder: 2,
      durationMin: 90,
      basePrice: 1200,
      imgUrl: "https://images.unsplash.com/photo-1667207229737-0adf3c700d5e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      shortDescription: "簡約氣質法式設計",
      isActive: true,
      artistId: 4,
    }
  })
  const service3 = await prisma.service.upsert({
    where: { name: '自然延甲'},
    update: {},
    create: {
      name: "自然延甲",
      isFeatured: true,
      featureOrder: 3,
      durationMin: 90,
      basePrice: 1200,
      imgUrl: "https://images.unsplash.com/photo-1553375385-2d9820966cdb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      shortDescription: "自然款延甲設計",
      isActive: true,
      artistId: 4,
    }
  })
  // serviceTag
  await prisma.serviceTag.createMany({
    data: [
      { serviceId: service1.id, tagId: getTagId("手繪") },
      { serviceId: service1.id, tagId: getTagId("日系可愛") },

      { serviceId: service2.id, tagId: getTagId("法式") },
      { serviceId: service2.id, tagId: getTagId("氣質裸色") },

      { serviceId: service3.id, tagId: getTagId("延甲") },
      { serviceId: service3.id, tagId: getTagId("韓式簡約") },
    ],
    skipDuplicates: true,
  })
  // availabilitites
  await prisma.availability.createMany({
    data: [
      {artistId: 4, startTime: new Date("2026-04-16T01:00:00.000Z"), endTime: new Date("2026-04-16T19:00:00.000Z"),},
      {artistId: 4, startTime: new Date("2026-04-17T01:00:00.000Z"), endTime: new Date("2026-04-17T10:00:00.000Z"),},
    ]
  })
  
  // bookings
  await prisma.booking.createMany({
    data: [
      {userId: 3, serviceId: 1, artistId: 4, startTime: "2026-04-16T03:00:00.000Z", endTime: "2026-04-16T04:00:00.000Z", finalDuration: 60, finalPrice: 900},
      {userId: 3, serviceId: 2, artistId: 4, startTime: "2026-04-16T11:00:00.000Z", endTime: "2026-04-16T12:30:00.000Z", finalDuration: 90, finalPrice: 1200},
      {userId: 3, serviceId: 2, artistId: 4, startTime: "2026-04-16T09:00:00.000Z", endTime: "2026-04-16T10:30:00.000Z", finalDuration: 90, finalPrice: 1200},
      {userId: 2, serviceId: 1, artistId: 4, startTime: "2026-04-16T07:00:00.000Z", endTime: "2026-04-16T08:00:00.000Z", finalDuration: 60, finalPrice: 900},
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });