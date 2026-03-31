import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useStore } from '../StoreContext';

export default function BrandPage() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const { products, user, toggleFavorite } = useStore();

  const brandProducts = products.filter(p => p.brand === brandName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pt-6 md:pt-10 px-4 md:px-6 max-w-7xl mx-auto font-body"
    >
        {/* Brand Intro Section */}
        <section className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-surface-container rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-outline-variant/10">
            {brandName?.toLowerCase().includes('growth') ? (
              <img className="w-full h-full object-cover" alt="Brand Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCREiqyAM4gmVqvDM-4KEtbwRVRgdT_o2OQiTqG7WybKjR8J2PWjEdf1UGm632yQKvuN0BcA05p_dHi4gdBFAaTRrR0p7lQchoNE8r9Yd6CLIcyDyYeJs7ulvT7wiNgrRbQ8G7uSEm561CAEcyTkdP_zm6yz88m1o-GDbPtG3WBl_NKCZ0iQNAZ_y5x1A9mR6aLxrRG9e7LEKUL_ieNqdgiAF0RGy_Ox6B8FwcQpFrheckZrKbiBIXfOQvl27lG1x1-6foTxz6gf50"/>
            ) : (
              <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                <span className="text-2xl font-black text-primary">{brandName?.[0]}</span>
              </div>
            )}
          </div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2 uppercase">{brandName}</h2>
          <p className="text-on-surface-variant text-sm max-w-xs mx-auto leading-relaxed">
            Precision-engineered formulas for maximum muscle recovery and performance optimization.
          </p>
          <div className="mt-6 flex gap-2 overflow-x-auto w-full no-scrollbar pb-2 px-2 justify-center">
            <span className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container text-[11px] font-bold rounded-full whitespace-nowrap uppercase tracking-wider">In Stock</span>
            <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full whitespace-nowrap uppercase tracking-wider">Lab Tested</span>
            <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full whitespace-nowrap uppercase tracking-wider">Bestsellers</span>
          </div>
        </section>

        {/* Product Grid (2-Column) */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {brandProducts.map((product) => {
            const isFavorite = user?.favorites.includes(product.id);
            return (
              <div key={product.id} className="bg-surface-container-lowest rounded-xl p-3 flex flex-col group transition-all duration-300">
                <div 
                  className="relative aspect-square mb-4 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={product.name} 
                    src={product.img}
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span 
                        className={`material-symbols-outlined text-[18px] ${isFavorite ? 'text-error' : ''}`}
                        style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  {product.specialOffer && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-primary text-on-primary text-[9px] font-black rounded-sm uppercase tracking-tighter">
                        {product.specialOffer}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 
                    className="font-headline font-bold text-sm text-on-surface leading-snug line-clamp-2 mb-1 uppercase tracking-tight cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-primary font-extrabold text-lg tracking-tighter mt-auto">{product.price}</p>
                  <button 
                    onClick={() => handleProductClick(product.id)}
                    className="mt-3 w-full py-2.5 bg-primary text-on-primary text-[11px] font-bold rounded-lg uppercase tracking-widest hover:bg-primary-dim transition-colors active:scale-95 duration-100"
                  >
                    Ver Produto
                  </button>
                </div>
              </div>
            );
          })}
        </div>
    </motion.main>
  );
}
