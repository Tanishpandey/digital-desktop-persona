export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  image: string;
  logo?: string;
  description?: string;
  isLiked?: boolean;
  bullets?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tech: string;
  logo?: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  bullets?: string[];
  isFavorited?: boolean;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: string;
  logo?: string;
  yearsExperience?: number;
  isFavorited?: boolean;
}

export interface QueueItem {
  id: string;
  type: 'experience' | 'project' | 'goal' | 'achievement';
  title: string;
  subtitle: string;
  duration?: string;
  logo?: string;
  isLiked?: boolean;
  status?: 'completed' | 'in-progress' | 'planned';
  lastPlayed?: string;
}

export const resumeData = {
  profile: {
    name: "Tanish Pandey",
    title: "Software Engineer",
    avatar: "/placeholder.svg",
    location: "University Park, PA",
    email: "tanishpandey3@gmail.com",
    phone: "814-441-1723",
    linkedin: "linkedin.com/in/tanishpandey",
    github: "github.com/tanishpandey",
    gpa: "3.70/4.00"
  },

  experience: [
    {
      id: '1',
      title: 'Software Engineer Intern',
      artist: 'Genesys',
      album: 'May 2025 - Present',
      duration: '8m+',
      image: '/placeholder.svg',
      logo: '/company-logos/genesys.png',
      description: 'Architected high-scale serverless data platform processing 10M+ daily call records, cutting latency by 93% (30s to 2s) using AWS Lambda, DynamoDB and S3.',
      isLiked: true,
      bullets: [
        'Architected a high-scale serverless data platform processing 10M+ daily call records using multithreaded query chunking, cutting latency by 93% (30s to 2s) and enabling real-time analytics with AWS Lambda, DynamoDB and S3',
        'Implemented a production-grade React + TypeScript dashboard to visualize real-time product usage across regions, from New Relic data stored in DynamoDB, empowering 10+ teams to track key metrics',
        'Optimized distributed system efficiency through advanced parallel processing, DynamoDB pagination, and region-aware query optimization, delivering sub-second analytics on millions of telecom events'
      ]
    },
    {
      id: '2',
      title: 'Tech Insights Summer School',
      artist: 'Bloomberg',
      album: 'June 2025 - Present',
      duration: '6m+',
      image: '/placeholder.svg',
      logo: '/company-logos/bloomberg.png',
      description: 'Collaborated with Bloomberg engineers to tackle complex algorithmic problems, improving code efficiency and readability through iterative feedback.',
      isLiked: true,
      bullets: [
        'Collaborated closely with Bloomberg engineers and mentors to tackle complex algorithmic problems, improving both the efficiency and readability of code through iterative feedback',
        'Incorporated expert feedback to architect clean, scalable solutions within a fast-paced, mentorship-driven environment'
      ]
    },
    {
      id: '3',
      title: 'Software Engineer Intern',
      artist: 'Lynk Global',
      album: 'May 2024 - August 2024',
      duration: '4m',
      image: '/placeholder.svg',
      logo: '/company-logos/lynk-global.png',
      description: 'Automated end-to-end CI/CD testing pipeline for satellite messaging systems, reducing manual QA by 90% (400+ hours/year).',
      isLiked: true,
      bullets: [
        'Automated end-to-end CI/CD testing pipeline for satellite messaging systems, reducing manual QA by 90% (400+ hours/year) and improving testing efficiency',
        'Simulated message sending on 50+ devices using Python threading and implemented 200+ test cases, boosting coverage and database reliability',
        'Engineered unit tests for MongoDB, PostgreSQL, MySQL, and C++ ground station databases with Google Test Suite, cutting data retrieval errors by 45%'
      ]
    },
    {
      id: '4',
      title: 'Research Assistant',
      artist: 'Penn State University',
      album: 'December 2023 - October 2024',
      duration: '11m',
      image: '/placeholder.svg',
      logo: '/company-logos/penn-state.png',
      description: 'Developed Python-based Glassdoor web scraper extracting 5,000+ company reviews, contributing to 80% improvement in predictive model accuracy.',
      isLiked: false,
      bullets: [
        'Extracted over 5,000 company reviews by developing a Python-based Glassdoor web scraper in collaboration with a professor, enhancing data availability for analysis',
        'Contributed to an 80% improvement in the accuracy of the study\'s predictive models by developing a web scraper that gathered weather data from 100+ locations'
      ]
    }
  ] as Track[],

  projects: [
    {
      id: '1',
      name: 'DisasterAlert',
      description: 'Tailored AI Alerts',
      image: '/placeholder.svg',
      tech: 'TypeScript • Node.js • MongoDB • Vonage API • AI',
      logo: '/project-logos/disaster-alert.png',
      thumbnail: '/project-thumbs/disaster-alert.jpg',
      githubUrl: 'https://github.com/tanishpandey/disaster-alert',
      liveUrl: 'https://disaster-alert-demo.com',
      isFavorited: true,
      bullets: [
        'Built scalable REST APIs to integrate generative AI algorithms for real-time disaster alert classification and prioritization, focusing on cloud-native technologies',
        'Enhanced MongoDB queries to handle large datasets, ensuring system reliability and performance under high traffic',
        'Integrated real-time updates to improve the system\'s efficiency and user interaction, aligning with DigitalOcean\'s mission to streamline cloud-based solutions'
      ]
    },
    {
      id: '2',
      name: 'ReservePlate',
      description: 'Food Redistribution Platform',
      image: '/placeholder.svg',
      tech: 'HTML/CSS • React • Node • MongoDB • JavaScript',
      logo: '/project-logos/reserve-plate.png',
      thumbnail: '/project-thumbs/reserve-plate.jpg',
      githubUrl: 'https://github.com/tanishpandey/reserve-plate',
      liveUrl: 'https://reserve-plate-demo.com',
      isFavorited: true,
      bullets: [
        'Built a user-friendly platform for food redistribution, featuring React-based front-end interfaces and robust backend APIs using Node.js',
        'Designed geolocation-based filtering to allow users to discover nearby food offers in real time, enhancing accessibility',
        'Improved scalability and reliability by employing modern React workflows and database optimizations in MongoDB'
      ]
    },
    {
      id: '3',
      name: 'Spotify Portfolio',
      description: 'Interactive resume website',
      image: '/placeholder.svg',
      tech: 'React • TypeScript • Tailwind CSS',
      logo: '/project-logos/spotify-portfolio.png',
      thumbnail: '/project-thumbs/spotify-portfolio.jpg',
      githubUrl: 'https://github.com/tanishpandey/spotify-portfolio',
      liveUrl: 'https://tanish-portfolio.com',
      isFavorited: false,
      bullets: [
        'Created modern, interactive resume website mimicking Spotify\'s design and UX patterns',
        'Implemented dark theme with responsive design and smooth animations for enhanced user experience',
        'Built reusable components with TypeScript for type safety and maintainability',
        'Used Tailwind CSS for consistent design system and beautiful styling'
      ]
    }
  ] as Project[],

  skills: [
    { name: 'Python', proficiency: 95, category: 'Languages', logo: '/tech-logos/python.svg', yearsExperience: 4, isFavorited: true },
    { name: 'JavaScript', proficiency: 92, category: 'Languages', logo: '/tech-logos/javascript.svg', yearsExperience: 3, isFavorited: true },
    { name: 'TypeScript', proficiency: 88, category: 'Languages', logo: '/tech-logos/typescript.svg', yearsExperience: 2, isFavorited: true },
    { name: 'C/C++', proficiency: 85, category: 'Languages', logo: '/tech-logos/cpp.svg', yearsExperience: 3, isFavorited: false },
    { name: 'Java', proficiency: 82, category: 'Languages', logo: '/tech-logos/java.svg', yearsExperience: 2, isFavorited: false },
    
    { name: 'React', proficiency: 90, category: 'Frameworks', logo: '/tech-logos/react.svg', yearsExperience: 3, isFavorited: true },
    { name: 'Node.js', proficiency: 88, category: 'Frameworks', logo: '/tech-logos/nodejs.svg', yearsExperience: 3, isFavorited: true },
    { name: 'Express', proficiency: 85, category: 'Frameworks', logo: '/tech-logos/express.svg', yearsExperience: 2, isFavorited: false },
    { name: 'Selenium', proficiency: 80, category: 'Frameworks', logo: '/tech-logos/selenium.svg', yearsExperience: 2, isFavorited: false },
    { name: 'NumPy', proficiency: 85, category: 'Frameworks', logo: '/tech-logos/numpy.svg', yearsExperience: 3, isFavorited: false },
    { name: 'PyTorch', proficiency: 75, category: 'Frameworks', logo: '/tech-logos/pytorch.svg', yearsExperience: 1, isFavorited: false },
    
    { name: 'AWS Lambda', proficiency: 85, category: 'Cloud', logo: '/tech-logos/aws-lambda.svg', yearsExperience: 2, isFavorited: true },
    { name: 'DynamoDB', proficiency: 80, category: 'Cloud', logo: '/tech-logos/dynamodb.svg', yearsExperience: 1, isFavorited: false },
    { name: 'MongoDB', proficiency: 85, category: 'Databases', logo: '/tech-logos/mongodb.svg', yearsExperience: 3, isFavorited: true },
    { name: 'PostgreSQL', proficiency: 88, category: 'Databases', logo: '/tech-logos/postgresql.svg', yearsExperience: 2, isFavorited: true },
    { name: 'MySQL', proficiency: 82, category: 'Databases', logo: '/tech-logos/mysql.svg', yearsExperience: 2, isFavorited: false },
    
    { name: 'Docker', proficiency: 80, category: 'Tools', logo: '/tech-logos/docker.svg', yearsExperience: 2, isFavorited: false },
    { name: 'Git', proficiency: 90, category: 'Tools', logo: '/tech-logos/git.svg', yearsExperience: 4, isFavorited: true },
    { name: 'Jira', proficiency: 75, category: 'Tools', logo: '/tech-logos/jira.svg', yearsExperience: 2, isFavorited: false },
    { name: 'CI/CD', proficiency: 78, category: 'Tools', logo: '/tech-logos/cicd.svg', yearsExperience: 2, isFavorited: false },
    { name: 'New Relic', proficiency: 70, category: 'Tools', logo: '/tech-logos/new-relic.svg', yearsExperience: 1, isFavorited: false }
  ] as Skill[],

  education: [
    {
      id: '1',
      institution: 'Penn State University',
      degree: 'B.S. Computer Science, Mathematics',
      duration: 'Expected December 2026',
      gpa: '3.70/4.00',
      logo: '/company-logos/penn-state.png',
      coursework: [
        'Data Structures and Algorithms',
        'Object-Oriented Programming',
        'Machine Learning',
        'AWS and Big Data'
      ]
    }
  ],

  recentlyPlayed: [
    {
      id: '1',
      type: 'project' as const,
      title: 'DisasterAlert',
      subtitle: 'AI-powered disaster alerts',
      duration: '3 months',
      lastPlayed: '2 days ago',
      logo: '/project-logos/disaster-alert.png',
      isLiked: true,
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'achievement' as const,
      title: 'High-Scale Data Platform',
      subtitle: 'Processed 10M+ daily records',
      duration: 'at Genesys',
      lastPlayed: '1 week ago',
      logo: '/company-logos/genesys.png',
      isLiked: true,
      status: 'completed' as const
    },
    {
      id: '3',
      type: 'experience' as const,
      title: 'Software Engineer Intern',
      subtitle: 'Lynk Global',
      duration: '4 months',
      lastPlayed: 'Last year',
      logo: '/company-logos/lynk-global.png',
      isLiked: true,
      status: 'completed' as const
    }
  ] as QueueItem[],

  upcomingGoals: [
    {
      id: '1',
      type: 'goal' as const,
      title: 'AWS Solutions Architect Cert',
      subtitle: 'Cloud certification',
      duration: 'Q1 2025',
      status: 'planned' as const,
      isLiked: false
    },
    {
      id: '2',
      type: 'goal' as const,
      title: 'Open Source Contribution',
      subtitle: 'React ecosystem',
      duration: 'Q2 2025',
      status: 'planned' as const,
      isLiked: true
    },
    {
      id: '3',
      type: 'goal' as const,
      title: 'Tech Conference Speaking',
      subtitle: 'Share knowledge',
      duration: 'Q3 2025',
      status: 'planned' as const,
      isLiked: false
    },
    {
      id: '4',
      type: 'goal' as const,
      title: 'Full-time Software Engineer',
      subtitle: 'Post-graduation role',
      duration: 'December 2026',
      status: 'planned' as const,
      isLiked: true
    }
  ] as QueueItem[],

  favorites: {
    topProjects: [
      {
        id: '1',
        title: 'DisasterAlert',
        description: 'AI-powered disaster alert system',
        tech: ['TypeScript', 'Node.js', 'MongoDB', 'AI'],
        thumbnail: '/project-thumbs/disaster-alert.jpg',
        logo: '/tech-logos/typescript.svg',
        githubUrl: 'https://github.com/tanishpandey/disaster-alert',
        liveUrl: 'https://disaster-alert-demo.com',
        isFavorited: true
      },
      {
        id: '2',
        title: 'ReservePlate',
        description: 'Food redistribution platform',
        tech: ['React', 'Node.js', 'MongoDB'],
        thumbnail: '/project-thumbs/reserve-plate.jpg',
        logo: '/tech-logos/react.svg',
        githubUrl: 'https://github.com/tanishpandey/reserve-plate',
        liveUrl: 'https://reserve-plate-demo.com',
        isFavorited: true
      }
    ],
    topSkills: [
      {
        name: 'Python',
        proficiency: 95,
        logo: '/tech-logos/python.svg',
        yearsExperience: 4,
        isFavorited: true
      },
      {
        name: 'React',
        proficiency: 90,
        logo: '/tech-logos/react.svg',
        yearsExperience: 3,
        isFavorited: true
      },
      {
        name: 'JavaScript',
        proficiency: 92,
        logo: '/tech-logos/javascript.svg',
        yearsExperience: 3,
        isFavorited: true
      }
    ],
    topAchievements: [
      {
        title: 'Reduced latency by 93%',
        company: 'Genesys',
        year: 2025,
        logo: '/company-logos/genesys.png',
        isFavorited: true
      },
      {
        title: 'Automated CI/CD pipeline',
        company: 'Lynk Global',
        year: 2024,
        logo: '/company-logos/lynk-global.png',
        isFavorited: true
      }
    ]
  }
};