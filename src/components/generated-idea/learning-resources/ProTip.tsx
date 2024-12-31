import { Info } from "lucide-react";

const ProTip = () => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Info className="w-4 h-4 text-blue-500" />
        Pro Learning Tips
      </h4>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          Watch these tutorials in the suggested order for the best learning experience:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Start with crash courses for a quick overview</li>
          <li>Move on to full courses for in-depth understanding</li>
          <li>Practice along with the tutorials to reinforce learning</li>
          <li>Join related Discord communities for support</li>
        </ol>
      </div>
    </div>
  );
};

export default ProTip;