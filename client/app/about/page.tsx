"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Image from "next/image";

const team = [
  {
    name: "Vairamuthu M",
    role: "Founder & Lead Developer",
    image: "https://github.com/vmmuthu31.png",
    bio: "Blockchain developer passionate about preserving Tamil literature through technology.",
    social: {
      linkedin: "https://linkedin.com/in/vmmuthu31",
      twitter: "https://twitter.com/vmmuthu31",
      github: "https://github.com/vmmuthu31",
    },
  },
];

const milestones = [
  {
    year: "2024",
    title: "Project Inception",
    description:
      "EzhuthAI was founded with the vision of preserving Tamil literature on blockchain.",
  },
  {
    year: "2025",
    title: "Platform Launch",
    description:
      "Successfully launched the NFT platform with initial collection of classic Tamil works.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-gradient">EzhuthAI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Bridging the gap between traditional Tamil literature and modern
              technology through blockchain innovation and artificial
              intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At EzhuthAI, we&apos;re on a mission to preserve and democratize
                access to Tamil literature through blockchain technology. We
                believe that combining traditional literary works with NFTs
                creates a sustainable ecosystem for authors, readers, and
                collectors.
              </p>
              <ul className="space-y-4">
                {[
                  "Preserve Tamil literature for future generations",
                  "Empower authors through fair compensation",
                  "Create a global community of Tamil literature enthusiasts",
                  "Leverage AI for content curation and translation",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/about-mission.jpeg"
                alt="Tamil Literature"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We&apos;re a passionate team of developers, literature experts,
              and blockchain enthusiasts working to preserve Tamil literary
              heritage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-400 hover:text-primary"
                    >
                      {platform === "linkedin" && <FaLinkedin size={20} />}
                      {platform === "twitter" && <FaTwitter size={20} />}
                      {platform === "github" && <FaGithub size={20} />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
            {milestones.map((milestone, index) => (
              <motion.div
                key={`milestone-${milestone.year}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative mb-8 ${
                  index % 2 === 0
                    ? "md:ml-auto md:pl-16"
                    : "md:mr-auto md:pr-16"
                } md:w-1/2`}
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="absolute top-6 left-0 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <span className="text-primary font-semibold">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Us in Our Mission
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re an author, developer, or Tamil literature
              enthusiast, we&apos;d love to hear from you.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold shadow-lg"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
