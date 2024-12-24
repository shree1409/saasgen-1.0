import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ title, description, icon, selected, onClick }: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "p-6 rounded-xl cursor-pointer transition-all duration-200 card-shadow",
        "border hover:border-primary/20",
        selected
          ? "bg-primary/5 border-primary/30"
          : "bg-white border-border hover:bg-secondary/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-lg bg-primary/5">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;