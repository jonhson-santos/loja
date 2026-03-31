import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../StoreContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { user, updateCartQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    user.cart.length > 0 ? user.cart[0].product.id : null
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleCheckout = async () => {
    if (!selectedItemId) return;
    const selectedItem = user.cart.find(item => item.product.id === selectedItemId);
    if (!selectedItem) return;

    // Request notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Compra Finalizada', {
          body: 'Seu pedido foi processado com sucesso e está sendo preparado!',
          icon: '/favicon.ico'
        });
      } else {
        alert('Compra Finalizada! Seu pedido foi processado com sucesso.');
      }
    } else {
      alert('Compra Finalizada! Seu pedido foi processado com sucesso.');
    }

    // Open affiliate URL in a new tab
    if (selectedItem.product.affiliateUrl) {
      window.open(selectedItem.product.affiliateUrl, '_blank');
    }
  };

  const selectedItem = user.cart.find(item => item.product.id === selectedItemId);
  
  const total = selectedItem 
    ? parseFloat(selectedItem.product.price.replace('R$', '').replace(',', '.')) * selectedItem.quantity
    : 0;

  return (
    <div className="bg-background min-h-screen pb-32 font-body text-on-background">
      {/* TopAppBar */}
      <header className="flex items-center w-full px-6 h-16 sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="text-primary active:scale-95 duration-150 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-extrabold tracking-tight text-xl text-on-background">Carrinho</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Digital Laboratory Header Label */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="font-headline font-bold uppercase tracking-wider text-[0.75rem] text-primary">Status: Diagnóstico de Compra</span>
            <h2 className="text-3xl font-extrabold mt-1 tracking-tight text-on-background">Meus Itens</h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-on-surface-variant text-sm block">Sessão Segura</span>
            <span className="text-primary text-xs font-mono">LAB-ID: 88293-X</span>
          </div>
        </div>

        {user.cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-outline text-3xl">shopping_cart</span>
            </div>
            <h2 className="text-lg font-bold text-on-background">Seu carrinho está vazio</h2>
            <p className="text-sm text-on-surface-variant mt-2 mb-6">Explore nossa loja e encontre os melhores suplementos.</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              Ir para a Loja
            </button>
          </div>
        ) : (
          <>
            {/* Product List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {user.cart.map((item) => {
                  const isSelected = selectedItemId === item.product.id;
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedItemId(item.product.id)}
                      className={`group relative flex items-center rounded-lg p-4 transition-all duration-300 cursor-pointer border ${
                        isSelected 
                          ? 'bg-surface-container border-primary/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]' 
                          : 'bg-surface-container/50 border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="mr-4">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => setSelectedItemId(item.product.id)}
                          className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary focus:ring-offset-background cursor-pointer" 
                        />
                      </div>
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 p-2">
                        <img 
                          src={item.product.img} 
                          alt={item.product.name}
                          className={`w-full h-full object-contain transition-all duration-500 ${isSelected ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                        />
                      </div>
                      <div className="ml-6 flex-grow">
                        <div className="flex justify-between items-start">
                          <span className="font-headline font-bold uppercase tracking-wider text-[0.65rem] text-primary">{item.product.brand}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(item.product.id);
                              if (isSelected) setSelectedItemId(null);
                            }}
                            className="text-outline-variant hover:text-error transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <h3 className="text-on-surface font-bold text-lg leading-tight mt-1">{item.product.name}</h3>
                        <p className="text-on-surface-variant text-sm mt-1">{item.product.category}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-extrabold text-on-surface">{item.product.price}</span>
                          
                          {/* Quantity Selector */}
                          <div 
                            className="flex items-center bg-surface-container-low rounded-full px-2 py-1 border border-outline-variant/15"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="px-4 font-bold text-sm">{item.quantity.toString().padStart(2, '0')}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Summary Section */}
            {selectedItem && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-surface-container rounded-xl p-8 space-y-4 border border-outline-variant/10"
              >
                <h4 className="font-headline font-bold uppercase tracking-widest text-[0.75rem] text-primary-fixed mb-6">Resumo da Amostra</h4>
                
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-bold text-on-surface">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Frete (Padrão)</span>
                  <span className="font-bold text-primary">Grátis</span>
                </div>
                
                {/* Technical Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent my-6"></div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-on-surface font-extrabold text-2xl uppercase tracking-tight">Total</span>
                    <p className="text-xs text-on-surface-variant">Impostos laboratoriais incluídos</p>
                  </div>
                  <span className="text-4xl font-extrabold text-on-surface tracking-tighter">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </motion.section>
            )}

            {/* Upsell Micro-Container */}
            <div className="mt-8 flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="text-sm font-bold text-on-surface">Garantia de Pureza Cleo</p>
                <p className="text-xs text-on-surface-variant">Todos estes produtos foram rigorosamente analisados pela Dra. Cleo e são 100% validados para sua máxima performance e segurança.</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* BottomNavBar / CTA Shell */}
      {user.cart.length > 0 && (
        <nav className="fixed bottom-0 left-0 w-full z-50 p-6 bg-background/80 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-2xl">
          <div className="max-w-3xl mx-auto">
            <button 
              onClick={handleCheckout}
              disabled={!selectedItemId}
              className={`flex flex-row items-center justify-center gap-3 w-full py-4 px-8 rounded-lg font-headline font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                selectedItemId 
                  ? 'bg-gradient-to-br from-primary to-primary-fixed text-on-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_0_12px_rgba(var(--primary),0.4)] active:scale-[0.98]' 
                  : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined">shopping_cart_checkout</span>
              {selectedItemId ? 'Finalizar Compra' : 'Selecione um item'}
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
