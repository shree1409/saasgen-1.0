import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareDownloadButtonsProps {
  onShare: () => Promise<void>;
  onDownload: () => void;
}

const ShareDownloadButtons = ({ onShare, onDownload }: ShareDownloadButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button variant="outline" onClick={onDownload}>
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default ShareDownloadButtons;