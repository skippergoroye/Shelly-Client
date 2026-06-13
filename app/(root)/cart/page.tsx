"use client";

import { useEffect, useState } from "react";
import SpecialOffer from "./_components/special-offer";
import OrderSummary from "./_components/order-summary";
import ReceiptModal from "./_components/receipt-modal";
import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import type { CartItem } from "@/redux/features/cart/cartSlice";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import CartItems from "./_components/cart-items";
import LoadingBar from "@/components/shared/LoadingBar";

interface SavedItemType {
  id: string;
  image: string;
  title: string;
  price: number;
}

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );

  const [savedItems, setSavedItems] = useState<SavedItemType[]>([
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop",
      title: "L'Essence Noir 50ml",
      price: 120,
    },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleSaveForLater = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setSavedItems([
        ...savedItems,
        {
          id: item.id,
          image: item.images,
          title: item.name,
          price: item.price,
        },
      ]);
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleMoveToCart = (id: string) => {
    const item = savedItems.find((item) => item.id === id);
    if (item) {
      setSavedItems(savedItems.filter((item) => item.id !== id));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const [mounted, setMounted] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    orderNumber: string;
    orderDate: string;
  } | null>(null);

  const handlePaymentSuccess = (reference: any) => {
    const orderNumber = reference?.reference || `ORD-${Date.now()}`;
    const subtotal = totalPrice;
    const shippingCost = 0;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;

    setReceiptData({
      items: cartItems.map((item) => ({ ...item })),
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      orderNumber,
      orderDate: new Date().toLocaleDateString(),
    });
    setReceiptOpen(true);
    dispatch(clearCart());
  };

  const handleCloseReceipt = () => {
    setReceiptOpen(false);
    setReceiptData(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="container-max px-6 md:px-12">
        <div className=" py-12">
          <div className="flex items-center justify-between mb-12">
            <h1 className="lg:text-4xl font-bold text-(--on-surface)">
              Your Shopping Cart
            </h1>

            {mounted && cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 font-semibold hover:underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
         

              {!mounted ? (
                <div className="text-center py-12 place-items-center">
                  <LoadingBar loadingText="Fetchin Loading cart.." />
                </div>
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItems
                    key={item.id}
                    id={item.id}
                    image={item.images}
                    title={item.name}
                    description={item.category}
                    price={item.price}
                    quantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item.id, newQuantity)
                    }
                    onSaveForLater={() => handleSaveForLater(item.id)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-(--on-surface-variant) text-lg">Your cart is empty</p>
                </div>
              )}

              <SpecialOffer />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                totalPrice={totalPrice}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>

  
        </div>
      </div>

      <ReceiptModal
        isOpen={receiptOpen}
        onClose={handleCloseReceipt}
        orderNumber={receiptData?.orderNumber ?? "-"}
        orderDate={receiptData?.orderDate ?? "-"}
        items={receiptData?.items ?? []}
        subtotal={receiptData?.subtotal ?? 0}
        shipping={receiptData?.shipping ?? 0}
        tax={receiptData?.tax ?? 0}
        total={receiptData?.total ?? 0}
      />

      <Footer />
    </>
  );
};

export default CartPage;
