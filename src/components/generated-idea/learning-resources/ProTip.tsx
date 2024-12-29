import { Info } from "lucide-react";

const ProTip = () => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Info className="w-4 h-4 text-blue-500" />
        Pro Tip
      </h4>
      <p className="text-sm text-muted-foreground">
        Watch these tutorials in the suggested order for the best learning experience. Start with crash courses for quick overview, then dive into full courses for in-depth understanding.
      </p>
    </div>
  );
};

export default ProTip;