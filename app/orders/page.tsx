'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-28',
    status: 'Delivered',
    total: 139779,
    items: [
      {
        id: '1',
        title: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&q=80',
        quantity: 2,
        price: 24990,
      },
      {
        id: '2',
        title: 'Samsung 65" QLED 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
        quantity: 1,
        price: 89799,
      },
    ],
  },
  {
    id: 'ORD-2025-002',
    date: '2025-01-25',
    status: 'In Transit',
    total: 29990,
    items: [
      {
        id: '3',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
        quantity: 1,
        price: 29990,
      },
    ],
  },
  {
    id: 'ORD-2025-003',
    date: '2025-01-20',
    status: 'Processing',
    total: 13999,
    items: [
      {
        id: '4',
        title: 'Kindle Paperwhite (16 GB) – Now with a 6.8" display',
        image: 'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=500&q=80',
        quantity: 1,
        price: 13999,
      },
    ],
  },
];

const statusConfig = {
  'Delivered': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  'In Transit': { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  'Processing': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'All' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track, return, or buy things again</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {['All', 'Delivered', 'In Transit', 'Processing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedFilter === filter
                      ? 'bg-amazon text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Link
              href="/"
              className="inline-block bg-amazon hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
              const statusColor = statusConfig[order.status as keyof typeof statusConfig].color;
              const statusBg = statusConfig[order.status as keyof typeof statusConfig].bg;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Order Placed</p>
                          <p className="font-medium text-gray-900">
                            {new Date(order.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Order ID</p>
                          <p className="font-medium text-gray-900">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status</p>
                          <div className={`inline-flex items-center space-x-1 ${statusColor}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-medium">{order.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-amazon-blue line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                              Quantity: {item.quantity} | {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="text-sm text-amazon-blue hover:text-amazon-dark font-medium">
                              Buy Again
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-900">
                              View Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-amazon hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                        Track Package
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors">
                        View Invoice
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors">
                          Return Items
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
