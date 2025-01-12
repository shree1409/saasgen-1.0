import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingTierProps {
  name: string;
  priceId: string;
  price: string;
  description: string;
  demoPath: string;
  features: string[];
  onSubscribe: (priceId: string) => void;
  isLoading: boolean;
}

export const PricingTierCard = ({
  name,
  priceId,
  price,
  description,
  demoPath,
  features,
  onSubscribe,
  isLoading,
}: PricingTierProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="text-3xl font-bold">
          {price}
          <span className="text-sm font-normal text-muted-foreground">
            /month
          </span>
        </div>
      </div>
      <div className="p-6 border-t space-y-4">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          <Button
            className="w-full text-white"
            onClick={() => onSubscribe(priceId)}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Get Started"}
          </Button>
          <Link to={demoPath}>
            <Button variant="outline" className="w-full">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};