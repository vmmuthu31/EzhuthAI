"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaBook,
  FaEthereum,
  FaCertificate,
  FaUserShield,
  FaQuestionCircle,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Preserving Tamil Literature on the{" "}
              <span className="text-gradient">Blockchain</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how we&apos;re revolutionizing the preservation and
              sharing of Tamil literary works through blockchain technology and
              NFTs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaBook,
                title: "Digital Preservation",
                description:
                  "Immortalize Tamil literary works as unique digital assets on the blockchain, ensuring their preservation for future generations.",
              },
              {
                icon: FaEthereum,
                title: "NFT Marketplace",
                description:
                  "Trade, collect, and share Tamil literature NFTs in a dedicated marketplace designed for literary enthusiasts.",
              },
              {
                icon: FaCertificate,
                title: "Verification System",
                description:
                  "Expert curators verify the authenticity and accuracy of literary works before they're minted as NFTs.",
              },
              {
                icon: FaUserShield,
                title: "Role-Based Access",
                description:
                  "Secure platform with different roles for creators, curators, and administrators to ensure quality content.",
              },
              {
                icon: FaHandshake,
                title: "Royalty System",
                description:
                  "Fair compensation for content creators through automatic royalty distribution on secondary sales.",
              },
              {
                icon: FaChartLine,
                title: "Analytics & Tracking",
                description:
                  "Monitor the performance and engagement of your literary NFTs with detailed analytics.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Connect Your Wallet",
                  description:
                    "Start by connecting your Ethereum wallet to access the platform's features.",
                },
                {
                  step: 2,
                  title: "Create or Collect",
                  description:
                    "Mint new literary NFTs or collect existing works from the marketplace.",
                },
                {
                  step: 3,
                  title: "Verification Process",
                  description:
                    "Submit your work for verification by our expert curators to ensure authenticity.",
                },
                {
                  step: 4,
                  title: "Trade and Earn",
                  description:
                    "Trade your NFTs in the marketplace and earn royalties from secondary sales.",
                },
              ].map((step) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex space-x-4"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/works.jpeg"
                alt="Platform Tutorial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is a Tamil Literature NFT?",
                answer:
                  "A Tamil Literature NFT is a unique digital token that represents ownership of a specific Tamil literary work on the blockchain.",
              },
              {
                question: "How are royalties distributed?",
                answer:
                  "Creators receive automatic royalties (default 2.5%) on all secondary sales of their NFTs through our smart contract.",
              },
              {
                question: "Who can mint NFTs?",
                answer:
                  "Anyone can mint NFTs, but content must be verified by our curators to ensure authenticity and quality.",
              },
              {
                question: "How are works verified?",
                answer:
                  "Our expert curators review each submission for accuracy, authenticity, and proper attribution before verification.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaQuestionCircle className="mr-2 text-primary" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join us in preserving and celebrating Tamil literature on the
            blockchain.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/create"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create NFT
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
