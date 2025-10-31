'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleSave = () => {
    // Here you would typically save to backend/localStorage
    setIsEditing(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amazon to-orange-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-amazon" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-orange-100">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-amazon px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{formData.name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{formData.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 1234567890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{formData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Address Information</h2>
              <div className="space-y-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      placeholder="Enter your street address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-start space-x-2 text-gray-900">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <span>{formData.address || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter city"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.city || 'Not provided'}</div>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="Enter pincode"
                      maxLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
                    />
                  ) : (
                    <div className="text-gray-900">{formData.pincode || 'Not provided'}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="bg-amazon hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 p-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <motion.a
              href="/orders"
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Your Orders</h3>
              <p className="text-sm text-gray-600">Track, return, or buy things again</p>
            </motion.a>
            <motion.a
              href="/cart"
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Your Cart</h3>
              <p className="text-sm text-gray-600">View and manage your cart items</p>
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Continue Shopping</h3>
              <p className="text-sm text-gray-600">Explore more products</p>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
