import { create } from 'zustand';
import axios from 'axios';

// Interfaces based on DummyJSON response
interface User { id: number; firstName: string; lastName: string; email: string; gender: string; phone: string; company: { name: string; title: string }; }
interface Product { id: number; title: string; price: number; category: string; thumbnail: string; rating: number; }

interface AppState {
  // --- Auth State ---
  token: string | null;
  isAuthenticated: boolean;
  user: any | null; // Store current user info
  setAuth: (token: string, user: any) => void;
  logout: () => void;

  // --- Users Data State ---
  users: User[];
  totalUsers: number;
  isUsersLoading: boolean;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;

  // --- Products Data State ---
  products: Product[];
  totalProducts: number;
  isProductsLoading: boolean;
  fetchProducts: (limit: number, skip: number, search?: string, category?: string) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  // Initial State
  token: null,
  isAuthenticated: false,
  user: null,
  users: [],
  totalUsers: 0,
  isUsersLoading: false,
  products: [],
  totalProducts: 0,
  isProductsLoading: false,

  // Actions
  setAuth: (token, user) => set({ token, isAuthenticated: true, user }),
  logout: () => {
    localStorage.removeItem('token'); // Optional safety clear
    set({ token: null, isAuthenticated: false, user: null });
  },

  fetchUsers: async (limit, skip, search = '') => {
    set({ isUsersLoading: true });
    try {
      const url = search 
        ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      
      const res = await axios.get(url);
      set({ users: res.data.users, totalUsers: res.data.total, isUsersLoading: false });
    } catch (error) {
      console.error("Failed to fetch users", error);
      set({ isUsersLoading: false });
    }
  },

  fetchProducts: async (limit, skip, search = '', category = '') => {
    set({ isProductsLoading: true });
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      if (category) url = `https://dummyjson.com/products/category/${category}`; 
      
      const res = await axios.get(url);
      set({ products: res.data.products, totalProducts: res.data.total, isProductsLoading: false });
    } catch (error) {
      console.error("Failed to fetch products", error);
      set({ isProductsLoading: false });
    }
  },
}));