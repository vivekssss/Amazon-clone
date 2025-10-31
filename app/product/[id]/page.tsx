'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
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
              <span className="ml-2 text-amazon-blue">
                {product.rating} out of 5
              </span>
              <span className="ml-2 text-gray-600">
                ({product.reviewCount.toLocaleString()} ratings)
              </span>
            </div>

            <hr className="my-4" />

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-medium text-red-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-lg text-red-600 font-medium">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Prime Badge */}
            {product.prime && (
              <div className="flex items-center text-amazon-blue mb-4">
                <Truck className="w-5 h-5 mr-2" />
                <span className="font-bold">FREE delivery</span>
                <span className="ml-1">with Prime</span>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-600 font-medium text-lg">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium text-lg">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">About this item</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-8 h-8 text-amazon-blue mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-8 h-8 text-amazon-blue mb-2" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-8 h-8 text-amazon-blue mb-2" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-amazon hover:bg-orange-600 text-white py-3 px-6 rounded-md transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
