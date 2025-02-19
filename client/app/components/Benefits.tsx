"use client";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaEthereum,
  FaGlobe,
  FaHistory,
  FaUserCheck,
  FaChartLine,
  FaBookReader,
  FaCrown,
} from "react-icons/fa";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({ icon, title, description, delay }: BenefitCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function Benefits() {
  const benefits = [
    {
      icon: <FaShieldAlt className="h-6 w-6 text-primary" />,
      title: "Secure Preservation",
      description:
        "Immortalize Tamil literature on the blockchain with permanent, tamper-proof digital preservation.",
    },
    {
      icon: <FaEthereum className="h-6 w-6 text-primary" />,
      title: "Automatic Royalties",
      description:
        "Earn 2.5% royalties on secondary sales, ensuring continuous support for content creators.",
    },
    {
      icon: <FaGlobe className="h-6 w-6 text-primary" />,
      title: "Global Access",
      description:
        "Share Tamil literature with readers worldwide through decentralized accessibility.",
    },
    {
      icon: <FaHistory className="h-6 w-6 text-primary" />,
      title: "Historical Documentation",
      description:
        "Preserve the authenticity and timeline of Tamil literary works with immutable records.",
    },
    {
      icon: <FaUserCheck className="h-6 w-6 text-primary" />,
      title: "Expert Verification",
      description:
        "Every piece is verified by qualified curators ensuring authenticity and quality.",
    },
    {
      icon: <FaChartLine className="h-6 w-6 text-primary" />,
      title: "Investment Potential",
      description:
        "Own and trade valuable pieces of Tamil literary heritage with transparent pricing.",
    },
    {
      icon: <FaBookReader className="h-6 w-6 text-primary" />,
      title: "Community Curation",
      description:
        "Participate in preserving and promoting Tamil literature through community engagement.",
    },
    {
      icon: <FaCrown className="h-6 w-6 text-primary" />,
      title: "Creator Recognition",
      description:
        "Provide proper attribution and recognition to authors and content creators.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Platform Benefits
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover why Tamil Literature NFTs are revolutionizing digital
            preservation and cultural heritage management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Works Preserved", value: "156+" },
            { label: "Active Collectors", value: "89+" },
            { label: "Total Value Locked", value: "45.8 ETH" },
            { label: "Curator Verified", value: "98%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
            >
              <h3 className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
