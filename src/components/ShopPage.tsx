import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../StoreContext';
import ProductCard from './ProductCard';

export default function ShopPage() {
  const { products, categories, brands } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'Todas' || product.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto pt-6 px-4 md:px-6 pb-24 space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-headline font-black text-3xl tracking-tight text-on-background">Catálogo Completo</h2>
        <p className="text-on-surface-variant text-sm">Explore nossa seleção premium de suplementos das melhores marcas oficiais.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-primary">Categorias</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setSelectedCategory('Todos')}
                className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === 'Todos' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedCategory === cat.name ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-primary">Marcas Oficiais</h3>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setSelectedBrand('Todas')}
                className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedBrand === 'Todas' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              >
                Todas
              </button>
              {brands.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedBrand === brand ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-slate-100">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">search_off</span>
              <h3 className="font-headline font-bold text-lg mb-2">Nenhum produto encontrado</h3>
              <p className="text-on-surface-variant text-sm">Tente ajustar os filtros para ver mais resultados.</p>
              <button 
                onClick={() => { setSelectedCategory('Todos'); setSelectedBrand('Todas'); }}
                className="mt-6 bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
