"use client";
import { motion } from "framer-motion";
import {
  FaBookReader,
  FaEthereum,
  FaWallet,
  FaFileContract,
} from "react-icons/fa";

const steps = [
  {
    title: "Connect Wallet",
    description:
      "Connect your crypto wallet to start collecting Tamil literature NFTs",
    icon: FaWallet,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Choose Literature",
    description: "Browse our curated collection of Tamil literary works",
    icon: FaBookReader,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Purchase NFT",
    description: "Buy the NFT using ETH and become a proud owner",
    icon: FaEthereum,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Access Content",
    description: "Get exclusive access to the complete literary work",
    icon: FaFileContract,
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pb-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start your journey into Tamil literature collection in four easy
            steps
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden  lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Number Background */}
                  <div className="absolute -left-4 -top-4 w-24 h-24 flex items-center justify-center">
                    <span className="text-8xl font-bold text-gray-100 dark:text-gray-800 select-none">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl relative z-10 h-full border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-colors duration-300">
                    <div
                      className={`relative z-10 flex flex-col items-center text-center`}
                    >
                      <div
                        className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 shadow-lg`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
