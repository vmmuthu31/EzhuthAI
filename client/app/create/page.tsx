"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUpload, FaInfoCircle } from "react-icons/fa";
import { contractUtils } from "@/deployments/contractinteraction";
import { useAccount } from "wagmi";

interface FormData {
  title: string;
  author: string;
  year: string;
  category: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  price: string;
  image: File | null;
}

const categories = [
  "Classical Literature",
  "Modern Poetry",
  "Historical Text",
  "Epic",
  "Devotional",
  "Philosophical",
  "Folk Literature",
];

const rarityLevels = [
  { value: "Common", color: "bg-gray-500" },
  { value: "Rare", color: "bg-blue-500" },
  { value: "Epic", color: "bg-purple-500" },
  { value: "Legendary", color: "bg-yellow-500" },
];

export default function CreateLiteratureNFT() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const { address } = useAccount();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    year: "",
    category: "",
    rarity: "Common",
    price: "",
    image: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      // Implement your NFT minting logic here
      await contractUtils.mintLiterature(
        address as string,
        formData.image ? URL.createObjectURL(formData.image) : "",
        formData.title,
        formData.author,
        parseInt(formData.year),
        formData.category,
        formData.rarity,
        formData.price
      );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      router.push("/marketplace");
    } catch (error) {
      console.error("Error creating NFT:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Literature <span className="text-gradient">NFT</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Immortalize Tamil literature on the blockchain
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rarity Level
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {rarityLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            rarity: level.value as FormData["rarity"],
                          })
                        }
                        className={`px-4 py-2 rounded-lg ${
                          formData.rarity === level.value
                            ? `${level.color} text-white`
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {level.value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Initial Price (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    {previewUrl ? (
                      <div className="relative h-96">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("");
                            setFormData({ ...formData, image: null });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click or drag to upload
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Review Your NFT
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {previewUrl && (
                      <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={previewUrl}
                          alt="NFT Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {formData.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {formData.author}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm ${
                            rarityLevels.find(
                              (r) => r.value === formData.rarity
                            )?.color
                          }`}
                        >
                          {formData.rarity}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {formData.price} ETH
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Metadata
                      </h5>
                      <ul className="mt-2 space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Author
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.author}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Year
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.year}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Category
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.category}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Content Preview
                      </h5>
                      <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white line-clamp-3">
                          {formData.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <div className="flex items-start">
                  <FaInfoCircle className="text-yellow-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Important Note
                    </h4>
                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                      Once minted, the NFT&apos;s core metadata cannot be
                      changed. Please review all information carefully before
                      proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
              >
                Previous
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type={currentStep === 2 ? "submit" : "button"}
              onClick={() => {
                if (currentStep < 2) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 2
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-primary text-white"
              }`}
              disabled={isUploading}
            >
              {isUploading
                ? "Creating NFT..."
                : currentStep === 2
                  ? "Create NFT"
                  : "Next"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
