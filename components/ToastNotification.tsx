import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Product } from '@/types';

interface ToastNotificationProps {
  product: Product;
  onClose: () => void;
}

export default function ToastNotification({ product, onClose }: ToastNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-lg shadow-2xl p-4 max-w-md w-full border border-green-200"
    >
      <div className="flex items-start gap-3">
        {/* Success Icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Product Image */}
        <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-1"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Added to Cart
          </p>
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.title}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
