// components/Footer.tsx
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-100 border-t border-orange-200 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Text */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-orange-700">FoodHub</h2>
          <p className="text-sm text-gray-600 mt-1">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 justify-center">
          <a
            href="#"
            className="text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="border-t border-orange-200 text-center text-xs text-gray-500 py-3">
        Built with Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
