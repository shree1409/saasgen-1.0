import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    text: "As a solo entrepreneur, SaasGen has been a game-changer. It's given me the power to launch professional-looking products in record time.",
    author: "Emma Rodriguez",
    role: "Independent Developer",
    avatar: "/lovable-uploads/a9b369fc-56c8-4f8f-8adf-d0dc803fd96e.png"
  },
  {
    text: "The AI-powered suggestions helped me find my niche. Now my SaaS is growing faster than ever!",
    author: "Michael Chen",
    role: "Startup Founder",
    avatar: "/placeholder.svg"
  },
  {
    text: "From idea to launch in weeks. SaasGen streamlined our entire development process.",
    author: "Sarah Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#1A1F2C] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          What Our Users Say
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1E2433] p-8 rounded-xl shadow-xl"
          >
            <p className="text-xl text-gray-300 italic mb-8">
              "{testimonials[currentIndex].text}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="text-white font-semibold">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-gray-400">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;