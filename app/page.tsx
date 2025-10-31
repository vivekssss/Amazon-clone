'use client';

import { useState, useEffect, useMemo } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import BannerScroller from '@/components/BannerScroller';
import FilterSidebar from '@/components/FilterSidebar';
import ProductDrawer from '@/components/ProductDrawer';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';
import { products } from '@/data/products';
import { useSearch } from '@/context/SearchContext';
import { Product } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, selectedCategory } = useSearch();
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Preview modal
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Simulate loading products
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Clear all filters
  const handleClearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedRating(0);
    setPrimeOnly(false);
    setInStockOnly(false);
  };

  // Handle quick view
  const handleQuickView = (product: Product) => {
    setPreviewProduct(product);
    setShowPreview(true);
  };

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((product) => product.rating >= selectedRating);
    }

    // Filter by prime
    if (primeOnly) {
      filtered = filtered.filter((product) => product.prime);
    }

    // Filter by stock
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, selectedRating, primeOnly, inStockOnly]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        {/* Banner Scroller */}
        <BannerScroller />

        {/* Main Content with Sidebar */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              primeOnly={primeOnly}
              setPrimeOnly={setPrimeOnly}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Header with Mobile Filter Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : selectedCategory !== 'All'
                  ? `${selectedCategory}`
                  : 'Featured Products'}
              </h2>
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductGridSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={handleClearFilters}
                  className="bg-amazon hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              primeOnly={primeOnly}
              setPrimeOnly={setPrimeOnly}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onClearFilters={handleClearFilters}
              isMobile
              onClose={() => setShowMobileFilters(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Product Preview Drawer */}
      <ProductDrawer
        product={previewProduct}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}
