'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (pincode: string) => void;
}

export default function LocationModal({ isOpen, onClose, onLocationSelect }: LocationModalProps) {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for Indian pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }
    
    setError('');
    onLocationSelect(pincode);
    onClose();
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
            className="fixed inset-0 bg-black/60 z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white rounded-lg shadow-2xl z-[101] p-4 sm:p-6 mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Choose your location</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6">
              Select a delivery location to see product availability and delivery options
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter an Indian pincode
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="pincode"
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setError('');
                    }}
                    maxLength={6}
                    placeholder="e.g., 110001"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent transition-all text-gray-900"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-amazon hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Apply
              </motion.button>
            </form>

            {/* Sign in option */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-colors">
                Sign in to see your addresses
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
