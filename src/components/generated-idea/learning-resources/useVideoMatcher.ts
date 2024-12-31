import { useState, useEffect } from 'react';
import { TechStackVideo } from "./video-types";
import { techStackVideos } from "./video-data";

export const useVideoMatcher = (techStack: string) => {
  const [videos, setVideos] = useState<TechStackVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const findRelevantVideos = () => {
      try {
        if (!techStack) {
          console.log('No tech stack provided');
          setVideos([]);
          setIsLoading(false);
          return;
        }

        const technologies = techStack.toLowerCase().split(/[,\s]+/).map(t => t.trim());
        const foundVideos: TechStackVideo[] = [];
        const processedTechs = new Set(); // To avoid duplicates

        technologies.forEach(tech => {
          if (!tech || processedTechs.has(tech)) return;
          processedTechs.add(tech);

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
      } catch (error) {
        console.error('Error finding videos:', error);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    findRelevantVideos();
  }, [techStack]);

  return { videos, isLoading };
};