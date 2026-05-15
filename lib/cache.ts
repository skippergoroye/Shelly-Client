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

// ── Cache helpers ──────────────────────────────────────────────────────────────
const CACHE_KEY = "cart_state";
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
  state: CartState;
  expiresAt: number;
}

export const loadFromCache = (): CartState => {
  try {
    const serialized = localStorage.getItem(CACHE_KEY);
    if (!serialized) return { items: [], totalPrice: 0 };

    const entry: CacheEntry = JSON.parse(serialized);

    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(CACHE_KEY); // expired — evict
      return { items: [], totalPrice: 0 };
    }

    return entry.state;
  } catch {
    return { items: [], totalPrice: 0 };
  }
};

export const saveToCache = (state: CartState): void => {
  try {
    const entry: CacheEntry = {
      state,
      expiresAt: Date.now() + CACHE_DURATION_MS,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    console.warn("Cart cache write failed — localStorage may be full.");
  }
};

export const clearCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
};
