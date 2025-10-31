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
    <div className="relative w-full h-[400px] bg-gray-200 animate-pulse rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 bg-gray-300 rounded w-48"></div>
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
