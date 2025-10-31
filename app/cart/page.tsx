'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleRemoveClick = (itemId: string) => {
    setItemToRemove(itemId);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      const item = cart.find(i => i.id === itemToRemove);
      removeFromCart(itemToRemove);
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-2xl p-4 max-w-md w-full border-l-4 border-red-500"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🗑️</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Removed from Cart
              </p>
              <p className="text-xs text-gray-600 line-clamp-2">
                {item?.title}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      ), {
        duration: 3000,
      });
    }
    setShowConfirmDialog(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
    setItemToRemove(null);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-block bg-amazon hover:bg-orange-600 text-white py-3 px-6 rounded-md transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Shopping Cart
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
          <AnimatePresence>
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-base sm:text-lg font-medium hover:text-amazon-blue mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <p className="text-green-600 font-medium mb-2 text-sm">In Stock</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md w-fit">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        −
                      </motion.button>
                      <span className="px-3 sm:px-4 py-1 border-x border-gray-300 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        +
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemoveClick(item.id)}
                      className="flex items-center text-red-600 hover:text-red-700 text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </motion.button>
                  </div>
                  
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6 lg:sticky lg:top-4"
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({totalItems}):</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Order Total:</span>
                <span className="text-red-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/checkout"
                className="block w-full bg-amazon hover:bg-orange-600 text-white py-3 px-6 rounded-md transition-colors font-medium text-center"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
            
            <Link
              href="/"
              className="block w-full text-center text-amazon-blue hover:text-amazon-dark mt-4"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </div>
  );
}
