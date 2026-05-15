import { clearCache, loadFromCache, saveToCache } from "@/lib/cache";
import { calculateTotal } from "@/lib/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
  category: string;
  rating: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}


const initialState: CartState = loadFromCache();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calculateTotal(state.items);
      saveToCache({ items: state.items, totalPrice: state.totalPrice });
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotal(state.items);
      saveToCache({ items: state.items, totalPrice: state.totalPrice });
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      state.totalPrice = calculateTotal(state.items);
      saveToCache({ items: state.items, totalPrice: state.totalPrice });
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      clearCache();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;



