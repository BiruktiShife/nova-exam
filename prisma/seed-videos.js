// prisma/seed-videos.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding video data...');

  // Clear existing video data
  await prisma.video.deleteMany();

  // Seed videos (only title, youtubeUrl, and custom description)
  const videos = [
    {
      title: "TOEFL Speaking Test - Full Practice with Answers",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs",
      description: "Complete TOEFL speaking practice test with detailed answers and scoring tips to improve your speaking skills."
    },
    {
      title: "TOEFL Writing Task 1 - Integrated Essay",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs", 
      description: "Learn how to structure and write effective integrated essays for TOEFL writing task 1 with practical examples."
    },
    {
      title: "TOEFL Reading Section Strategies",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs",
      description: "Master TOEFL reading comprehension with proven strategies and time management techniques."
    },
    {
      title: "TOEFL Listening Practice Test",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs",
      description: "Full TOEFL listening practice test with authentic questions and detailed explanations."
    },
    {
      title: "TOEFL Test Day Tips and Strategies",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs",
      description: "Essential tips and strategies to help you perform your best on TOEFL test day."
    },
    {
      title: "TOEFL Vocabulary for High Scores",
      youtubeUrl: "https://www.youtube.com/watch?v=KeGmOmvzcOs",
      description: "Build your TOEFL vocabulary with high-frequency words and practical usage examples."
    }
  ];

  for (const video of videos) {
    await prisma.video.create({
      data: video
    });
    console.log(`Created video: ${video.title}`);
  }

  console.log('Video seeding finished!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });