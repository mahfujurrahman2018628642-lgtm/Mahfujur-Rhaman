import { GraphicItem, VideoItem, TrainingStage } from '../types.ts';

export const USER_INFO = {
  name: 'MAHFUJUR RAHMAN',
  title: 'Video Editor & Graphic Designer',
  badge: 'Creative Portfolio',
  shortIntro:
    'I’m a passionate Video Editor and Graphic Designer focused on turning ideas into engaging visual experiences. I’m constantly learning, practicing, and exploring new creative techniques to make every project better.',
  email: 'mahfujurrahmansbmc@gmail.com',
  whatsappRaw: '01829826160',
  whatsappFormatted: '+8801829826160',
  whatsappLink: 'https://wa.me/8801829826160',
  facebook: 'https://www.facebook.com/share/1FU19i662s/',
  behance: 'https://www.behance.net/mahfujurrahman120',
  avatarLocal: 'profile.jpg',
  avatarPostimg: 'https://postimg.cc/8Fs7XF2p',
  avatarDirect: 'https://i.postimg.cc/cJBfHwTn/3707-MAHFUJUR-RAHMAN.jpg',
  honestBio:
    'I am a passionate Video Editor and Graphic Designer who is dedicated to learning, practicing, and improving every day. Over the past three months, I have been actively developing my skills in video editing while exploring creative design and visual storytelling. I spend time practicing regularly, learning new techniques, and challenging myself to create better and more engaging work. I believe consistent practice, curiosity, and a willingness to learn are essential for creative growth. Although I am still at an early stage of my professional journey, I bring genuine dedication, fresh creativity, and a strong desire to improve with every project. My goal is to continue developing myself as a creative professional and create meaningful visual work that people remember.',
  journeyTitle: 'My Creative Journey',
  journeySubtitle: '3-Month Skill Development Journey',
  journeyDescription:
    'Over the past three months, I have focused on learning, practicing, and developing my skills in video editing and graphic design. This learning journey has helped me build a stronger understanding of visual communication, creative design, and video content creation. I am continuing to practice and improve through new projects and regular learning.',
  contactHeading: 'Let’s Connect',
  contactSubtext:
    'I’m always interested in learning, creating, and taking on opportunities where I can contribute, grow, and develop my creative skills.',
};

export const FEATURED_VIDEO: VideoItem = {
  id: 'featured-work',
  youtubeId: 'hla0AZEVCkE',
  title: 'Featured Work',
  category: 'Featured Video',
  aspectRatio: '16:9',
  description: 'Featured creative cut showcasing video editing and visual pacing.',
  originalUrl: 'https://www.youtube.com/shorts/hla0AZEVCkE',
  embedUrl: 'https://www.youtube.com/embed/hla0AZEVCkE',
};

export const PORTFOLIO_VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    youtubeId: 'MF9G8jK2sx0',
    title: 'Video Editing Work 01',
    category: 'Video Editing',
    description: 'Video editing work focusing on pacing and visual arrangement.',
    originalUrl: 'https://www.youtube.com/watch?v=MF9G8jK2sx0',
    embedUrl: 'https://www.youtube.com/embed/MF9G8jK2sx0',
  },
  {
    id: 'video-2',
    youtubeId: 'TxHoFUIeFPM',
    title: 'Video Editing Work 02',
    category: 'Video Editing',
    description: 'Video editing work exploring motion timing and visual cuts.',
    originalUrl: 'https://www.youtube.com/watch?v=TxHoFUIeFPM',
    embedUrl: 'https://www.youtube.com/embed/TxHoFUIeFPM',
  },
  {
    id: 'video-3',
    youtubeId: 'llEUzJs9aZw',
    title: 'Video Editing Work 03',
    category: 'Video Editing',
    description: 'Video editing work featuring sound and visual synchronization.',
    originalUrl: 'https://www.youtube.com/watch?v=llEUzJs9aZw&t=8s',
    embedUrl: 'https://www.youtube.com/embed/llEUzJs9aZw',
  },
  {
    id: 'video-4',
    youtubeId: 'yDbSUkmxbR0',
    title: 'Video Editing Work 04',
    category: 'Video Editing',
    description: 'Video editing work with creative visual composition.',
    originalUrl: 'https://youtu.be/yDbSUkmxbR0?si=9nSrnE-gbQU3RzJS',
    embedUrl: 'https://www.youtube.com/embed/yDbSUkmxbR0',
  },
];

export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    id: 'graphic-1',
    title: 'Graphic 01',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic1.jpg',
    postimgUrl: 'https://postimg.cc/PN1P7nR1',
    directSrc: 'https://i.postimg.cc/FFB379bC/graphic1.png',
    description: 'Graphic design poster showcasing layout composition and visual balance.',
  },
  {
    id: 'graphic-2',
    title: 'Graphic 02',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic2.jpg',
    postimgUrl: 'https://postimg.cc/tYyYQvKV',
    directSrc: 'https://i.postimg.cc/654RZDzz/graphic3.jpg',
    description: 'Graphic design poster exploring typography and focal contrast.',
  },
  {
    id: 'graphic-3',
    title: 'Graphic 03',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic3.jpg',
    postimgUrl: 'https://postimg.cc/CzYzTr3j',
    directSrc: 'https://i.postimg.cc/qM6nK9QZ/graphic4.jpg',
    description: 'Graphic design poster with creative framing and thematic styling.',
  },
  {
    id: 'graphic-4',
    title: 'Graphic 04',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic4.jpg',
    postimgUrl: 'https://postimg.cc/hfgfWZkx',
    directSrc: 'https://i.postimg.cc/L6gfPrvy/graphic2.jpg',
    description: 'Graphic design poster with color balance and visual arrangement.',
  },
  {
    id: 'graphic-5',
    title: 'Graphic 05',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic5.jpg',
    postimgUrl: 'https://postimg.cc/LnRnKQcP',
    directSrc: 'https://i.postimg.cc/02KmSLZV/graphic5.jpg',
    description: 'Graphic design poster focusing on atmospheric tones and depth.',
  },
  {
    id: 'graphic-6',
    title: 'Graphic 06',
    category: 'Graphic & Poster Designs',
    localSrc: 'graphic6.jpg',
    postimgUrl: 'https://postimg.cc/D8F8kp91',
    directSrc: 'https://i.postimg.cc/5NQvzZpK/graphic6.jpg',
    description: 'Graphic design poster with clean graphic layers and bold contrast.',
  },
];

export const TRAINING_JOURNEY: TrainingStage[] = [
  {
    month: 'Month 1',
    title: 'Fundamentals & Software Basics',
    points: [
      'Understanding timeline editing',
      'Learning basic cuts, transitions, and clip organization',
      'Introduction to graphic design basics, composition, and color contrast',
    ],
  },
  {
    month: 'Month 2',
    title: 'Practice & Skill Building',
    points: [
      'Practicing pacing, audio synchronization, and b-roll placement',
      'Designing social media posters, thumbnails, and cover art',
      'Learning how to improve visual clarity and viewer engagement',
    ],
  },
  {
    month: 'Month 3',
    title: 'Project Work & Portfolio Creation',
    points: [
      'Creating complete video edits from concept to final export',
      'Refining poster layouts and visual balance',
      'Assembling this portfolio to showcase real, practical learning progress',
    ],
  },
];


