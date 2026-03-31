import ProductCard from './ProductCard';
import { useStore } from '../StoreContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();
  const { products, homeContent, brands } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto pt-4 md:pt-6 space-y-10 md:space-y-14 pb-20"
    >
      {/* Hero Section: Bento Style */}
      <motion.div variants={sectionVariants} className="px-4 md:px-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <div className="md:col-span-2 relative h-[300px] md:h-[380px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-xl shadow-primary/5">
            <img 
              src={homeContent.heroImage} 
              alt={homeContent.heroTitle} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              referrerPolicy="no-referrer" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-3">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Lojas Oficiais
                </span>
                <h2 className="text-3xl md:text-5xl font-headline font-black text-white mb-2 leading-tight tracking-tight">
                  {homeContent.heroTitle}
                </h2>
                <p className="text-white/70 max-w-md mb-6 text-sm md:text-base font-medium leading-relaxed line-clamp-2">
                  {homeContent.heroSubtitle}
                </p>
                <button 
                  onClick={() => navigate('/category/Whey Protein')} 
                  className="group bg-primary text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm w-fit shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  {homeContent.heroButtonText}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </motion.div>
            </div>
          </div>
          
          <div className="relative bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-center items-center text-center space-y-4 overflow-hidden border border-slate-100 shadow-sm">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 blur-[40px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/5 blur-[40px] rounded-full"></div>
            
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-75 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              <span className="material-symbols-outlined text-3xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline font-black text-lg tracking-tight">Qualidade Garantida</h3>
              <p className="text-on-surface-variant text-[12px] leading-relaxed px-2">
                Trabalhamos apenas com produtos oficiais de lojas verificadas. Não trabalhamos com produtos de terceiros ou de procedência duvidosa.
              </p>
            </div>
            <button 
              onClick={() => navigate('/shop')} 
              className="mt-2 relative overflow-hidden bg-on-surface text-white px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all active:scale-95 shadow-md group/btn"
            >
              <span className="relative z-10">Ver Catálogo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </section>
      </motion.div>

      {/* Brands Section */}
      <motion.section variants={sectionVariants} className="space-y-4 md:space-y-6">
        <div className="px-4 md:px-6 flex justify-between items-end">
          <div>
            <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase mb-1 block">Marcas Oficiais</span>
            <h3 className="font-headline font-black text-2xl md:text-3xl tracking-tight">Nossos Parceiros</h3>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-3 md:gap-4 px-4 md:px-6 pb-2">
          {brands.map(brand => (
            <button 
              key={brand} 
              onClick={() => navigate(`/brand/${brand}`)}
              className="flex-shrink-0 bg-white border border-slate-100 px-6 py-3 rounded-xl font-headline font-black text-sm md:text-base hover:border-primary/30 hover:shadow-md transition-all active:scale-95 group"
            >
              <span className="text-on-surface group-hover:text-primary transition-colors">
                {brand}
              </span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Dynamic Category Sections */}
      <div className="space-y-10 md:space-y-14">
        {homeContent.visibleCategories.map(categoryName => {
          const categoryProducts = products.filter(p => p.category === categoryName);
          if (categoryProducts.length === 0) return null;

          return (
            <motion.section 
              key={categoryName} 
              variants={sectionVariants}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex justify-between items-end px-4 md:px-6">
                <div>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase mb-1 block">
                    {categoryName === 'Whey Protein' ? 'Performance de Elite' : 
                     categoryName === 'Creatina' ? 'Laboratório de Força' :
                     categoryName === 'Pré-treino' ? 'Núcleo de Energia' :
                     categoryName === 'Vitaminas' ? 'Saúde & Vitalidade' : 'Coleção Especial'}
                  </span>
                  <h3 className="font-headline font-black text-2xl md:text-3xl tracking-tight">{categoryName}</h3>
                </div>
                <button 
                  onClick={() => navigate(`/category/${categoryName}`)} 
                  className="text-primary font-bold text-[12px] flex items-center gap-1.5 group bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
                >
                  Ver tudo 
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>

              <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 px-4 md:px-6 pb-4">
                {categoryProducts.map(product => (
                  <div key={product.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </motion.main>
  );
}
