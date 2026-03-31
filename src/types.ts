export interface Category {
  name: string;
  bannerImage: string;
}

export interface ProductVariation {
  id: string;
  weight: string;
  price: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  img: string;
  affiliateUrl: string;
  brand?: string;
  category: string;
  inStock?: boolean;
  bestSeller?: boolean;
  specialOffer?: string;
  description?: string;
  proteinPerDose?: string;
  bcaas?: string;
  lactose?: string;
  variations?: ProductVariation[];
  gallery?: string[];
  videoUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favorites: string[]; // Array of product IDs
  cart: CartItem[];
  preferences: {
    notifications: boolean;
    stockAlerts: boolean;
    darkMode: boolean;
  };
}
