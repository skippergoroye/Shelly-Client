# E-Commerce Platform

A modern, responsive e-commerce web application built with Next.js and React. This project provides a complete shopping experience, from browsing products to adding them to a cart and securely checking out.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React 19
- **State Management:** Redux Toolkit (`react-redux`) for client state management and Redux Toolkit Query (`react-redux-toolkit-query`) for server state management
- **Styling:** Tailwind CSS, PostCSS, and Shadcn UI (with Radix UI primitives)
- **Payment Integration:** Paystack (`react-paystack`)
- **Icons:** Lucide React & React Icons
- **Forms:** React Hook Form

## ✨ Key Features

- **Landing Page:** Engaging hero section, product categories, trending items, and special features to capture users' attention.
- **Product Catalog:** View products, details, and add them to the cart.
- **Advanced Shopping Cart:**
  - Increase/decrease product quantities.
  - Remove items or clear the entire cart.
  - **Save for Later:** Move items from the cart to a "Saved for Later" list, and vice versa.
  - Real-time order summary calculations (Subtotal, Tax, Shipping).
- **Secure Checkout:** Integrated with Paystack to process payments securely in Nigerian Naira (NGN).
- **Order Receipts:** Post-payment success modal showing order number, date, tax, subtotal, and total amount.

## 📁 Project Structure

- `app/`: Next.js App Router setup including global layout, page definitions, and routing (`(root)/cart`, `(root)/products`).
- `components/`: Reusable UI components grouped logically (e.g., `landing-page/`, `ui/`, `shared/`).
- `redux/`: Redux Toolkit store configuration and slices (like `cartSlice` for managing cart state).
- `lib/` & `hooks/`: Utility functions and custom React hooks.
- `constants/`: Hardcoded assets and content variables used across the application.

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file and add your Paystack public key:
   ```env
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
