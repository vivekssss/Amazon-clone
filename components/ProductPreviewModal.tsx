'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, Truck, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import ToastNotification from './ToastNotification';

interface ProductPreviewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductPreviewModal({
  product,
  isOpen,
  onClose,
}: ProductPreviewModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.custom((t) => (
      <ToastNotification product={product} onClose={() => toast.dismiss(t.id)} />
    ));
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
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-[101] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative">
                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                {product.prime && (
                  <div className="absolute top-4 left-4 bg-amazon text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Prime
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <div className="flex-1">
                  {/* Category */}
                  <p className="text-sm text-amazon-blue font-medium mb-2">
                    {product.category}
                  </p>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amazon text-amazon'
                              : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-amazon-blue font-medium">
                      {product.rating}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviewCount.toLocaleString()} ratings)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <span className="text-sm text-green-600 font-semibold">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Delivery Info */}
                  {product.prime && (
                    <div className="flex items-center text-sm text-gray-700 mb-6 bg-blue-50 p-3 rounded-lg">
                      <Truck className="w-5 h-5 text-amazon-blue mr-2" />
                      <span>
                        <span className="font-bold text-amazon-blue">FREE</span> delivery for Prime members
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  <p className={`text-sm font-semibold mb-6 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-amazon hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </motion.button>

                  <Link
                    href={`/product/${product.id}`}
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
