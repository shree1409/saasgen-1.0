import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Youtube, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneratedIdea {
  websiteName: string;
  description: string;
  keyFeatures: string[];
  monetizationStrategy: string[];
  techStack: string;
  timelineBreakdown: string;
  marketPotential: string;
}

interface TechStackVideo {
  title: string;
  url: string;
  description: string;
}

const techStackVideos: Record<string, TechStackVideo[]> = {
  "React": [
    {
      title: "React Crash Course",
      url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
      description: "Learn React fundamentals and build projects"
    },
    {
      title: "React in 100 Seconds",
      url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
      description: "Quick overview of React's core concepts"
    }
  ],
  "Next.js": [
    {
      title: "Next.js for Beginners",
      url: "https://www.youtube.com/watch?v=1WmNXEVia8I",
      description: "Complete Next.js tutorial for beginners"
    }
  ],
  "TypeScript": [
    {
      title: "TypeScript Course",
      url: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
      description: "TypeScript crash course for beginners"
    }
  ],
  "Tailwind CSS": [
    {
      title: "Tailwind CSS Tutorial",
      url: "https://www.youtube.com/watch?v=UBOj6rqRUME",
      description: "Learn Tailwind CSS basics and advanced concepts"
    }
  ]
};

const GeneratedIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const generatedIdea = location.state?.generatedIdea as GeneratedIdea;

  if (!generatedIdea) {
    navigate('/');
    return null;
  }

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
    <div className="container px-4 py-8 max-w-6xl">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Generator
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass-panel rounded-2xl p-8 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {generatedIdea.websiteName}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {generatedIdea.description}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedIdea.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-800 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monetization Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {generatedIdea.monetizationStrategy.map((strategy, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">{strategy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Recommended Tech Stack</h3>
                <p className="text-muted-foreground">{generatedIdea.techStack}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Development Timeline</h3>
                <p className="text-muted-foreground">{generatedIdea.timelineBreakdown}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {generatedIdea.marketPotential}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getRelevantVideos(generatedIdea.techStack).map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-lg border hover:shadow-lg transition-shadow duration-200 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <h3 className="font-semibold">{video.title}</h3>
                      <ExternalLink className="w-4 h-4 ml-auto text-gray-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default GeneratedIdea;