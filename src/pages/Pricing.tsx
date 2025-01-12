import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSubscriptionManagement } from "@/hooks/useSubscriptionManagement";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    name: "Basic",
    priceId: "price_1QdiOkBNGIJ8hstK75BVXEvj",
    price: "$15",
    description: "Essential features for getting started",
    features: [
      "Generate basic website ideas",
      "Access to fundamental features",
      "Basic monetization strategies",
      "Simple tech stack suggestions",
    ],
  },
  {
    name: "Advanced",
    priceId: "price_1Qcwy0BNGIJ8hstKYmE68GcO",
    price: "$25",
    description: "Enhanced features for growing businesses",
    features: [
      "Everything in Basic",
      "Advanced website concepts",
      "Detailed market analysis",
      "Comprehensive tech recommendations",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    priceId: "price_1QcwtBBNGIJ8hstK31w61Ihy",
    price: "$35",
    description: "Full access to all premium features",
    features: [
      "Everything in Advanced",
      "Premium website templates",
      "Custom branding options",
      "Advanced analytics",
      "Dedicated support",
      "API access",
    ],
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(tier.priceId)}
                  disabled={isLoading}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;