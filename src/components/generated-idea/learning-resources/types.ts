export interface TechStackVideo {
  title: string;
  url: string;
  description: string;
}

export const techStackVideos: Record<string, TechStackVideo[]> = {
  "React": [
    {
      title: "React JS Full Course 2024",
      url: "https://www.youtube.com/watch?v=RVFAyFWO4go",
      description: "Comprehensive React course covering fundamentals to advanced concepts"
    },
    {
      title: "React JS Crash Course 2024",
      url: "https://www.youtube.com/watch?v=u6gSSpfsoOQ",
      description: "Quick but thorough introduction to React development"
    }
  ],
  "Next.js": [
    {
      title: "Next.js Full Course 2024",
      url: "https://www.youtube.com/watch?v=ZVnjOPwW4ZA",
      description: "Complete Next.js tutorial from basics to deployment"
    },
    {
      title: "Next.js App Router Full Course",
      url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
      description: "Learn Next.js 13/14 App Router and Server Components"
    }
  ],
  "TypeScript": [
    {
      title: "TypeScript Full Course",
      url: "https://www.youtube.com/watch?v=30LWjhZzg50",
      description: "Complete TypeScript tutorial for beginners"
    },
    {
      title: "TypeScript Crash Course",
      url: "https://www.youtube.com/watch?v=BCg4U1FzODs",
      description: "Quick introduction to TypeScript fundamentals"
    }
  ],
  "Tailwind CSS": [
    {
      title: "Tailwind CSS Full Course 2024",
      url: "https://www.youtube.com/watch?v=lCxcTsOHrjo",
      description: "Learn Tailwind CSS from scratch to advanced"
    },
    {
      title: "Tailwind CSS Crash Course",
      url: "https://www.youtube.com/watch?v=UBOj6rqRUME",
      description: "Quick introduction to Tailwind CSS basics"
    }
  ]
};