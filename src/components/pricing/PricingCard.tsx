import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  price: {
    tier: string;
    stripe_price_id: string;
    unit_amount: number;
  };
  onSubscribe: (priceId: string) => void;
  getDescription: (price: any) => string;
}

const PricingCard = ({ price, onSubscribe, getDescription }: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card className="hover:scale-105 transition-transform duration-300 bg-white/80 backdrop-blur-lg border-purple-100">
        <CardHeader>
          <CardTitle className="capitalize bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {price.tier}
          </CardTitle>
          <CardDescription>
            {getDescription(price)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-3xl font-bold">
            ${(price.unit_amount / 100).toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full text-white bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary transition-all duration-300" 
            onClick={() => onSubscribe(price.stripe_price_id)}
          >
            Subscribe
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/${price.tier.toLowerCase()}`)}
          >
            View Demo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;