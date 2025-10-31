'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, User, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { categories } from '@/context/SearchContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, onLocationClick }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto md:hidden"
          >
            {/* Header */}
            <div className="bg-amazon-dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <User className="w-8 h-8" />
                    <div>
                      <p className="text-sm">Hello,</p>
                      <p className="font-bold">{user?.name}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <User className="w-8 h-8" />
                    <div>
                      <p className="text-sm">Hello, Sign in</p>
                    </div>
                  </>
                )}
              </div>
              <button onClick={onClose} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {/* Account Section */}
              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full bg-amazon hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-center mb-4 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Location */}
              <button
                onClick={() => {
                  onLocationClick();
                  onClose();
                }}
                className="w-full flex items-center space-x-3 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Choose Location</span>
              </button>

              {/* Categories */}
              <div className="mt-4">
                <h3 className="font-bold text-gray-900 mb-3">Shop by Category</h3>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="/"
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-amazon-blue hover:bg-gray-50 px-2 rounded transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* User Links */}
              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Your Account</h3>
                  <Link
                    href="/orders"
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-amazon-blue hover:bg-gray-50 px-2 rounded transition-colors"
                  >
                    Your Orders
                  </Link>
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-amazon-blue hover:bg-gray-50 px-2 rounded transition-colors"
                  >
                    Your Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-600 hover:bg-gray-50 px-2 rounded transition-colors flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Help & Settings</h3>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-amazon-blue hover:bg-gray-50 px-2 rounded transition-colors flex items-center"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Your Cart
                </Link>
                <Link
                  href="#"
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-amazon-blue hover:bg-gray-50 px-2 rounded transition-colors"
                >
                  Customer Service
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
