import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, ShoppingBag, Users, Palette, Target } from "lucide-react";
import CategoryCard from "./CategoryCard";
import StepIndicator from "./StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const categories = [
  {
    id: "blog",
    title: "Personal Blog",
    description: "Share your thoughts and experiences",
    icon: <Laptop className="w-6 h-6" />,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Sell products online",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    id: "community",
    title: "Community Platform",
    description: "Build and engage with your audience",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Showcase your work and skills",
    icon: <Palette className="w-6 h-6" />,
  },
];

const GeneratorForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [audience, setAudience] = useState("");
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && !selectedCategory) {
      toast({
        title: "Please select a category",
        description: "Choose a website category to continue",
      });
      return;
    }
    if (step === 2 && !audience.trim()) {
      toast({
        title: "Please define your audience",
        description: "Tell us who your website is for",
      });
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Generating your website idea",
      description: "We're crafting something unique for you...",
    });
    // Add idea generation logic here
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <StepIndicator currentStep={step} totalSteps={3} />
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Choose Your Website Category</h2>
              <p className="text-muted-foreground">Select the type of website you want to create</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  selected={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Define Your Target Audience</h2>
              <p className="text-muted-foreground">Who is your website for?</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Young professionals interested in personal finance"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Review & Generate</h2>
              <p className="text-muted-foreground">Ready to get your website idea?</p>
            </div>
            <div className="p-6 rounded-xl border bg-secondary/30">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Category</h3>
                  <p className="text-lg">{categories.find(c => c.id === selectedCategory)?.title}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Target Audience</h3>
                  <p className="text-lg">{audience}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={step === 3 ? handleSubmit : handleNext}
        >
          {step === 3 ? "Generate Idea" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;