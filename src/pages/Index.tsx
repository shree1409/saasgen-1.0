import { motion } from "framer-motion";
import GeneratorForm from "@/components/GeneratorForm";
import { Sparkles, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium bg-primary/5 text-primary px-3 py-1 rounded-full">
              Website Idea Generator
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Vision into Reality
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Generate unique and actionable website ideas tailored to your goals and audience
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-16 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Why This Matters in Today's Digital Era</h2>
            <div className="grid gap-6 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Navigate the AI Revolution</h3>
                  <p className="text-muted-foreground">While AI tools make website building easier than ever, choosing the right concept that stands out in a saturated market remains crucial. Our generator helps you identify unique opportunities in your niche.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Market-Driven Ideation</h3>
                  <p className="text-muted-foreground">We analyze current market trends and user behavior patterns to suggest website ideas that not only look good but have real potential for profitability and growth.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Validated Business Models</h3>
                  <p className="text-muted-foreground">Each suggestion comes with proven monetization strategies and revenue models, helping you build not just a website, but a sustainable online business.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Audience-First Approach</h3>
                  <p className="text-muted-foreground">Our generator considers your target audience's needs and behaviors, ensuring your website idea resonates with the right people and solves real problems.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Future-Proof Concepts</h3>
                  <p className="text-muted-foreground">Get ideas that incorporate emerging technologies and trends, ensuring your website remains relevant and competitive in the fast-evolving digital landscape.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <GeneratorForm />
      </div>
    </div>
  );
};

export default Index;