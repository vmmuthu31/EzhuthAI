"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FaEthereum,
  FaHistory,
  FaEdit,
  FaCertificate,
  FaHeart,
  FaCrown,
  FaUserCircle,
} from "react-icons/fa";

interface UserNFT {
  id: string;
  title: string;
  tamilTitle: string;
  author: string;
  isVerified: boolean;
  isCreator: boolean;
  image: string;
  price: number;
  lastUpdated: string;
  category: string;
  royalties: number;
  likes: number;
}

const mockUserNFTs: UserNFT[] = [
  {
    id: "1",
    title: "பரிபாடல்",
    tamilTitle: "பரிபாடல்",
    author: "Unknown",
    isVerified: true,
    isCreator: true,
    image:
      "https://gowrabookfair.com/wp-content/uploads/2024/06/0874-F-scaled-1.jpg",
    price: 0.8,
    lastUpdated: "2025-02-18 19:10:59",
    category: "Classical",
    royalties: 0.02,
    likes: 234,
  },
  // Add more user NFTs...
];

export default function Profile() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState("collected");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCurator, setIsCurator] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userStats, setUserStats] = useState({
    totalNFTs: 0,
    totalRoyalties: 0,
    verified: 0,
    created: 0,
  });

  useEffect(() => {
    if (isConnected || address === "0x1234...5678") {
      setIsAdmin(true);
      setIsCurator(true);
    }
    // Add contract role checks here
  }, [address, isConnected]);

  const tabs = [
    { id: "collected", label: "Collected", icon: FaUserCircle },
    { id: "created", label: "Created", icon: FaEdit },
    { id: "curated", label: "Curated", icon: FaCertificate },
    { id: "activity", label: "Activity", icon: FaHistory },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Connect your wallet to view your profile
          </h1>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FaUserCircle className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {address?.substring(0, 6)}...
                  {address?.substring(address.length - 4)}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  {isAdmin && (
                    <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium">
                      Admin
                    </span>
                  )}
                  {isCurator && (
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium">
                      Curator
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ConnectButton />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total NFTs
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.totalNFTs}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Royalties
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.totalRoyalties} ETH
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Verified Works
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.verified}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Created Works
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.created}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockUserNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img src={nft.image} alt={nft.title} className="object-cover" />
                {nft.isVerified && (
                  <div className="absolute top-4 right-4">
                    <FaCrown className="text-yellow-500 h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {nft.tamilTitle}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {nft.author}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {nft.category}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Current Value</span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <FaEthereum className="mr-1" />
                      {nft.price} ETH
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <FaHeart className="text-red-500" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Royalties:</span>
                      <span>{(nft.royalties * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {nft.isCreator && (
                      <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                        Edit Metadata
                      </button>
                    )}
                    <button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
