import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../StoreContext';

interface ProductCardProps {
  product: Product;
  key?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, user, addToCart } = useStore();
  const isFavorite = user.favorites.includes(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className="bg-white rounded-[1.25rem] p-3 flex flex-col w-full max-w-[240px] md:max-w-[260px] cursor-pointer border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative"
    >
      <div className="relative aspect-square rounded-[1rem] bg-slate-50 overflow-hidden mb-3">
        <motion.img 
          animate={isAdding ? { scale: [1, 0.8, 1], opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 0.5 }}
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
          referrerPolicy="no-referrer" 
          loading="lazy" 
        />
        
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

          <button 
            onClick={handleToggleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
              isFavorite ? 'bg-primary text-white' : 'bg-white text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "" }}>
              favorite
            </span>
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary shadow-sm transition-all">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </div>
        </div>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.bestSeller && (
            <span className="bg-primary text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Top
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <p className="text-[9px] font-black text-primary/70 uppercase tracking-wider">{product.brand}</p>
        </div>
        <h4 className="font-headline font-bold text-on-surface text-[14px] leading-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h4>
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase">A partir de</span>
          <span className="text-[16px] font-black text-primary tracking-tight">{product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className={`w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-md ${
            isAdding 
              ? 'bg-green-500 text-white shadow-green-500/20' 
              : 'bg-primary text-white hover:bg-primary-dark shadow-primary/10'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isAdding ? 'check' : 'shopping_cart'}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
