import { motion } from "framer-motion";
import {
  FaEthereum,
  FaBook,
  FaUserEdit,
  FaShieldAlt,
  FaAward,
  FaCertificate,
  FaGlobe,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    name: "Digital Ownership",
    description:
      "Own and trade authentic Tamil literary works as unique NFTs with verifiable ownership on the blockchain",
    icon: FaEthereum,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "AI-Powered Curation",
    description:
      "Advanced AI algorithms help discover and preserve rare Tamil literature while ensuring authenticity",
    icon: FaRobot,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Author Empowerment",
    description:
      "Direct support for authors through automatic royalty payments and transparent revenue sharing",
    icon: FaUserEdit,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Secure Preservation",
    description:
      "Immutable blockchain storage ensures Tamil literature is preserved for future generations",
    icon: FaShieldAlt,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Expert Verification",
    description:
      "Each work is verified by Tamil literature experts ensuring authenticity and cultural accuracy",
    icon: FaCertificate,
    color: "from-amber-500 to-yellow-500",
  },
  {
    name: "Global Access",
    description:
      "Make Tamil literature accessible to readers and collectors worldwide through blockchain",
    icon: FaGlobe,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Quality Curation",
    description:
      "Carefully curated collection of classical and contemporary Tamil literary masterpieces",
    icon: FaBook,
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Recognition System",
    description:
      "Special badges and rewards for active collectors and contributors to the ecosystem",
    icon: FaAward,
    color: "from-fuchsia-500 to-pink-500",
  },
];

export default function Features() {
  return (
    <div
      id="features"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Revolutionary Features of{" "}
            <span className="text-gradient">EzhuthAI NFTs</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering Tamil literature through blockchain technology and
            artificial intelligence
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5 rounded-xl`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color}`}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <motion.a
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium"
                      href="#"
                    >
                      Learn more
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { label: "Literary Works", value: "1000+", suffix: "Works" },
            { label: "Active Users", value: "10K+", suffix: "Users" },
            { label: "Total Volume", value: "100", suffix: "ETH" },
            { label: "Authors Onboarded", value: "50+", suffix: "Authors" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-4xl font-bold text-primary"
              >
                {stat.value}
              </motion.div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-sm text-gray-500">{stat.suffix}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
