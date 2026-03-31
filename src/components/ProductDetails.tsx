import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useStore } from '../StoreContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleFavorite, user } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setShowVideo(true), 1200);
    return () => clearTimeout(timer);
  }, [id]);
  
  const product = products.find(p => p.id === id);
  const isFavorite = user.favorites.includes(id || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
        <div>
          <h2 className="text-xl font-bold mb-4">Produto não encontrado</h2>
          <button onClick={() => navigate('/')} className="text-primary font-bold text-sm">Voltar para o Início</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      navigate('/cart');
    }, 600);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  const mediaItems = [
    ...(product.videoUrl ? [{ type: 'video', url: product.videoUrl }] : []),
    { type: 'image', url: product.img },
    ...(product.gallery || []).map(url => ({ type: 'image', url }))
  ];

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-background font-body text-on-surface antialiased min-h-screen"
    >
      {/* Top Navigation */}
      <header className="fixed top-0 w-full flex justify-between items-center px-4 h-12 bg-white/80 backdrop-blur-md border-b border-surface-variant/10 z-[1001]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-on-background hover:bg-surface-container-high transition-colors active:scale-90 duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-base tracking-tight text-on-background">NUTRILAB</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-low text-on-background hover:bg-surface-container-high transition-colors active:scale-90 duration-200">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button 
            onClick={handleToggleFavorite}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors active:scale-90 duration-200 ${isFavorite ? 'bg-error-container/20 text-error' : 'bg-surface-container-low text-on-background hover:bg-surface-container-high'}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${isFavorite ? 'fill-1' : ''}`}>favorite</span>
          </button>
        </div>
      </header>

      <main className="pt-12 pb-28 max-w-4xl mx-auto">
        <div className="flex flex-col">
          {/* Media Carousel Section */}
          <motion.section variants={itemVariants} className="relative bg-surface-container-low px-4 py-6 overflow-hidden">
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4" 
                 onScroll={(e) => {
                   const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                   const width = (e.target as HTMLDivElement).clientWidth;
                   setActiveMediaIndex(Math.round(scrollLeft / width));
                 }}>
              {mediaItems.map((item, index) => (
                <div key={index} className="flex-none w-full snap-center flex justify-center items-center aspect-square md:aspect-video bg-white/50 rounded-2xl overflow-hidden relative">
                  {item.type === 'video' ? (
                    <div className="w-full h-full relative">
                      {/* Show main image as placeholder until video loads */}
                      <AnimatePresence>
                        {!showVideo && (
                          <motion.img 
                            exit={{ opacity: 0 }}
                            src={product.img} 
                            className="absolute inset-0 w-full h-full object-contain p-4 z-10 bg-white/50"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </AnimatePresence>
                      
                      {showVideo && (
                        getYoutubeId(item.url) ? (
                          <iframe 
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${getYoutubeId(item.url)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(item.url)}&controls=0&modestbranding=1`}
                            title="Vídeo do Produto"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                        )
                      )}
                    </div>
                  ) : (
                    <img 
                      alt={product.name} 
                      className="h-full w-full object-contain p-4 drop-shadow-2xl transition-transform duration-700 hover:scale-110" 
                      src={item.url}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {mediaItems.map((_, index) => (
                <span key={index} className={`h-1.5 transition-all duration-300 rounded-full ${activeMediaIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant'}`}></span>
              ))}
            </div>
          </motion.section>

          {/* Product Header Information */}
          <motion.section variants={itemVariants} className="px-5 py-6 bg-surface-container-lowest rounded-t-[2rem] -mt-6 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col gap-1">
              <span className="text-primary font-bold tracking-widest text-[9px] uppercase">
                {product.brand || 'Premium Brand'}
              </span>
              <h2 className="font-headline font-extrabold text-2xl tracking-tight text-on-background leading-tight">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-headline font-black text-on-background">{product.price}</span>
              </div>
            </div>
            
            {/* Trust Bar - Updated with Marketing Copy */}
            <div className="grid grid-cols-3 gap-3 mt-6 py-6 border-y border-surface-variant/10">
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-0.5">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-tight text-on-surface-variant leading-tight">Loja Oficial</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-0.5">
                  <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-tight text-on-surface-variant leading-tight">Qualidade Premium</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-0.5">
                  <span className="material-symbols-outlined text-primary text-xl">health_and_safety</span>
                </div>
                <span className="text-[8px] font-bold uppercase tracking-tight text-on-surface-variant leading-tight">Segurança Garantida</span>
              </div>
            </div>
          </motion.section>

          {/* Bento Grid: Supplement Specs */}
          <motion.section variants={itemVariants} className="px-5 mt-6">
            <h3 className="font-headline font-bold text-base mb-4 text-on-background">Especificações</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 bg-surface-container-low p-5 rounded-xl flex flex-col justify-between border border-surface-variant/5">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1.5 block">Categoria</span>
                  <p className="text-lg font-headline font-semibold">{product.category}</p>
                </div>
                <p className="text-on-surface-variant text-xs mt-3 leading-relaxed">{product.description || 'Informação nutricional de alta performance desenvolvida para resultados máximos.'}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant/10 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary mb-1.5 block">Proteína / Dose</span>
                <p className="text-xl font-headline font-bold text-on-background">{product.proteinPerDose || '-'}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-variant/10 shadow-sm">
                <span className="text-[9px] font-bold uppercase tracking-widest text-secondary mb-1.5 block">Conteúdo de BCAA</span>
                <p className="text-xl font-headline font-bold text-on-background">{product.bcaas || '-'}</p>
              </div>
            </div>
          </motion.section>

          {/* Detailed Description */}
          <motion.section variants={itemVariants} className="px-5 mt-10 space-y-4">
            <h3 className="font-headline font-bold text-base text-on-background">Descrição Detalhada</h3>
            <div className="prose prose-sm text-on-surface-variant max-w-none">
              <p className="leading-relaxed text-xs">
                {product.description || 'Este suplemento representa o ápice da nutrição esportiva. Desenvolvido com os melhores ingredientes para garantir que seu corpo receba exatamente o que precisa para a recuperação e o crescimento muscular. Cada dose é formulada para máxima absorção e eficácia.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 bg-surface-container-high rounded-full text-[9px] font-bold text-on-surface-variant tracking-wider uppercase">{product.lactose || 'Sem Lactose'}</span>
              <span className="px-3 py-1.5 bg-surface-container-high rounded-full text-[9px] font-bold text-on-surface-variant tracking-wider uppercase">Sem Glúten</span>
              <span className="px-3 py-1.5 bg-surface-container-high rounded-full text-[9px] font-bold text-on-surface-variant tracking-wider uppercase">Zero Açúcar</span>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Floating Action Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-lg px-5 py-4 pb-8 flex items-center gap-3 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] md:px-8"
      >
        <div className="flex flex-col mr-auto">
          <span className="text-[9px] font-bold text-outline uppercase tracking-widest opacity-60">Total</span>
          <span className="text-xl font-headline font-black text-on-background">{product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all active:scale-90 ${isAdded ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-highest text-primary hover:bg-surface-container-high'}`}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="material-symbols-outlined text-[20px]">check</motion.span>
            ) : (
              <motion.span key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="material-symbols-outlined text-[20px]">shopping_cart</motion.span>
            )}
          </AnimatePresence>
        </button>
        <button 
          onClick={() => window.open(product.affiliateUrl, '_blank')}
          className="h-11 flex-1 bg-primary text-on-primary font-headline font-bold text-sm rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
        >
          Comprar Agora
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
