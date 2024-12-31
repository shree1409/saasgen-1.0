import { motion } from "framer-motion";
import GeneratorForm from "@/components/GeneratorForm";
import { Button } from "@/components/ui/button";
import { CircuitBoard, ArrowRight, Sparkles, Zap, Target, Coins, Users, Rocket, Shield, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      {/* Header */}
      <header className="container px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircuitBoard className="w-6 h-6" />
          <span className="font-semibold text-lg">WebsiteGuru</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Button 
            variant="ghost"
            onClick={() => navigate('/features')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Features
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate('/how-it-works')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            How it Works
          </Button>
          <a href="#generator" className="text-sm text-muted-foreground hover:text-primary">Generator</a>
        </nav>
        <Button 
          variant="default" 
          size="sm"
          className="text-white"
          onClick={() => navigate('#generator')}
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </header>

      <div className="container px-4 py-12">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Website Idea Generator
            </div>
            <h1 className="text-5xl font-bold leading-tight">
              Transform Your
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Vision
              </span>
              <br />
              into Reality
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate unique and actionable website ideas tailored to your goals and audience
            </p>
            <Button 
              size="lg" 
              className="rounded-full text-white"
              onClick={() => {
                const element = document.getElementById('generator');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Generating
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Technology" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl relative animate-float"
            />
          </motion.div>
        </div>

        {/* Benefits Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose WebsiteGuru?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform helps entrepreneurs and creators build successful online businesses
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Ideas",
                description: "Get unique website concepts tailored to your needs"
              },
              {
                icon: Target,
                title: "Market Focus",
                description: "Target the right audience with precision"
              },
              {
                icon: Users,
                title: "User-Centric",
                description: "Design with your users in mind"
              },
              {
                icon: Rocket,
                title: "Launch Fast",
                description: "Get actionable steps to launch quickly"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel rounded-xl p-6 hover-scale"
              >
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate your perfect website idea in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Share Your Vision",
                description: "Tell us about your goals, target audience, and preferences"
              },
              {
                icon: Sparkles,
                title: "AI Generation",
                description: "Our AI analyzes your inputs to create unique website concepts"
              },
              {
                icon: Shield,
                title: "Get Your Blueprint",
                description: "Receive a detailed plan with features and implementation steps"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative p-8 rounded-2xl bg-white shadow-lg"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <step.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Generator Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel rounded-2xl p-8 mb-24"
          id="generator"
        >
          <GeneratorForm />
        </motion.div>

        {/* Features Section */}
        <section className="mb-24" id="features">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">Discover how we help you create the perfect website concept</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Ideas",
                description: "Leverage advanced AI to generate unique website concepts tailored to your needs"
              },
              {
                icon: Target,
                title: "Market-Focused",
                description: "Get ideas that align with your target audience and business goals"
              },
              {
                icon: Coins,
                title: "Revenue-Driven",
                description: "Focus on monetization strategies that match your revenue targets"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-panel rounded-xl p-6 hover-scale"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how others have transformed their ideas into successful websites
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
                title: "E-learning Platform",
                description: "Generated a unique online course platform idea that now serves 10,000+ students"
              },
              {
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                title: "SaaS Solution",
                description: "Launched a successful B2B SaaS platform with our website concept generator"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative rounded-2xl overflow-hidden group"
              >
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white mb-2">{story.title}</h3>
                  <p className="text-white/80">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center py-16 px-4 glass-panel rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-500/10"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start generating your perfect website idea now and turn your vision into reality
          </p>
          <Button 
            size="lg" 
            className="rounded-full text-white"
            onClick={() => {
              const element = document.getElementById('generator');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Generate Your Idea
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;