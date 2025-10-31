'use client';

import { motion } from 'framer-motion';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedRating: number;
  setSelectedRating: (rating: number) => void;
  primeOnly: boolean;
  setPrimeOnly: (value: boolean) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  primeOnly,
  setPrimeOnly,
  inStockOnly,
  setInStockOnly,
  onClearFilters,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 200000 },
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { label: 'Over ₹50,000', min: 50000, max: 200000 },
  ];

  const ratings = [4, 3, 2, 1];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="text-sm text-amazon-blue hover:text-amazon-dark underline"
      >
        Clear all filters
      </button>

      {/* Prime */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Prime</h4>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={primeOnly}
            onChange={(e) => setPrimeOnly(e.target.checked)}
            className="w-4 h-4 text-amazon border-gray-300 rounded focus:ring-amazon"
          />
          <span className="text-sm text-gray-700">Prime Eligible</span>
        </label>
      </div>

      {/* Availability */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 text-amazon border-gray-300 rounded focus:ring-amazon"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Price</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={priceRange[0] === range.min && priceRange[1] === range.max}
                onChange={() => setPriceRange([range.min, range.max])}
                className="w-4 h-4 text-amazon border-gray-300 focus:ring-amazon"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-900 mb-3">Customer Reviews</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === 0}
              onChange={() => setSelectedRating(0)}
              className="w-4 h-4 text-amazon border-gray-300 focus:ring-amazon"
            />
            <span className="text-sm text-gray-700">All Ratings</span>
          </label>
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="w-4 h-4 text-amazon border-gray-300 focus:ring-amazon"
              />
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? 'fill-amazon text-amazon'
                          : 'fill-gray-300 text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-700">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto p-6"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      {content}
    </div>
  );
}
