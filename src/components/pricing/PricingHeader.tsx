interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

export const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-muted-foreground">{subtitle}</p>
    </div>
  );
};