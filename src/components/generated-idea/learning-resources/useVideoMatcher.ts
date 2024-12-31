import { TechStackVideo, techStackVideos } from "./types";

export const useVideoMatcher = (techStack: string) => {
  const getRelevantVideos = () => {
    const technologies = techStack.toLowerCase().split(/[,\s]+/);
    const videos: TechStackVideo[] = [];
    
    technologies.forEach(tech => {
      const matchingTech = Object.keys(techStackVideos).find(
        t => t.toLowerCase().includes(tech) || tech.includes(t.toLowerCase())
      );
      
      if (matchingTech) {
        videos.push(...techStackVideos[matchingTech]);
      }
    });
    
    return videos;
  };

  return { getRelevantVideos };
};