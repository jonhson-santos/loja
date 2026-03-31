import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../StoreContext';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
  const { user, products, toggleFavorite } = useStore();
  const navigate = useNavigate();

  const favoriteProducts = products.filter(p => user.favorites.includes(p.id));

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pt-6 md:pt-10 px-4 md:px-6 max-w-7xl mx-auto font-body"
    >
        {/* Intro Section */}
        <section className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-surface-container rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-outline-variant/10">
            <div className="w-full h-full bg-primary/5 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2 uppercase">Meus Favoritos</h2>
          <p className="text-on-surface-variant text-sm max-w-xs mx-auto leading-relaxed">
            {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item salvo' : 'itens salvos'} para sua jornada de performance.
          </p>
        </section>

        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h2 className="text-lg font-bold text-on-background">Sua lista está vazia</h2>
            <p className="text-sm text-on-surface-variant mt-2 mb-6">Salve seus produtos favoritos para encontrá-los facilmente depois.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              Explorar Produtos
            </button>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {favoriteProducts.map((product) => {
                const isFavorite = user?.favorites.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-surface-container-lowest rounded-xl p-3 flex flex-col group transition-all duration-300"
                  >
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
    </motion.main>
  );
}
