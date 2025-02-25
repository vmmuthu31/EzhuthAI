"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEthereum,
  FaHeart,
  FaHistory,
  FaSearch,
  FaFilter,
  FaClock,
  FaGavel,
  FaChartLine,
} from "react-icons/fa";
import debounce from "lodash.debounce";
import { mockListings } from "@/lib/utils/mockdata";
import { NFTListing } from "@/lib/utils/types";
// import { contractUtils } from "@/deployments/contractinteraction";

const categories = ["All", "Classical", "Epic", "Modern", "Poetry", "Prose"];
const sortOptions = [
  { value: "ending-soon", label: "Ending Soon" },
  { value: "recently-listed", label: "Recently Listed" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "most-bids", label: "Most Bids" },
];

type DebouncedSearchFunction = {
  (query: string): void;
  cancel(): void;
};

// Add these utility functions
const calculateTimeLeft = (endTime: string) => {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const difference = end - now;

  if (difference <= 0) return "Ended";

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all, auctions, fixed-price

  const fetchListings = async () => {
    // const listings = await contractUtils.getAllLiterature();
    // setFilteredListings(listings);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const [filteredListings, setFilteredListings] =
    useState<NFTListing[]>(mockListings);

  // Add useEffect to handle filtering and sorting
  const filterAndSortListings = useCallback(() => {
    let filtered = [...mockListings];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.author.toLowerCase().includes(query) ||
          listing.seller.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (listing) => listing.category === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (listing) =>
        listing.currentPrice >= priceRange.min &&
        listing.currentPrice <= priceRange.max
    );

    // Tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((listing) =>
        activeTab === "auctions" ? listing.isAuction : !listing.isAuction
      );
    }

    // Sorting
    switch (sortBy) {
      case "ending-soon":
        filtered.sort(
          (a, b) =>
            new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
        );
        break;
      case "recently-listed":
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "price-low":
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case "most-bids":
        filtered.sort((a, b) => b.bids - a.bids);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, activeTab, sortBy]);

  const debouncedSearch: DebouncedSearchFunction = useMemo(
    () =>
      debounce((query: string) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  // Update filtered listings when filters change
  useEffect(() => {
    setFilteredListings(filterAndSortListings());
  }, [filterAndSortListings]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Marketplace Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tamil Literature{" "}
              <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Trade, bid, and collect rare Tamil literary works as NFTs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or seller address..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
              >
                <FaFilter />
                <span>Filters</span>
              </motion.button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                {/* Categories */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">
                    Price Range (ETH)
                  </h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: parseFloat(e.target.value),
                        })
                      }
                      className="w-24 px-3 py-1 rounded border"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: parseFloat(e.target.value),
                        })
                      }
                      className="w-24 px-3 py-1 rounded border"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Listing Type Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: "all", label: "All Listings", icon: FaChartLine },
                { id: "auctions", label: "Live Auctions", icon: FaGavel },
                { id: "fixed-price", label: "Fixed Price", icon: FaEthereum },
              ].map((tab) => (
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
          </div>
        </div>
      </section>

      {/* NFT Listings Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-contain"
                    />
                    {listing.isAuction && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Ends in</span>
                        <span className="text-gray-900 dark:text-white font-semibold flex items-center">
                          <FaClock className="mr-1" />
                          {calculateTimeLeft(listing.endTime)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {listing.author}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {listing.category}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {listing.description}
                    </p>

                    {listing.isAuction ? (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Current Bid</span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {listing.highestBid} ETH
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Ends in</span>
                          <span className="text-gray-900 dark:text-white font-semibold flex items-center">
                            <FaClock className="mr-1" />
                            12h 30m
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-500">Fixed Price</span>
                        <span className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                          <FaEthereum className="mr-1" />
                          {listing.currentPrice} ETH
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <button className="flex items-center hover:text-primary">
                          <FaHeart className="mr-1" />
                          {listing.likes}
                        </button>
                        <span>•</span>
                        <button className="flex items-center hover:text-primary">
                          <FaHistory className="mr-1" />
                          {listing.bids} bids
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        by {listing.seller.substring(0, 6)}...
                        {listing.seller.substring(listing.seller.length - 4)}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      {listing.isAuction ? "Place Bid" : "Buy Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 dark:text-gray-400"
                >
                  <FaSearch className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    No listings found
                  </h3>
                  <p>Try adjusting your search or filter criteria</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
