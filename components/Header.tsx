'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, MapPin, Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useSearch, categories } from '@/context/SearchContext';
import LocationModal from './LocationModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } = useSearch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [location, setLocation] = useState('India');
  const router = useRouter();

  // Load location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('delivery-location');
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const handleLocationSelect = (pincode: string) => {
    setLocation(pincode);
    localStorage.setItem('delivery-location', pincode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push('/');
    }
  };

  return (
    <header className="bg-amazon-dark text-white">
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onLocationClick={() => setShowLocationModal(true)}
      />

      {/* Top Header */}
      <div className="bg-amazon-dark">
        <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 hover:border border-white rounded"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-white">amazon</span>
              <span className="text-amazon">.clone</span>
            </div>
          </Link>

          {/* Deliver to */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="hidden md:flex items-center space-x-1 hover:border border-white px-2 py-1 cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
            <div className="text-xs text-left">
              <div className="text-gray-300">Deliver to</div>
              <div className="font-bold">{location}</div>
            </div>
          </button>

          {/* Location Modal */}
          <LocationModal
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
            onLocationSelect={handleLocationSelect}
          />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-2 md:mx-4 hidden sm:block">
            <div className="flex relative">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r-2 border-amazon focus:outline-none hover:bg-gray-300 transition-colors flex items-center space-x-1 w-32"
                >
                  <span className="text-sm font-medium truncate flex-1 text-left">{selectedCategory}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showCategoryDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowCategoryDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl z-20 py-2 max-h-96 overflow-y-auto"
                      >
                        {categories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowCategoryDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              selectedCategory === category
                                ? 'bg-amazon-light text-white font-semibold'
                                : 'text-gray-900'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon Clone"
                className="flex-1 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amazon"
              />
              
              {/* Search Button */}
              <button
                type="submit"
                className="bg-amazon hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Account */}
            <div className="hidden md:block relative">
              {isAuthenticated ? (
                <div
                  className="hover:border border-white px-2 py-1 cursor-pointer"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="text-xs">Hello, {user?.name}</div>
                  <div className="font-bold text-sm flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Account
                  </div>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-1 w-48 bg-white text-gray-900 rounded-lg shadow-xl z-50"
                      >
                        <div className="p-2">
                          <div className="px-3 py-2 text-sm font-semibold border-b">
                            {user?.email}
                          </div>
                          <Link
                            href="/orders"
                            className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          >
                            Your Orders
                          </Link>
                          <Link
                            href="/account"
                            className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          >
                            Your Account
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center text-red-600"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hover:border border-white px-2 py-1 cursor-pointer block"
                >
                  <div className="text-xs">Hello, Sign in</div>
                  <div className="font-bold text-sm">Account & Lists</div>
                </Link>
              )}
            </div>

            {/* Orders */}
            <div className="hidden md:block hover:border border-white px-2 py-1 cursor-pointer">
              <div className="text-xs">Returns</div>
              <div className="font-bold text-sm">& Orders</div>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center hover:border border-white px-2 py-1 relative group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <ShoppingCart className="w-8 h-8" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-amazon text-amazon-dark font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
              <span className="ml-2 font-bold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="bg-amazon-light">
        <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center space-x-6 text-sm">
          <button className="flex items-center space-x-1 hover:border border-white px-2 py-1">
            <Menu className="w-5 h-5" />
            <span className="font-bold">All</span>
          </button>
          <Link href="/" className="hover:border border-white px-2 py-1">
            Today's Deals
          </Link>
          <Link href="/" className="hover:border border-white px-2 py-1">
            Customer Service
          </Link>
          <Link href="/" className="hover:border border-white px-2 py-1">
            Registry
          </Link>
          <Link href="/" className="hover:border border-white px-2 py-1">
            Gift Cards
          </Link>
          <Link href="/" className="hover:border border-white px-2 py-1">
            Sell
          </Link>
        </div>
      </div>
    </header>
  );
}
