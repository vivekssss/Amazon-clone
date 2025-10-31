'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: Product[];
  isOpen: boolean;
  onSelectProduct: (product: Product) => void;
  onClose: () => void;
}

export default function SearchSuggestions({
  suggestions,
  isOpen,
  onSelectProduct,
  onClose,
}: SearchSuggestionsProps) {
  if (!isOpen || suggestions.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={onClose}
          />
          
          {/* Suggestions Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl z-40 max-h-96 overflow-y-auto border border-gray-200"
          >
            <div className="p-2">
              <p className="text-xs text-gray-500 px-3 py-2 font-semibold">
                {suggestions.length} {suggestions.length === 1 ? 'result' : 'results'} found
              </p>
              {suggestions.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {product.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amazon text-amazon'
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({product.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* Prime Badge */}
                  {product.prime && (
                    <div className="flex-shrink-0">
                      <span className="text-xs bg-amazon text-white px-2 py-1 rounded font-semibold">
                        Prime
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
