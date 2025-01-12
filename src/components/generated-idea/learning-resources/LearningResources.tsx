interface LearningResourcesProps {
  techStack: string;
}

const LearningResources = ({ techStack }: LearningResourcesProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Learning Resources</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Display learning resources based on techStack */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Tech Stack</h3>
          <p className="text-muted-foreground">{techStack}</p>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;