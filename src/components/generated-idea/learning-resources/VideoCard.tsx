import { useState } from "react";
import { Youtube, ExternalLink } from "lucide-react";
import { TechStackVideo } from "./video-types";

interface VideoCardProps {
  video: TechStackVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getVideoId = (url: string) => {
    try {
      // Handle both youtube.com and youtu.be URLs
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : null;
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;
    }
  };

  const getThumbnailUrl = (videoId: string | null) => {
    if (!videoId) return null;
    // Use https explicitly and ensure proper URL formatting
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const videoId = getVideoId(video.url);
  const thumbnailUrl = getThumbnailUrl(videoId);

  const handleImageError = () => {
    console.error("Failed to load thumbnail for video:", video.url);
    setImageError(true);
  };

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border hover:shadow-lg transition-all bg-card/50 space-y-3 group"
    >
      {thumbnailUrl && !imageError ? (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={video.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Youtube className="w-12 h-12 text-red-500" />
          </div>
        </div>
      ) : (
        <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
          <Youtube className="w-12 h-12 text-red-500" />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" />
          <h3 className="font-semibold flex-1 group-hover:text-primary transition-colors line-clamp-2">
            {video.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  );
};

export default VideoCard;