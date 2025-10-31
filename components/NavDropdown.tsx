'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavDropdownProps {
  title: string;
  items: { label: string; href: string }[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function NavDropdown({
  title,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: NavDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="hover:border border-white px-2 py-1 whitespace-nowrap">
        {title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-1 w-64 bg-white text-gray-900 rounded-lg shadow-xl z-[100] py-2"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
