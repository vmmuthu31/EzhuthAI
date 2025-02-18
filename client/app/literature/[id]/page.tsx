"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FaEthereum,
  FaHeart,
  FaHistory,
  FaBook,
  FaClock,
  FaShareAlt,
  FaChartLine,
  FaLanguage,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import { mockLiterature } from "@/lib/utils/mockdata";

export default function LiteraturePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: FaBook },
    { id: "history", label: "History", icon: FaHistory },
    { id: "analytics", label: "Analytics", icon: FaChartLine },
    { id: "content", label: "Content", icon: FaFileAlt },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={mockLiterature.image}
                alt={mockLiterature.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/90 text-white rounded-full text-sm">
                    {mockLiterature.rarity}
                  </span>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full ${
                        isLiked
                          ? "bg-red-500 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <FaHeart />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <FaShareAlt />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockLiterature.tamilTitle}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockLiterature.title}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Token ID
                  </div>
                  <div className="font-mono text-primary">
                    {mockLiterature.tokenId}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Current Price
                  </div>
                  <div className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                    <FaEthereum className="mr-1" />
                    {mockLiterature.price} ETH
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last Sold
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaEthereum className="mr-1" />
                    {mockLiterature.lastSoldPrice} ETH
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          </motion.div>

          {/* Right: Tabs and Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      About
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {mockLiterature.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Author
                        </div>
                        <div className="flex items-center text-gray-900 dark:text-white">
                          <FaUser className="mr-2" />
                          {mockLiterature.author}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Period
                        </div>
                        <div className="flex items-center text-gray-900 dark:text-white">
                          <FaClock className="mr-2" />
                          {mockLiterature.period}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Language
                        </div>
                        <div className="flex items-center text-gray-900 dark:text-white">
                          <FaLanguage className="mr-2" />
                          {mockLiterature.language}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Category
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          {mockLiterature.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Attributes
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(mockLiterature.attributes).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                          >
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {key}
                            </div>
                            <div className="text-gray-900 dark:text-white">
                              {Array.isArray(value)
                                ? value.join(", ")
                                : value.toString()}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Ownership History
                  </h3>
                  <div className="space-y-4">
                    {mockLiterature.previousOwners.map((owner, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaUser className="text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {owner.substring(0, 6)}...
                              {owner.substring(owner.length - 4)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Owned for 3 months
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            1.2 ETH
                          </div>
                          <div className="text-xs text-gray-500">
                            2025-01-15
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total Views
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockLiterature.views.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Total Likes
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockLiterature.likes.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {/* Add price history chart here */}
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Sample Verses</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-lg mb-2">{mockLiterature.content}</p>
                      {mockLiterature.translationAvailable && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            English Translation
                          </div>
                          <p>Translation of the verses...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
