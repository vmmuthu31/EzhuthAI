"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  FaUserShield,
  FaEthereum,
  FaBook,
  FaCheckCircle,
  FaBan,
  FaPause,
  FaPlay,
  FaCog,
  FaExclamationTriangle,
  FaChartLine,
  FaHistory,
} from "react-icons/fa";

interface AdminStats {
  totalNFTs: number;
  totalUsers: number;
  totalValue: number;
  pendingVerifications: number;
  royaltiesCollected: number;
  activeAuctions: number;
}

interface UserRole {
  address: string;
  roles: string[];
  lastActive: string;
  totalNFTs: number;
  isBlacklisted: boolean;
}

interface PendingVerification {
  tokenId: string;
  title: string;
  author: string;
  submittedBy: string;
  submittedAt: string;
  category: string;
}

const mockStats: AdminStats = {
  totalNFTs: 156,
  totalUsers: 89,
  totalValue: 45.8,
  pendingVerifications: 12,
  royaltiesCollected: 2.5,
  activeAuctions: 24,
};

const mockUsers: UserRole[] = [
  {
    address: "0x1234...5678",
    roles: ["MINTER_ROLE", "CURATOR_ROLE"],
    lastActive: "2025-02-18 18:30:45",
    totalNFTs: 5,
    isBlacklisted: false,
  },
  // Add more users...
];

const mockPendingVerifications: PendingVerification[] = [
  {
    tokenId: "1",
    title: "பரிபாடல்",
    author: "Unknown",
    submittedBy: "0x9876...5432",
    submittedAt: "2025-02-18 17:45:22",
    category: "Classical",
  },
  // Add more pending verifications...
];

export default function AdminDashboard() {
  const { address, isConnected } = useAccount();
  //   const [activeTab, setActiveTab] = useState("overview");
  const [isMintingPaused, setIsMintingPaused] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const currentTime = "2025-02-18 19:14:29";

  useEffect(() => {
    // Check if connected address has admin role
    if (isConnected || address === "0x1234...5678") {
      setIsAdmin(true);
    }
  }, [address, isConnected]);

  if (!isConnected || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You must be connected with an admin wallet to access this page.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Current Time (UTC): {currentTime}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMintingPaused(!isMintingPaused)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isMintingPaused
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition-colors`}
            >
              {isMintingPaused ? (
                <>
                  <FaPlay className="h-4 w-4" />
                  <span>Resume Minting</span>
                </>
              ) : (
                <>
                  <FaPause className="h-4 w-4" />
                  <span>Pause Minting</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total NFTs
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.totalNFTs}
                </h3>
              </div>
              <FaBook className="h-8 w-8 text-primary opacity-80" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Value Locked
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.totalValue} ETH
                </h3>
              </div>
              <FaEthereum className="h-8 w-8 text-primary opacity-80" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Pending Verifications
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockStats.pendingVerifications}
                </h3>
              </div>
              <FaCheckCircle className="h-8 w-8 text-primary opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Pending Verifications */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pending Verifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                    <th className="pb-4">Token ID</th>
                    <th className="pb-4">Title</th>
                    <th className="pb-4">Submitted By</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockPendingVerifications.map((verification) => (
                    <tr key={verification.tokenId}>
                      <td className="py-4">{verification.tokenId}</td>
                      <td className="py-4">{verification.title}</td>
                      <td className="py-4">{verification.submittedBy}</td>
                      <td className="py-4">{verification.category}</td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">
                            <FaCheckCircle />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                            <FaBan />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Roles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              User Roles
            </h2>
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div
                  key={user.address}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.address}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <FaCog />
                      </button>
                      {user.isBlacklisted ? (
                        <button className="p-1 text-red-500 hover:text-red-600">
                          <FaBan />
                        </button>
                      ) : (
                        <button className="p-1 text-green-500 hover:text-green-600">
                          <FaCheckCircle />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Last Active: {user.lastActive}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
              <FaExclamationTriangle className="mr-2" />
              Emergency Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to pause all minting?"
                    )
                  ) {
                    // Implement contract pause
                  }
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <FaPause />
                <span>Emergency Pause</span>
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to withdraw all funds?"
                    )
                  ) {
                    // Implement emergency withdrawal
                  }
                }}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <FaEthereum />
                <span>Emergency Withdraw</span>
              </button>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Platform Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mint Price (ETH)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    defaultValue="0.01"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Update
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Royalty Rate (%)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    max="10"
                    defaultValue="2.5"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaHistory className="mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaBook className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New NFT Minted
                      </p>
                      <p className="text-xs text-gray-500">
                        By: 0x1234...5678 • {new Date().toISOString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3">
                <FaUserShield className="text-primary" />
                <span>Manage Roles</span>
              </div>
            </button>
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3">
                <FaChartLine className="text-primary" />
                <span>View Analytics</span>
              </div>
            </button>
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3">
                <FaCog className="text-primary" />
                <span>Configure Platform</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
