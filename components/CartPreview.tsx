'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface CartPreviewProps {
  isOpen: boolean;
}

export default function CartPreview({ isOpen }: CartPreviewProps) {
  const { cart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white text-gray-900 rounded-lg shadow-2xl z-50 border border-gray-200 max-w-[calc(100vw-2rem)]"
        >
          {cart.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-medium">Your cart is empty</p>
              <Link
                href="/"
                className="inline-block mt-4 text-amazon-blue hover:text-amazon-dark text-sm font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">
                  Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </h3>
              </div>

              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto">
                {cart.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {cart.length > 3 && (
                  <div className="p-3 text-center text-sm text-gray-600 bg-gray-50">
                    +{cart.length - 3} more {cart.length - 3 === 1 ? 'item' : 'items'}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Subtotal:</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="block w-full bg-amazon hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
