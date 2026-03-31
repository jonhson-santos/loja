import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, User, CartItem, Category } from './types';
import { products as initialProducts } from './data/products';

interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImage: string;
  shopAllBanner: string;
  visibleCategories: string[]; // List of categories to show on home
}

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  brands: string[];
  setBrands: React.Dispatch<React.SetStateAction<string[]>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  homeContent: HomeContent;
  setHomeContent: React.Dispatch<React.SetStateAction<HomeContent>>;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  addBrand: (brand: string) => void;
  deleteBrand: (brand: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string) => void;
  clearCart: () => void;
}

const initialHomeContent: HomeContent = {
  heroTitle: 'NUTRILAB',
  heroSubtitle: 'Sua jornada para a performance máxima começa aqui. Suplementação de precisão laboratorial.',
  heroButtonText: 'Explorar Catálogo',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g',
  shopAllBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g',
  visibleCategories: ['Whey Protein', 'Creatina', 'Pré-treino', 'Vitaminas', 'Roupas', 'Acessórios']
};

const initialBrands = ['Optimum Nutrition', 'Dux Nutrition', 'Integralmedica', 'Max Titanium', 'Growth Supplements'];
const initialCategories: Category[] = [
  { name: 'Whey Protein', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' },
  { name: 'Creatina', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' },
  { name: 'Pré-treino', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' },
  { name: 'Vitaminas', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' },
  { name: 'Roupas', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' },
  { name: 'Acessórios', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' }
];

const initialUser: User = {
  name: 'Alexandre Cleo',
  email: 'alexandre@cleolab.com',
  phone: '+55 (11) 98765-4321',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBauBE9_EPIBztKWyt6LWpyn8qBHSe3sIc01i6WsIK9DJBXMBPcJo7VAysP2jeqgl0pwORImjQ0hq3WKUeAVpBB_AHB8lhKh4YVIDPisKJ1qd1B_1fA8UkkfU7bv0DFc_-PwLdipzXLa-8kx098WbuhSeLPc5dLDIKfLYCOKViNXmhleUDOc3aeItKSr4msoAJ7TRvZ-t8OGb7IxL9HJupkkUKliIPZq01cruQ6hG8GQYHogDMW8NdC9ZlNl7eW-SqikwpXAT-w7jk',
  favorites: [],
  cart: [],
  preferences: {
    notifications: true,
    stockAlerts: true,
    darkMode: false
  }
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [brands, setBrands] = useState<string[]>(initialBrands);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [user, setUser] = useState<User>(initialUser);
  const [homeContent, setHomeContent] = useState<HomeContent>(initialHomeContent);

  useEffect(() => {
    if (user.preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.preferences.darkMode]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addBrand = (brand: string) => {
    if (!brands.includes(brand)) {
      setBrands(prev => [...prev, brand]);
    }
  };

  const deleteBrand = (brand: string) => {
    setBrands(prev => prev.filter(b => b !== brand));
  };

  const addToCart = (product: Product) => {
    setUser(prev => {
      const existingItem = prev.cart.find(item => item.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...product, quantity: 1 }]
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setUser(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setUser(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  };

  const toggleFavorite = (productId: string) => {
    setUser(prev => {
      const isFavorite = prev.favorites.includes(productId);
      if (isFavorite) {
        return {
          ...prev,
          favorites: prev.favorites.filter(id => id !== productId)
        };
      }
      return {
        ...prev,
        favorites: [...prev.favorites, productId]
      };
    });
  };

  const clearCart = () => {
    setUser(prev => ({ ...prev, cart: [] }));
  };

  return (
    <StoreContext.Provider value={{ 
      products, 
      setProducts, 
      brands, 
      setBrands, 
      user, 
      setUser, 
      categories,
      setCategories,
      homeContent,
      setHomeContent,
      addProduct, 
      updateProduct, 
      deleteProduct,
      addBrand,
      deleteBrand,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleFavorite,
      clearCart
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
