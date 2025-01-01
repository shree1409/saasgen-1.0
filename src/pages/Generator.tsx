import GeneratorForm from "@/components/GeneratorForm";

const Generator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <GeneratorForm />
        </div>
      </div>
    </div>
  );
};

export default Generator;