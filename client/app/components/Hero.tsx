import { motion } from "framer-motion";
import { FaEthereum, FaBookOpen } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <FaEthereum className="mr-2" />
              <span>Web3 Tamil Literature Platform</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Preserve Tamil</span>
              <span className="block mt-2">
                <span className="text-primary">Literature</span>{" "}
                <span className="text-gradient">on Chain</span>
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Transform timeless Tamil literary masterpieces into unique digital
              assets. Join us in preserving and celebrating our rich cultural
              heritage through blockchain technology and AI-powered curation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-200"
              >
                Start Collecting
                <BsArrowRight className="ml-2" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-primary hover:text-primary transition-all duration-200"
              >
                <FaBookOpen className="mr-2" />
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { label: "Literary Works", value: "1000+" },
                { label: "Active Collectors", value: "500+" },
                { label: "Authors", value: "100+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 relative lg:mt-0 lg:col-span-6"
          >
            <div className="relative mx-auto w-full rounded-2xl shadow-xl overflow-hidden">
              {/* Replace this URL with a relevant Tamil literature themed GIF or image */}
              <img
                src="https://api.deepai.org/job-view-file/4a04f523-6180-4464-ab9f-81e07db39925/outputs/output.jpg"
                alt="Tamil Literature NFT"
                className="w-full h-full object-cover"
              />

              {/* Floating Cards Effect */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <FaEthereum className="text-primary text-xl" />
                  <span className="text-sm font-semibold">Latest Minted</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
