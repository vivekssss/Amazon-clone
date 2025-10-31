# Amazon Clone - E-Commerce Platform

A modern, fully-functional Amazon clone built with Next.js 14, TypeScript, and TailwindCSS. This project features a beautiful UI, shopping cart functionality, product pages, and a complete checkout flow.

![Amazon Clone](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🛍️ **Product Catalog** - Browse through a curated collection of products
- 🔍 **Product Details** - View detailed information about each product
- 🛒 **Shopping Cart** - Add, remove, and update product quantities
- 💳 **Checkout Flow** - Complete checkout process with form validation
- 📱 **Responsive Design** - Fully responsive across all devices
- 🎨 **Modern UI** - Clean, Amazon-inspired interface with TailwindCSS
- 💾 **Local Storage** - Cart persists across browser sessions
- ⚡ **Fast Performance** - Built with Next.js 14 App Router

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd c:\reactjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
c:\reactjs/
├── app/                      # Next.js App Router
│   ├── cart/                 # Shopping cart page
│   ├── checkout/             # Checkout page
│   ├── product/[id]/         # Dynamic product detail page
│   ├── layout.tsx            # Root layout with header/footer
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # Reusable components
│   ├── Header.tsx            # Navigation header
│   └── ProductCard.tsx       # Product card component
├── context/                  # React Context
│   └── CartContext.tsx       # Shopping cart state management
├── data/                     # Mock data
│   └── products.ts           # Product catalog
├── lib/                      # Utility functions
│   └── utils.ts              # Helper functions
├── types/                    # TypeScript types
│   └── index.ts              # Type definitions
└── public/                   # Static assets
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Image Optimization:** Next.js Image component

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Shopping Cart
- Add products to cart from home page or product detail page
- Update quantities directly in the cart
- Remove items from cart
- Cart data persists in localStorage
- Real-time cart total calculation

### Product Pages
- Dynamic routing for individual products
- Product images, descriptions, and ratings
- Stock availability status
- Quantity selector
- Prime delivery badge

### Checkout
- Complete shipping information form
- Payment information (demo only - no real processing)
- Order summary with itemized list
- Form validation

## 🎨 Customization

### Adding New Products

Edit `data/products.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  title: 'Product Name',
  price: 99.99,
  originalPrice: 129.99,
  rating: 4.5,
  reviewCount: 1234,
  image: 'https://image-url.com',
  category: 'Category',
  description: 'Product description',
  prime: true,
  inStock: true,
}
```

### Styling

The project uses TailwindCSS with custom Amazon-themed colors defined in `tailwind.config.ts`:

- `amazon` - Orange (#FF9900)
- `amazon-dark` - Dark blue (#131921)
- `amazon-light` - Light blue (#232F3E)
- `amazon-blue` - Blue (#146EB4)

## 🔒 Security Note

This is a demo application. The checkout process does not process real payments. In a production environment, you would need to:

- Implement proper authentication
- Add backend API for product management
- Integrate a payment gateway (Stripe, PayPal, etc.)
- Add server-side validation
- Implement proper security measures

## 📝 License

This is a demo project for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

If you have any questions or run into issues, please check the Next.js documentation or create an issue in the repository.

---

**Built with ❤️ using Next.js and TailwindCSS**
