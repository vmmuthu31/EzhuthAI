import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Tamil Literature Professor",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7JFcsaVp1V8VWjs6oSDDCk0fmajHQY8Ljw&s",
    quote:
      "EzhuthAI has revolutionized how we preserve and share Tamil literature. The blockchain integration ensures our literary heritage lives on.",
  },
  {
    name: "Priya Sundaram",
    role: "Digital Art Collector",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-OP5mJuYVLPgnXh149sStTeDYm-UqJzRaTg&s",
    quote:
      "As a collector, I love how EzhuthAI combines traditional Tamil literature with modern blockchain technology.",
  },
  {
    name: "Karthik Raman",
    role: "Author & Poet",
    image: "https://thelifeindia.com/wp-content/uploads/2019/10/kartik.jpg",
    quote:
      "The platform has given Tamil authors like me a new way to reach readers and earn fair compensation for our work.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            What Our <span className="text-gradient">Users Say</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &quot;{testimonial.quote}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
