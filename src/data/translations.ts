export type Language = 'en' | 'bn';

export interface Translations {
  nav: {
    about: string;
    journey: string;
    videoWork: string;
    graphicWork: string;
    contact: string;
  };
  hero: {
    badge: string;
    status: string;
    role: string;
    shortIntro: string;
    featuredWorkBtn: string;
    whatsappBtn: string;
    emailBtn: string;
    featuredSectionTitle: string;
    openYouTube: string;
    clickToPlay: string;
    watchOnYouTube: string;
  };
  videos: {
    title: string;
    subtitle: string;
    countBadge: string;
    watchBtn: string;
  };
  graphics: {
    title: string;
    subtitle: string;
    countBadge: string;
    posterStudy: string;
    viewBtn: string;
    clickToExpand: string;
  };
  about: {
    title: string;
    bio: string;
  };
  journey: {
    title: string;
    badge: string;
    description: string;
    skillMilestone: string;
    stages: {
      month: string;
      title: string;
      points: string[];
    }[];
  };
  contact: {
    sectionTitle: string;
    cardTitle: string;
    cardSubtitle: string;
    emailLabel: string;
    copyBtn: string;
    copiedBtn: string;
    whatsappLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailInputPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    preparingEmail: string;
  };
  footer: {
    role: string;
    rights: string;
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      journey: 'Journey',
      videoWork: 'Video Work',
      graphicWork: 'Graphic Work',
      contact: 'Contact',
    },
    hero: {
      badge: 'Creative Portfolio',
      status: 'Actively Learning & Practicing',
      role: 'Video Editor & Graphic Designer',
      shortIntro:
        'I’m a passionate Video Editor and Graphic Designer focused on turning ideas into engaging visual experiences. I’m constantly learning, practicing, and exploring new creative techniques to make every project better.',
      featuredWorkBtn: 'Featured Work',
      whatsappBtn: 'WhatsApp',
      emailBtn: 'Email',
      featuredSectionTitle: 'Featured Work',
      openYouTube: 'Open on YouTube',
      clickToPlay: 'Click to play video',
      watchOnYouTube: 'Watch on YouTube',
    },
    videos: {
      title: 'Video Editing Work',
      subtitle: 'Video editing projects exploring pacing, visual rhythm, cuts, and sound synchronization.',
      countBadge: '4 Video Projects',
      watchBtn: 'YouTube',
    },
    graphics: {
      title: 'Graphic & Poster Design',
      subtitle: 'Practical design studies focusing on poster layouts, visual hierarchy, color balance, and typography.',
      countBadge: '6 Poster Designs',
      posterStudy: 'Poster Study',
      viewBtn: 'View',
      clickToExpand: 'Click to expand',
    },
    about: {
      title: 'About Me',
      bio:
        'I am a passionate Video Editor and Graphic Designer who is dedicated to learning, practicing, and improving every day. Over the past three months, I have been actively developing my skills in video editing while exploring creative design and visual storytelling. I spend time practicing regularly, learning new techniques, and challenging myself to create better and more engaging work. I believe consistent practice, curiosity, and a willingness to learn are essential for creative growth. Although I am still at an early stage of my professional journey, I bring genuine dedication, fresh creativity, and a strong desire to improve with every project. My goal is to continue developing myself as a creative professional and create meaningful visual work that people remember.',
    },
    journey: {
      title: 'My Creative Journey',
      badge: '3-Month Skill Development Journey',
      description:
        'Over the past three months, I have focused on learning, practicing, and developing my skills in video editing and graphic design. This learning journey has helped me build a stronger understanding of visual communication, creative design, and video content creation. I am continuing to practice and improve through new projects and regular learning.',
      skillMilestone: 'Skill Milestone',
      stages: [
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
      ],
    },
    contact: {
      sectionTitle: 'Get in Touch',
      cardTitle: "Let's Connect",
      cardSubtitle:
        'I am actively seeking internship opportunities, entry-level positions, and creative collaboration. Reach out anytime.',
      emailLabel: 'Email',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      whatsappLabel: 'WhatsApp',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your name',
      emailInputLabel: 'Your Email',
      emailInputPlaceholder: 'name@example.com',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Describe your project, internship, or role inquiry...',
      sendBtn: 'Send Message',
      preparingEmail: '✓ Preparing email client with your message to',
    },
    footer: {
      role: 'Video Editor & Graphic Designer',
      rights: 'All rights reserved.',
      backToTop: 'Back to Top',
    },
  },
  bn: {
    nav: {
      about: 'সম্পর্কে',
      journey: 'জার্নি',
      videoWork: 'ভিডিও কাজ',
      graphicWork: 'গ্রাফিক ডিজাইন',
      contact: 'যোগাযোগ',
    },
    hero: {
      badge: 'ক্রিয়েটিভ পোর্টফোলিও',
      status: 'নিয়মিত অনুশীলন ও শিখছি',
      role: 'Video Editor & Graphic Designer',
      shortIntro:
        'আমি একজন উদ্যমী ভিডিও এডিটর ও গ্রাফিক ডিজাইনার, যার লক্ষ্য যেকোনো আইডিয়াকে আকর্ষণীয় ভিজ্যুয়াল অভিজ্ঞতায় রূপ দেওয়া। কাজের মান আরও উন্নত করতে আমি প্রতিনিয়ত নতুন নতুন ক্রিয়েটিভ কৌশল শিখছি এবং নিয়মিত অনুশীলন করছি।',
      featuredWorkBtn: 'সেরা কাজ',
      whatsappBtn: 'WhatsApp',
      emailBtn: 'ইমেইল',
      featuredSectionTitle: 'সেরা কাজ (Featured Work)',
      openYouTube: 'YouTube-এ দেখুন',
      clickToPlay: 'ভিডিওটি চালু করতে ক্লিক করুন',
      watchOnYouTube: 'YouTube-এ দেখুন',
    },
    videos: {
      title: 'ভিডিও এডিটিং কাজ',
      subtitle: 'প্যাসিং, ভিজ্যুয়াল রিদম, নিখুঁত কাট এবং সাউন্ড সিঙ্ক্রোনাইজেশনের সমন্বয়ে তৈরি ভিডিও এডিটিং প্রজেক্ট।',
      countBadge: '৪টি ভিডিও প্রজেক্ট',
      watchBtn: 'YouTube',
    },
    graphics: {
      title: 'গ্রাফিক ও পোস্টার ডিজাইন',
      subtitle: 'পোস্টার লেআউট, ভিজ্যুয়াল হায়ারার্কি, রঙের ভারসাম্য এবং টাইপোগ্রাফির ওপর বাস্তবসম্মত ডিজাইন স্টাডি।',
      countBadge: '৬টি পোস্টার ডিজাইন',
      posterStudy: 'পোস্টার স্টাডি',
      viewBtn: 'দেখুন',
      clickToExpand: 'বড় করে দেখতে ক্লিক করুন',
    },
    about: {
      title: 'আমার সম্পর্কে',
      bio:
        'আমি একজন নিবেদিতপ্রাণ ভিডিও এডিটর এবং গ্রাফিক ডিজাইনার, যিনি প্রতিদিন নতুন কিছু শিখতে, অনুশীলন করতে এবং নিজের দক্ষতাকে উন্নত করতে প্রতিশ্রুতিবদ্ধ। গত তিন মাস ধরে আমি ভিডিও এডিটিংয়ে নিজের দক্ষতা বাড়াতে এবং পাশাপাশি ক্রিয়েটিভ ডিজাইন ও ভিজ্যুয়াল স্টোরিটেলিং নিয়ে গভীরভাবে কাজ করছি। আমি নিয়মিত অনুশীলন করি, নতুন কৌশল শিখি এবং প্রতিটি কাজে আরও ভালো ও আকর্ষণীয় কিছু তৈরি করার চ্যালেঞ্জ গ্রহণ করি। আমি বিশ্বাস করি সৃজনশীল বিকাশের জন্য ধারাবাহিক অনুশীলন, কৌতূহল এবং শেখার আগ্রহ অত্যন্ত জরুরি। পেশাগত যাত্রার প্রাথমিক পর্যায়ে থাকলেও, আমি প্রতিটি প্রজেক্টে খাঁটি নিষ্ঠা, সতেজ সৃজনশীলতা এবং উন্নতির তীব্র আকাঙ্ক্ষা নিয়ে কাজ করি। আমার লক্ষ্য একজন ক্রিয়েটিভ প্রফেশনাল হিসেবে নিজেকে প্রতিষ্ঠিত করা এবং এমন অর্থপূর্ণ কাজ তৈরি করা যা মানুষ মনে রাখবে।',
    },
    journey: {
      title: 'আমার সৃজনশীল জার্নি',
      badge: '৩ মাসের স্কিল ডেভেলপমেন্ট জার্নি',
      description:
        'গত তিন মাস ধরে আমি ভিডিও এডিটিং এবং গ্রাফিক ডিজাইনে আমার দক্ষতা শেখা, অনুশীলন এবং বিকাশের ওপর গুরুত্ব দিয়েছি। এই শেখার জার্নি আমাকে ভিজ্যুয়াল কমিউনিকেশন, ক্রিয়েটিভ ডিজাইন এবং ভিডিও কন্টেন্ট তৈরির বিষয়ে আরও গভীর ধারণা তৈরি করতে সাহায্য করেছে। নতুন নতুন প্রজেক্ট এবং নিয়মিত শেখার মাধ্যমে আমি প্রতিনিয়ত নিজেকে উন্নত করছি।',
      skillMilestone: 'দক্ষতার মাইলফলক',
      stages: [
        {
          month: '১ম মাস',
          title: 'মৌলিক বিষয় ও সফটওয়্যার পরিচিতি',
          points: [
            'টাইমলাইন এডিটিংয়ের মৌলিক ধারণা',
            'বেসিক কাট, ট্রানজিশন এবং ক্লিপ গোছানো',
            'গ্রাফিক ডিজাইনের মূল নিয়ম, কম্পোজিশন ও কালার কনট্রাস্ট',
          ],
        },
        {
          month: '২য় মাস',
          title: 'অনুশীলন ও স্কিল বৃদ্ধি',
          points: [
            'প্যাসিং, অডিও সিঙ্ক এবং বি-রোল ব্যবহারের বাস্তব অনুশীলন',
            'সোশ্যাল মিডিয়া পোস্টার, থাম্বনেইল ও কভার আর্ট ডিজাইন',
            'ভিজ্যুয়াল স্পষ্টতা এবং দর্শকের আকর্ষণ ধরে রাখার কৌশল',
          ],
        },
        {
          month: '৩য় মাস',
          title: 'প্রজেক্ট তৈরি ও পোর্টফোলিও গঠন',
          points: [
            'কনসেপ্ট থেকে ফাইনাল এক্সপোর্ট পর্যন্ত পূর্ণাঙ্গ ভিডিও এডিট',
            'পোস্টার লেআউট ও ভিজ্যুয়াল ব্যালেন্স নিখুঁত করা',
            'বাস্তব কাজের অগ্রগতি প্রদর্শনের জন্য এই পোর্টফোলিও সাজানো',
          ],
        },
      ],
    },
    contact: {
      sectionTitle: 'যোগাযোগ করুন',
      cardTitle: 'চলুন যুক্ত হই',
      cardSubtitle:
        'আমি ইন্টার্নশিপের সুযোগ, এন্ট্রি-লেভেল কাজ এবং ক্রিয়েটিভ কোলাবোরেশনের জন্য আগ্রহী। যেকোনো সময় যোগাযোগ করতে পারেন।',
      emailLabel: 'ইমেইল',
      copyBtn: 'কপি',
      copiedBtn: 'কপি হয়েছে',
      whatsappLabel: 'WhatsApp',
      nameLabel: 'আপনার নাম',
      namePlaceholder: 'আপনার নাম লিখুন',
      emailInputLabel: 'আপনার ইমেইল',
      emailInputPlaceholder: 'name@example.com',
      messageLabel: 'আপনার বার্তা',
      messagePlaceholder: 'আপনার প্রজেক্ট, ইন্টার্নশিপ বা কাজের বিষয়ে বিস্তারিত লিখুন...',
      sendBtn: 'বার্তা পাঠান',
      preparingEmail: '✓ আপনার বার্তাটি ইমেইল ক্লায়েন্টে প্রস্তুত করা হচ্ছে:',
    },
    footer: {
      role: 'Video Editor & Graphic Designer',
      rights: 'সর্বস্বত্ব সংরক্ষিত।',
      backToTop: 'উপরে যান',
    },
  },
};
