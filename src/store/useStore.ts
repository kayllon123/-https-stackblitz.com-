import { create } from 'zustand';
import { Product, Order, OrderItem } from '../types';

interface Store {
  products: Product[];
  orders: Order[];
  cart: OrderItem[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  submitOrder: (customerName: string, customerPhone: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  orders: [],
  cart: [],
  
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
    
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
    
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    }),
    
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
    
  updateCartItemQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    })),
    
  clearCart: () => set({ cart: [] }),
  
  submitOrder: (customerName, customerPhone) =>
    set((state) => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        items: [...state.cart],
        status: 'pending',
        total: state.cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        customerName,
        customerPhone,
        createdAt: new Date(),
      };
      return {
        orders: [...state.orders, newOrder],
        cart: [],
      };
    }),
    
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
}));