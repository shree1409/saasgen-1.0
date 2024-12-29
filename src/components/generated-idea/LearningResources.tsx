import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, ExternalLink } from "lucide-react";

interface TechStackVideo {
  title: string;
  url: string;
  description: string;
}

const techStackVideos: Record<string, TechStackVideo[]> = {
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

interface LearningResourcesProps {
  techStack: string;
}

const LearningResources = ({ techStack }: LearningResourcesProps) => {
  const getRelevantVideos = (techStack: string) => {
    const technologies = techStack.toLowerCase().split(/[,\s]+/);
    const videos: TechStackVideo[] = [];
    
    Object.entries(techStackVideos).forEach(([tech, techVideos]) => {
      if (technologies.some(t => tech.toLowerCase().includes(t))) {
        videos.push(...techVideos);
      }
    });
    
    return videos;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Learning Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getRelevantVideos(techStack).map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border hover:shadow-lg transition-shadow bg-card/50 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold flex-1">{video.title}</h3>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground">
                {video.description}
              </p>
              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <Youtube className="w-3 h-3" />
                <span>Click to watch on YouTube</span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Pro Tip
          </h4>
          <p className="text-sm text-muted-foreground">
            Watch these tutorials in the suggested order for the best learning experience. Start with crash courses for quick overview, then dive into full courses for in-depth understanding.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningResources;