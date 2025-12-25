import { create } from 'zustand';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
  selectedPrice?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedWeight?: string, selectedPrice?: number) => void;
  removeItem: (productId: string, selectedWeight?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedWeight?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const getCartItemKey = (productId: string, selectedWeight?: string) => {
  return selectedWeight ? `${productId}-${selectedWeight}` : productId;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, quantity = 1, selectedWeight, selectedPrice) => {
    set((state) => {
      const existingItem = state.items.find(item => 
        item.product.id === product.id && item.selectedWeight === selectedWeight
      );
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id && item.selectedWeight === selectedWeight
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        items: [...state.items, { product, quantity, selectedWeight, selectedPrice }],
      };
    });
  },

  removeItem: (productId, selectedWeight) => {
    set((state) => ({
      items: state.items.filter(item => 
        !(item.product.id === productId && item.selectedWeight === selectedWeight)
      ),
    }));
  },

  updateQuantity: (productId, quantity, selectedWeight) => {
    if (quantity <= 0) {
      get().removeItem(productId, selectedWeight);
      return;
    }
    
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId && item.selectedWeight === selectedWeight
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  openCart: () => set({ isOpen: true }),
  
  closeCart: () => set({ isOpen: false }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => {
        const price = item.selectedPrice ?? item.product.price;
        return total + price * item.quantity;
      },
      0
    );
  },
}));
