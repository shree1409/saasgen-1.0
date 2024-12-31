import { TechStackVideo, techStackVideos } from "./types";

export const useVideoMatcher = (techStack: string) => {
  const getRelevantVideos = (): TechStackVideo[] => {
    if (!techStack) return [];
    
    const technologies = techStack.toLowerCase().split(/[,\s]+/).map(t => t.trim());
    const videos: TechStackVideo[] = [];
    
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
        videos.push(...techStackVideos[matchingTech]);
      }
    });
    
    return videos;
  };

  return { getRelevantVideos };
};