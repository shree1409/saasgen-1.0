import { motion } from "framer-motion";

interface IdeaTitleProps {
  websiteName: string;
  description: string;
}

const IdeaTitle = ({ websiteName, description }: IdeaTitleProps) => {
  return (
    <div className="space-y-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
      >
        {websiteName}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-muted-foreground leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default IdeaTitle;