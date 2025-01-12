interface IdeaTitleProps {
  websiteName: string;
  description: string;
}

const IdeaTitle = ({ websiteName, description }: IdeaTitleProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        {websiteName}
      </h1>
      <p className="text-lg text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default IdeaTitle;