import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Basic",
    priceId: "price_1QdiOkBNGIJ8hstK75BVXEvj",
    price: "$15",
    description: "Essential features for getting started with development timeline",
    demoPath: "/demo-basic",
    features: [
      "Generate basic website ideas",
      "Access to key features list",
      "Basic tech stack suggestions",
      "Simple project overview",
      "Development timeline",
    ],
  },
  {
    name: "Advanced",
    priceId: "price_1Qcwy0BNGIJ8hstKYmE68GcO",
    price: "$25",
    description: "Enhanced features with market analysis",
    demoPath: "/demo-advanced",
    features: [
      "Everything in Basic",
      "Market analysis",
      "Detailed project insights",
      "Enhanced suggestions",
    ],
  },
  {
    name: "Pro",
    priceId: "price_1QcwtBBNGIJ8hstK31w61Ihy",
    price: "$35",
    description: "Full access to all premium features with marketing strategies",
    demoPath: "/demo-pro",
    features: [
      "Everything in Advanced",
      "Learning resources",
      "Video tutorials",
      "Implementation guides",
      "Marketing strategies",
    ],
  },
];

const Pricing = () => {
  const { isLoading, handleSubscribe } = useSubscriptionManagement();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="text-muted-foreground">{tier.description}</p>
                <div className="text-3xl font-bold">
                  {tier.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </div>
              <div className="p-6 border-t space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <Button
                    className="w-full text-white"
                    onClick={() => handleSubscribe(tier.priceId)}
                    disabled={isLoading}
                  >
                    Get Started
                  </Button>
                  <Link to={tier.demoPath}>
                    <Button variant="outline" className="w-full">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;