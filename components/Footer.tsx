'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = 2025;

  return (
    <footer className="bg-amazon-dark text-white mt-12">
      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-light hover:bg-amazon-light/80 text-white py-3 text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* Main Footer Content */}
      <div className="bg-amazon-dark py-10">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    About Amazon
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Amazon Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Connect with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-base mb-3">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Sell on Amazon
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Sell under Amazon Accelerator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Protect and Build Your Brand
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Amazon Global Selling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Supply to Amazon
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Fulfilment by Amazon
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Advertise Your Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Amazon Pay on Merchants
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-base mb-3">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Returns Centre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Recalls and Product Safety Alerts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    100% Purchase Protection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Amazon App Download
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white hover:underline">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-amazon-darker py-6 border-t border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-white">amazon</span>
                <span className="text-amazon">.clone</span>
              </Link>
            </div>

            {/* Language & Country */}
            <div className="flex items-center space-x-4">
              <button className="border border-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm">
                🌐 English
              </button>
              <button className="border border-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm">
                🇮🇳 India
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-xs text-gray-400">
            <p>&copy; {currentYear} Amazon Clone. Built with Next.js, React, and TypeScript</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-white hover:underline">
                Conditions of Use
              </Link>
              <Link href="#" className="hover:text-white hover:underline">
                Privacy Notice
              </Link>
              <Link href="#" className="hover:text-white hover:underline">
                Interest-Based Ads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
