export interface TechStackVideo {
  title: string;
  url: string;
  description: string;
}

export type TechStackVideos = Record<string, TechStackVideo[]>;