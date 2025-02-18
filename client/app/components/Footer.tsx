import { FaTwitter, FaDiscord, FaGithub, FaMedium } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Image src="/logo.png" alt="EzhuthAI" width={100} height={100} />
            <p className="mt-4 text-gray-400 max-w-md">
              Preserving and democratizing Tamil literature through blockchain
              technology and artificial intelligence.
            </p>
            <div className="mt-6 flex space-x-6">
              {[
                { icon: FaTwitter, href: "https://x.com/ezhuthai" },
                { icon: FaDiscord, href: "#" },
                {
                  icon: FaGithub,
                  href: "https://github.com/vmmuthu31/EzhuthAI",
                },
                { icon: FaMedium, href: "#" },
              ].map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-gray-400 hover:text-primary"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About", path: "/about" },
                { name: "Features", path: "#features" },
                { name: "How It Works", path: "#how-it-works" },
                { name: "Team", path: "#team" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "API Reference",
                "Terms of Service",
                "Privacy Policy",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {currentYear} EzhuthAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
