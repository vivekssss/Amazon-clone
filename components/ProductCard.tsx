'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import ToastNotification from './ToastNotification';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    
    // Show custom toast with product image
    toast.custom((t) => (
      <ToastNotification
        product={product}
        onClose={() => toast.dismiss(t.id)}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onMouseEnter={() => setShowQuickView(true)}
      onMouseLeave={() => setShowQuickView(false)}
      className="bg-white p-4 rounded-lg shadow hover:shadow-2xl transition-all relative group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 mb-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
          {/* Quick View Button */}
          {showQuickView && onQuickView && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="absolute inset-x-0 bottom-2 mx-auto w-32 bg-white hover:bg-gray-100 text-gray-900 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Quick View
            </motion.button>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-amazon-blue">
          {product.title}
        </h3>
      </Link>

      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-amazon text-amazon'
                  : 'fill-gray-300 text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-amazon-blue">
          {product.reviewCount.toLocaleString()}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-medium text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {product.prime && (
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Truck className="w-4 h-4 text-amazon-blue mr-1" />
          <span className="font-bold text-amazon-blue">FREE</span>
          <span className="ml-1">delivery</span>
        </div>
      )}

      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-2 px-4 rounded-md transition-all font-medium flex items-center justify-center ${
          isAdded
            ? 'bg-green-600 text-white'
            : 'bg-amazon hover:bg-orange-600 text-white'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Added to Cart
          </>
        ) : (
          'Add to Cart'
        )}
      </motion.button>
    </motion.div>
  );
}
