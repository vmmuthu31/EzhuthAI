"use client";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  FaWallet,
  FaUserCircle,
  FaEthereum,
  FaExclamationTriangle,
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Tamil Literature NFT"
                className="w-10 h-10 object-cover"
                width={100}
                height={100}
              />{" "}
              <div className="ml-2 flex flex-col">
                <span className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
                  Tamil NFT
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Literature on Chain
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-baseline space-x-4">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#how-it-works">How it Works</NavLink>
              <NavLink href="/marketplace">Marketplace</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <motion.button
                            onClick={openConnectModal}
                            type="button"
                            className="inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <FaWallet className="mr-2" />
                            Connect Wallet
                          </motion.button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <motion.button
                            onClick={openChainModal}
                            type="button"
                            className="inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExclamationTriangle className="mr-2" />
                            Wrong network
                          </motion.button>
                        );
                      }

                      return (
                        <div className="flex items-center gap-4">
                          <motion.button
                            onClick={openChainModal}
                            className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                className="w-5 h-5 rounded-full overflow-hidden mr-2 flex items-center justify-center"
                                style={{ background: chain.iconBackground }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    className="w-5 h-5"
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </motion.button>

                          <motion.button
                            onClick={openAccountModal}
                            className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <FaUserCircle className="mr-2" />
                                <span className="hidden sm:inline">
                                  {account.displayName}
                                </span>
                                <span className="inline sm:hidden">
                                  {account.displayName.substring(0, 6)}...
                                  {account.displayName.substring(
                                    account.displayName.length - 4
                                  )}
                                </span>
                              </div>
                              {account.displayBalance && (
                                <div className="hidden sm:flex items-center border-l border-white/20 pl-2 ml-2">
                                  <FaEthereum className="mr-1" />
                                  <span>{account.displayBalance}</span>
                                </div>
                              )}
                            </div>
                          </motion.button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>{" "}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
              <MobileNavLink href="/#features" onClick={() => setIsOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink
                href="/#how-it-works"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </MobileNavLink>
              <MobileNavLink
                href="/marketplace"
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <div className="pt-4">
                TSX
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === "authenticated");

                    return (
                      <div
                        {...(!ready && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <motion.button
                                onClick={openConnectModal}
                                type="button"
                                className="inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <FaWallet className="mr-2" />
                                Connect Wallet
                              </motion.button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <motion.button
                                onClick={openChainModal}
                                type="button"
                                className="inline-flex items-center px-6 py-2.5 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FaExclamationTriangle className="mr-2" />
                                Wrong network
                              </motion.button>
                            );
                          }

                          return (
                            <div className="flex items-center gap-4">
                              <motion.button
                                onClick={openChainModal}
                                className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                              >
                                {chain.hasIcon && (
                                  <div
                                    className="w-5 h-5 rounded-full overflow-hidden mr-2 flex items-center justify-center"
                                    style={{ background: chain.iconBackground }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? "Chain icon"}
                                        src={chain.iconUrl}
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name}
                              </motion.button>

                              <motion.button
                                onClick={openAccountModal}
                                className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center">
                                    <FaUserCircle className="mr-2" />
                                    <span className="hidden sm:inline">
                                      {account.displayName}
                                    </span>
                                    <span className="inline sm:hidden">
                                      {account.displayName.substring(0, 6)}...
                                      {account.displayName.substring(
                                        account.displayName.length - 4
                                      )}
                                    </span>
                                  </div>
                                  {account.displayBalance && (
                                    <div className="hidden sm:flex items-center border-l border-white/20 pl-2 ml-2">
                                      <FaEthereum className="mr-1" />
                                      <span>{account.displayBalance}</span>
                                    </div>
                                  )}
                                </div>
                              </motion.button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);
