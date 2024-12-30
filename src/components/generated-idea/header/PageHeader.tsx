import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ShareDownloadButtons from "./ShareDownloadButtons";

interface PageHeaderProps {
  onBack: () => void;
  onShare: () => Promise<void>;
  onDownload: () => void;
}

const PageHeader = ({ onBack, onShare, onDownload }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Generator
      </Button>
      <ShareDownloadButtons onShare={onShare} onDownload={onDownload} />
    </div>
  );
};

export default PageHeader;