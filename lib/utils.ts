import { BADGE_CRITERIA } from '@/constants';
import { techMap } from '@/constants/techMap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    'JavaScript is a powerful language for building dynamic, interactive, and modern web applications.',
  typescript:
    'TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.',
  react:
    'React is a popular library for building fast, component-based user interfaces and web applications.',
  nextjs:
    'Next.js is a React framework for building fast, SEO-friendly, and production-grade web applications.',
  nodejs:
    'Node.js is a runtime for building fast and scalable server-side applications using JavaScript.',
  python:
    'Python is a beginner-friendly language known for its versatility and simplicity in various fields.',
  java: 'Java is a versatile, cross-platform language widely used in enterprise and Android development.',
  'c++':
    'C++ is a high-performance language ideal for system programming, games, and large-scale applications.',
  git: 'Git is a version control system that helps developers track changes and collaborate on code efficiently.',
  docker:
    'Docker simplifies app deployment by containerizing environments, ensuring consistency across platforms.',
  mongodb:
    'MongoDB is a flexible NoSQL database ideal for handling unstructured data and scalable applications.',
  mysql:
    'MySQL is a popular open-source relational database management system known for its stability and performance.',
  postgresql:
    'PostgreSQL is a powerful open-source SQL database known for its scalability and robustness.',
  aws: 'Amazon Web Services (AWS) is a cloud computing platform that offers a wide range of services for building, deploying, and managing web and mobile applications.'
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export function getDeviconClassName(techName: string) {
  const normalizedTech = techName.replace(/[ .]/g, '').toLowerCase();

  return techMap[normalizedTech]
    ? `${techMap[normalizedTech]} colored`
    : 'devicon-devicon-plain';
}

export function getTimeStamp(createdAt: Date) {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

export function assignBadges(params: {
  criteria: { type: keyof typeof BADGE_CRITERIA; count: number }[];
}) {
  const badgeCounts: Badges = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
        badgeCounts[level as keyof Badges] += 1;
      }
    });
  });

  return badgeCounts;
}
