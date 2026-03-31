import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../StoreContext';
import { Product } from '../types';
import { motion } from 'motion/react';
import ProductCard from './ProductCard';

export default function CategoryPage({ isShopAll = false }: { isShopAll?: boolean }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, categories, homeContent } = useStore();
  
  const categoryProducts = isShopAll 
    ? products 
    : products.filter(p => p.category === category);

  const currentCategory = categories.find(c => c.name === category);
  const bannerImage = currentCategory?.bannerImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g';

  // Group products by brand
  const productsByBrand = categoryProducts.reduce((acc, product) => {
    const brand = product.brand || 'Outras Marcas';
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleBrandClick = (brand: string) => {
    navigate(`/brand/${brand}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
      className="pt-6 md:pt-10 pb-20 px-4 md:px-6 max-w-7xl mx-auto font-body"
    >
      {/* Category Hero Section */}
      <motion.section variants={itemVariants} className="mb-10 md:mb-14">
        <div className="relative h-48 md:h-64 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 group shadow-xl shadow-primary/5">
          <img 
            alt={`${isShopAll ? 'Catálogo Completo' : category} background`} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            src={isShopAll ? homeContent.shopAllBanner : bannerImage}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                {isShopAll ? 'Catálogo Completo' : 'Categoria Premium'}
              </span>
              <h2 className="text-white font-headline text-3xl md:text-5xl font-black tracking-tight capitalize leading-tight">
                {isShopAll ? 'Todos os Produtos' : category}
              </h2>
              <p className="text-white/70 max-w-md mt-2 text-sm md:text-base font-medium">
                {isShopAll ? 'Explore nossa coleção completa de suplementos oficiais.' : 'Os melhores suplementos selecionados para sua evolução.'}
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          <button className="bg-primary text-white px-5 py-2 rounded-full text-[12px] font-black whitespace-nowrap shadow-md shadow-primary/10 transition-all active:scale-95">Todas as Marcas</button>
          {['Isolado', 'Concentrado', 'Hidrolisado', 'Vegano'].map(filter => (
            <button key={filter} className="bg-white text-on-surface-variant px-5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap hover:bg-slate-50 transition-all active:scale-95 border border-slate-100">
              {filter}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Brand Sections */}
      <div className="space-y-12 md:space-y-16">
        {Object.entries(productsByBrand).map(([brand, brandProducts]) => (
          <motion.section 
            key={brand} 
            variants={itemVariants}
            className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
                  <span className="font-headline font-black text-primary text-xl">{brand[0]}</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-on-surface text-xl md:text-2xl tracking-tight leading-none mb-1">{brand}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="font-bold text-[9px] text-on-surface-variant uppercase tracking-wider">Qualidade Certificada</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleBrandClick(brand)}
                className="group bg-slate-50 text-primary px-4 py-2 rounded-xl text-[12px] font-black hover:bg-primary hover:text-white transition-all shadow-sm flex items-center gap-1.5"
              >
                Ver Tudo
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            
            <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar -mx-2 px-2 pb-2">
              {(brandProducts as Product[]).map(product => (
                <div key={product.id} className="min-w-[200px] md:min-w-[240px]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Featured Lab Comparison Bento */}
      <motion.section variants={itemVariants} className="mt-16 md:mt-20 bg-inverse-surface text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/5 blur-[100px] rounded-full"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <span className="inline-flex items-center gap-1.5 text-primary-fixed font-bold tracking-widest text-[10px] uppercase">
                <span className="material-symbols-outlined text-[14px]">science</span>
                Certificação Nutrilab
              </span>
              <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tight leading-tight">Qualidade Verificada em Laboratório</h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Cada lote passa por rigorosos testes de pureza e concentração. Priorizamos marcas que oferecem transparência total.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-primary-fixed text-2xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <h4 className="font-headline font-bold text-white text-base mb-1">Alta Pureza</h4>
                <p className="text-[10px] text-white/50">99.8% de precisão de filtragem em misturas isoladas.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-primary-fixed text-2xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                <h4 className="font-headline font-bold text-white text-base mb-1">Analisado</h4>
                <p className="text-[10px] text-white/50">Laudos laboratoriais disponíveis para cada compra.</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-video md:aspect-auto group shadow-2xl">
            <img 
              alt="Ambiente de laboratório" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKazhz86IZkee60hqfRyFc4DSiib3FMycxscCo3zIbJgTppO-XjJf64PXVH_xBUvyAuua3Yx4z7ShGHLlCaYOoxhSQd9rV62TY4d80v9GFNGF_lC8d7Jyf8FmAwbK0qKIj0ZgUgE5z5kGmTjr8jSQmOSVYFb-gLXeMe-B4ics52GIGSIs74OGzkY5nPexoYa9D3MVQxxlhQdgEV00tiZxCIw41DhB6iKNRKpNA2Ksw762qTj8HZCqq0n1gp5pgp8ydCoJr4DjV7d4"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(4,93,186,0.8)]"></div>
                <span className="text-[9px] font-black uppercase tracking-wider text-white">Verificação de Lote em Tempo Real Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}
