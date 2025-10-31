export function ProductCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow animate-pulse">
      <div className="relative h-48 mb-3 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="flex items-center mb-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );
}

export function BannerSkeleton() {
  return (
    <div className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg mb-8 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      
      {/* Content placeholders */}
      <div className="absolute inset-0 p-12 flex flex-col justify-center space-y-4">
        <div className="h-8 w-3/4 bg-gray-300 rounded-lg" />
        <div className="h-6 w-1/2 bg-gray-300 rounded-lg" />
        <div className="h-12 w-40 bg-gray-300 rounded-lg mt-4" />
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-gray-400 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
