'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const categories = [
  'All',
  'Electronics',
  'Books',
  'Fashion',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Computers',
];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
