import { useState, useEffect } from 'react';
import { TechStackVideo } from "./video-types";
import { techStackVideos } from "./video-data";

export const useVideoMatcher = (techStack: string) => {
  const [videos, setVideos] = useState<TechStackVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findRelevantVideos = () => {
      if (!techStack) {
        setVideos([]);
        setIsLoading(false);
        return;
      }

      const technologies = techStack.toLowerCase().split(/[,\s]+/).map(t => t.trim());
      const foundVideos: TechStackVideo[] = [];

      technologies.forEach(tech => {
        // Try exact match first
        let matchingTech = Object.keys(techStackVideos).find(
          t => t.toLowerCase() === tech
        );

        // If no exact match, try partial match
        if (!matchingTech) {
          matchingTech = Object.keys(techStackVideos).find(
            t => t.toLowerCase().includes(tech) || tech.includes(t.toLowerCase())
          );
        }

        if (matchingTech && techStackVideos[matchingTech]) {
          foundVideos.push(...techStackVideos[matchingTech]);
        }
      });

      console.log('Found videos for tech stack:', techStack, foundVideos);
      setVideos(foundVideos);
      setIsLoading(false);
    };

    setIsLoading(true);
    findRelevantVideos();
  }, [techStack]);

  return { videos, isLoading };
};