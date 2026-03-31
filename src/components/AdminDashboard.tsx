import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../StoreContext';
import { Product } from '../types';

type AdminTab = 'inventory' | 'brands' | 'categories' | 'home';

export default function AdminDashboard() {
  const { 
    products, 
    updateProduct, 
    deleteProduct, 
    addProduct, 
    brands, 
    setBrands,
    addBrand, 
    deleteBrand,
    categories,
    setCategories,
    homeContent,
    setHomeContent
  } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showStockAlertPrompt, setShowStockAlertPrompt] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBanner, setNewCategoryBanner] = useState('');
  
  // Ensure 'Ofertas do Dia' and 'Novidades' are always present
  React.useEffect(() => {
    let updated = false;
    let newCategories = [...categories];
    if (!newCategories.some(c => c.name === 'Ofertas do Dia')) {
      newCategories.push({ name: 'Ofertas do Dia', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' });
      updated = true;
    }
    if (!newCategories.some(c => c.name === 'Novidades')) {
      newCategories.push({ name: 'Novidades', bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' });
      updated = true;
    }
    if (updated) {
      setCategories(newCategories);
    }
  }, [categories, setCategories]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      setCategories(prev => [...prev, { name: newCategoryName.trim(), bannerImage: newCategoryBanner.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7zKlWLrwllaEW3cwLayAk-a5OJ6cCfc9HkLkI-5ib8XygtWIRFAl808b0zNODz3einHGVptWLQEagCVidgb-KO5Y3MjRfyutMj4qyX5PyWYhXP59lB9Wk6V17u4VcqVU4LlTrw_IyORhMLqyajhV1nB9C2_pUlVJdhxUqtgVhCyBSE9zRfT7CxQV-1rwh9QX9vt3vqC_MSSiXBoNMl8H1EVYM8CzlY5qgj23kcMyWTOrPeLzrvcFhwhY2JZ3PEn8_oH1Aq0OBM2g' }]);
      setNewCategoryName('');
      setNewCategoryBanner('');
    }
  };

  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [editBrandName, setEditBrandName] = useState('');

  const handleEditBrand = (brand: string) => {
    setEditingBrand(brand);
    setEditBrandName(brand);
  };

  const handleSaveBrandEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editBrandName.trim() && editingBrand) {
      setBrands(prev => prev.map(b => b === editingBrand ? editBrandName.trim() : b));
      setEditingBrand(null);
      setEditBrandName('');
    }
  };

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryBanner, setEditCategoryBanner] = useState('');

  const handleEditCategory = (category: any) => {
    setEditingCategory(category.name);
    setEditCategoryName(category.name);
    setEditCategoryBanner(category.bannerImage || '');
  };

  const handleSaveCategoryEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCategoryName.trim() && editingCategory) {
      setCategories(prev => prev.map(c => c.name === editingCategory ? { ...c, name: editCategoryName.trim(), bannerImage: editCategoryBanner.trim() } : c));
      setEditingCategory(null);
      setEditCategoryName('');
      setEditCategoryBanner('');
    }
  };

  const deleteCategory = (categoryName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) {
      setCategories(prev => prev.filter(c => c.name !== categoryName));
    }
  };

  const handleBack = () => navigate('/');

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (isAdding) {
        addProduct(editingProduct);
      } else {
        updateProduct(editingProduct);
      }
      setEditingProduct(null);
      setIsAdding(false);
      setShowStockAlertPrompt(true);
    }
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: '',
      price: 'R$ 0,00',
      img: '',
      affiliateUrl: '',
      brand: brands[0] || '',
      category: 'Whey Protein',
      description: '',
      proteinPerDose: '',
      bcaas: '',
      lactose: '',
      gallery: [],
      videoUrl: ''
    };
    setEditingProduct(newProduct);
    setIsAdding(true);
  };

  const updateGallery = (index: number, value: string) => {
    if (!editingProduct) return;
    const newGallery = [...(editingProduct.gallery || [])];
    newGallery[index] = value;
    setEditingProduct({ ...editingProduct, gallery: newGallery });
  };

  const addGalleryItem = () => {
    if (!editingProduct) return;
    setEditingProduct({ 
      ...editingProduct, 
      gallery: [...(editingProduct.gallery || []), ''] 
    });
  };

  const removeGalleryItem = (index: number) => {
    if (!editingProduct) return;
    const newGallery = (editingProduct.gallery || []).filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, gallery: newGallery });
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBrandName.trim()) {
      addBrand(newBrandName.trim());
      setNewBrandName('');
      alert('Marca adicionada com sucesso!');
    }
  };

  return (
    <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen font-body">
      {/* Desktop Side Navigation */}
      <aside className="hidden md:flex flex-col gap-3 p-5 border-r border-surface-variant/10 bg-surface-container-lowest h-screen w-64 fixed left-0 top-0 z-40 overflow-y-auto no-scrollbar">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-primary font-black text-lg tracking-tighter">LABORATÓRIO</h1>
            <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/60 mt-0.5">Gestão de Precisão</p>
          </div>
          <button onClick={handleBack} className="material-symbols-outlined text-on-surface-variant/40 hover:text-primary transition-colors text-xl">close</button>
        </div>
        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => { setActiveTab('inventory'); setEditingProduct(null); setIsAdding(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${
              activeTab === 'inventory' && !editingProduct ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span> Catálogo
          </button>
          <button 
            onClick={() => { setActiveTab('brands'); setEditingProduct(null); setIsAdding(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${
              activeTab === 'brands' && !editingProduct ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">branding_watermark</span> Marcas
          </button>
          <button 
            onClick={() => { setActiveTab('categories'); setEditingProduct(null); setIsAdding(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${
              activeTab === 'categories' && !editingProduct ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">category</span> Categorias
          </button>
          <button 
            onClick={() => { setActiveTab('home'); setEditingProduct(null); setIsAdding(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[11px] uppercase tracking-wider ${
              activeTab === 'home' && !editingProduct ? 'text-primary bg-primary/5' : 'text-on-surface-variant/70 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home</span> Conteúdo Home
          </button>
          <div className="pt-4 mt-4 border-t border-surface-variant/10">
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant/60 hover:bg-surface-container-high hover:text-primary transition-all font-bold text-[11px] uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_new</span> Voltar ao Site
            </button>
          </div>
        </nav>
        <button 
          onClick={handleAddNew}
          className="mt-6 bg-primary text-on-primary py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-md shadow-primary/10 active:scale-95 transition-all"
        >
          Novo Produto
        </button>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center px-4 h-12 sticky top-0 bg-background/80 backdrop-blur-xl z-50 border-b border-surface-variant/10">
        <span className="text-base font-black tracking-tighter text-on-surface">LABORATÓRIO</span>
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="material-symbols-outlined text-on-surface-variant/60 text-[20px]">close</button>
          <div className="w-7 h-7 rounded-full bg-surface-container-high overflow-hidden border border-surface-variant/10">
            <img alt="Admin Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdj9QsowslAt8DuZVGLqfwEe0Dknxe0FAq265DZBn1PlqB3lyaUtnt_1F3YrdNr2Y0Nu_MYLQ-2uFuYBvM-CiHROk7EyCrJNlC3EYB3q-cAhQhS1gLO3yfsAahvqIU-bthe55iWnJ6OHGliF3gLcmgLmpHlZ1jpO3ari-Hyjggf7Dct9ZA1YoJEv0kTij-sLX-HL0-ZrwNmzVh-XHCx_oloZYU4-wz3aniuDCt7MSdvOnxk6ZHETO64ydc-zr05Npw_cbnOjCKDd4" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 md:p-8 pb-24 md:pb-8 min-h-screen">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence>
            {showStockAlertPrompt && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
              >
                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-sm w-full">
                  <h3 className="text-lg font-bold text-on-background mb-2">Alertar sobre estoque?</h3>
                  <p className="text-sm text-on-surface-variant mb-6">Deseja ser alertado quando este produto voltar ao estoque?</p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { setShowStockAlertPrompt(false); alert('Produto salvo com sucesso!'); }}
                      className="flex-1 px-4 py-2 rounded-xl border border-surface-variant/20 font-bold text-xs"
                    >
                      Não
                    </button>
                    <button 
                      onClick={() => { setShowStockAlertPrompt(false); alert('Produto salvo com sucesso! Alerta ativado.'); }}
                      className="flex-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs"
                    >
                      Sim
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {editingProduct ? (
              <motion.div 
                key="edit-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Gestão de Ativos</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-background">
                      {isAdding ? 'Novo Produto' : `Editar ${editingProduct.name}`}
                    </h2>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => { setEditingProduct(null); setIsAdding(false); }}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-surface-variant/20 text-on-surface-variant font-bold text-xs hover:bg-surface-container-high transition-colors"
                    >
                      Cancelar
                    </button>
                    {!isAdding && (
                      <button 
                        onClick={() => { deleteProduct(editingProduct.id); setEditingProduct(null); }}
                        className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-error/20 text-error font-bold text-xs hover:bg-error/5 transition-colors"
                      >
                        Excluir
                      </button>
                    )}
                    <button 
                      onClick={handleSaveProduct}
                      className="flex-1 md:flex-none px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/10 active:scale-95 transition-all"
                    >
                      {isAdding ? 'Criar' : 'Salvar'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  {/* Left Column: Form Section */}
                  <div className="xl:col-span-7 space-y-6">
                    {/* Basic Info */}
                    <section className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10 space-y-5">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Informações Básicas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Nome do Produto</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: Whey Isolate Platinum"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Marca</label>
                          <select 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface transition-all outline-none"
                            value={editingProduct.brand}
                            onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                          >
                            {brands.map(brand => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Categoria</label>
                          <select 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface transition-all outline-none"
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          >
                            {categories.map(cat => (
                              <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Preço</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: R$ 249,90"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Oferta Especial (Badge)</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: Oferta Especial"
                            value={editingProduct.specialOffer || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, specialOffer: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Link de Afiliado</label>
                        <input 
                          className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface transition-all outline-none" 
                          type="url" 
                          placeholder="https://..."
                          value={editingProduct.affiliateUrl}
                          onChange={(e) => setEditingProduct({ ...editingProduct, affiliateUrl: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Descrição Detalhada</label>
                        <textarea 
                          className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface min-h-[100px] transition-all outline-none" 
                          placeholder="Descreva o produto..."
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        />
                      </div>
                    </section>

                    {/* Technical Specs */}
                    <section className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10 space-y-5">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Especificações Técnicas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Proteína p/ Dose</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: 25g"
                            value={editingProduct.proteinPerDose}
                            onChange={(e) => setEditingProduct({ ...editingProduct, proteinPerDose: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">BCAAs</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: 5.5g"
                            value={editingProduct.bcaas}
                            onChange={(e) => setEditingProduct({ ...editingProduct, bcaas: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Lactose</label>
                          <input 
                            className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                            type="text" 
                            placeholder="Ex: < 1g"
                            value={editingProduct.lactose}
                            onChange={(e) => setEditingProduct({ ...editingProduct, lactose: e.target.value })}
                          />
                        </div>
                      </div>
                    </section>

                    {/* Media Management */}
                    <section className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Mídia e Vídeo</h3>
                        <div className="space-y-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">URL do Vídeo (YouTube/Vimeo)</label>
                            <input 
                              className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface transition-all outline-none" 
                              type="text" 
                              placeholder="https://youtube.com/..."
                              value={editingProduct.videoUrl}
                              onChange={(e) => setEditingProduct({ ...editingProduct, videoUrl: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">URL da Imagem de Capa</label>
                            <input 
                              className="w-full bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface transition-all outline-none" 
                              type="text" 
                              placeholder="https://..."
                              value={editingProduct.img}
                              onChange={(e) => setEditingProduct({ ...editingProduct, img: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-surface-variant/10">
                        <div className="flex justify-between items-center">
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Galeria de Imagens</h3>
                          <button 
                            onClick={addGalleryItem}
                            className="text-[10px] font-bold text-primary hover:underline"
                          >
                            + Adicionar
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(editingProduct.gallery || []).map((url, index) => (
                            <div key={index} className="flex gap-2">
                              <input 
                                className="flex-1 bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2 text-xs text-on-surface outline-none" 
                                type="text" 
                                placeholder="URL da imagem..."
                                value={url}
                                onChange={(e) => updateGallery(index, e.target.value)}
                              />
                              <button 
                                onClick={() => removeGalleryItem(index)}
                                className="p-2 text-error hover:bg-error/5 rounded-xl transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right Column: Live Preview */}
                  <div className="xl:col-span-5">
                    <div className="sticky top-8 space-y-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 ml-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span> 
                        Preview
                      </h3>
                      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-surface-variant/10 shadow-xl">
                        {/* Mockup of Product Details Page */}
                        <div className="aspect-[16/10] bg-surface-container-low relative overflow-hidden">
                          {editingProduct.videoUrl ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <span className="material-symbols-outlined text-4xl text-white/80">play_circle</span>
                              <div className="absolute top-3 left-3 bg-primary text-on-primary text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">Vídeo</div>
                            </div>
                          ) : null}
                          <img 
                            src={editingProduct.img || 'https://picsum.photos/seed/placeholder/800/600'} 
                            alt="Preview" 
                            className={`w-full h-full object-cover ${editingProduct.videoUrl ? 'opacity-50' : ''}`} 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mb-0.5">{editingProduct.brand || 'Marca'}</p>
                            <h4 className="text-xl font-extrabold tracking-tight text-on-surface">{editingProduct.name || 'Nome do Produto'}</h4>
                            <div className="text-lg font-black text-on-surface mt-1">{editingProduct.price}</div>
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Descrição</h5>
                            <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                              {editingProduct.description || 'Sem descrição informada.'}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 py-3 border-y border-surface-variant/10">
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-on-surface-variant uppercase">Proteína</p>
                              <p className="text-[10px] font-black">{editingProduct.proteinPerDose || '-'}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-on-surface-variant uppercase">BCAAs</p>
                              <p className="text-[10px] font-black">{editingProduct.bcaas || '-'}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[8px] font-bold text-on-surface-variant uppercase">Lactose</p>
                              <p className="text-[10px] font-black">{editingProduct.lactose || '-'}</p>
                            </div>
                          </div>

                          <button className="w-full py-3 bg-primary text-on-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-md shadow-primary/10">
                            Botão de Compra
                          </button>
                        </div>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/60 italic text-center">
                        Simulação da página de detalhes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'home' ? (
              <motion.div 
                key="home-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto"
              >
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Customização</span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-on-background">Conteúdo da Home</h2>
                    <p className="text-[11px] text-on-surface-variant mt-1">Personalize o banner principal e a visibilidade das seções.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setHomeContent(homeContent);
                      alert('Conteúdo da Home salvo com sucesso!');
                    }}
                    className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/10 active:scale-95 transition-all"
                  >
                    Salvar Alterações
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Form Section */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10 space-y-5">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Banner Principal (Hero)</h3>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Título do Hero</label>
                          <input 
                            type="text" 
                            value={homeContent.heroTitle}
                            onChange={(e) => setHomeContent({ ...homeContent, heroTitle: e.target.value })}
                            className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary outline-none transition-all font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Subtítulo do Hero</label>
                          <textarea 
                            value={homeContent.heroSubtitle}
                            onChange={(e) => setHomeContent({ ...homeContent, heroSubtitle: e.target.value })}
                            rows={3}
                            className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary outline-none transition-all leading-relaxed"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">Texto do Botão</label>
                            <input 
                              type="text" 
                              value={homeContent.heroButtonText}
                              onChange={(e) => setHomeContent({ ...homeContent, heroButtonText: e.target.value })}
                              className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:border-primary outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">URL da Imagem</label>
                            <input 
                              type="text" 
                              value={homeContent.heroImage}
                              onChange={(e) => setHomeContent({ ...homeContent, heroImage: e.target.value })}
                              className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:border-primary outline-none transition-all font-mono"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1">URL do Banner Catálogo Completo</label>
                            <input 
                              type="text" 
                              value={homeContent.shopAllBanner}
                              onChange={(e) => setHomeContent({ ...homeContent, shopAllBanner: e.target.value })}
                              className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:border-primary outline-none transition-all font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10 space-y-5">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">Visibilidade e Ordem das Seções</h3>
                      <div className="space-y-3">
                        {homeContent.visibleCategories.map((category, index) => (
                          <div key={category} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-variant/10 group">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col gap-1">
                                <button 
                                  onClick={() => {
                                    if (index > 0) {
                                      const newCategories = [...homeContent.visibleCategories];
                                      [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
                                      setHomeContent({ ...homeContent, visibleCategories: newCategories });
                                    }
                                  }}
                                  className={`material-symbols-outlined text-[14px] ${index === 0 ? 'text-surface-variant/30 cursor-not-allowed' : 'text-on-surface-variant hover:text-primary cursor-pointer'}`}
                                >
                                  keyboard_arrow_up
                                </button>
                                <button 
                                  onClick={() => {
                                    if (index < homeContent.visibleCategories.length - 1) {
                                      const newCategories = [...homeContent.visibleCategories];
                                      [newCategories[index + 1], newCategories[index]] = [newCategories[index], newCategories[index + 1]];
                                      setHomeContent({ ...homeContent, visibleCategories: newCategories });
                                    }
                                  }}
                                  className={`material-symbols-outlined text-[14px] ${index === homeContent.visibleCategories.length - 1 ? 'text-surface-variant/30 cursor-not-allowed' : 'text-on-surface-variant hover:text-primary cursor-pointer'}`}
                                >
                                  keyboard_arrow_down
                                </button>
                              </div>
                              <span className="text-[11px] font-bold text-on-surface">{category}</span>
                            </div>
                            <button 
                              onClick={() => {
                                const newVisible = homeContent.visibleCategories.filter(c => c !== category);
                                setHomeContent({ ...homeContent, visibleCategories: newVisible });
                              }}
                              className="w-8 h-4 rounded-full relative transition-colors bg-primary cursor-pointer"
                            >
                              <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all left-4.5" />
                            </button>
                          </div>
                        ))}
                        {categories.filter(c => !homeContent.visibleCategories.includes(c.name)).map(category => (
                          <div key={category.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-variant/10 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-[11px] font-bold text-on-surface ml-6">{category.name}</span>
                            <button 
                              onClick={() => {
                                setHomeContent({ ...homeContent, visibleCategories: [...homeContent.visibleCategories, category.name] });
                              }}
                              className="w-8 h-4 rounded-full relative transition-colors bg-surface-variant/30 cursor-pointer"
                            >
                              <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all left-0.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="lg:col-span-5">
                    <div className="sticky top-8 space-y-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 ml-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span> 
                        Preview Mobile
                      </h3>
                      <div className="relative aspect-[9/16] max-w-[280px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-surface-container-highest">
                        <img 
                          src={homeContent.heroImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                          <div className="space-y-2">
                            <span className="bg-primary text-on-primary text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest w-fit">Performance Lab</span>
                            <h2 className="text-white font-black text-2xl tracking-tighter leading-none uppercase">
                              {homeContent.heroTitle}
                            </h2>
                            <p className="text-white/70 text-[9px] font-medium leading-relaxed max-w-[160px]">
                              {homeContent.heroSubtitle}
                            </p>
                            <button className="bg-white text-black px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5 w-fit mt-2">
                              {homeContent.heroButtonText}
                              <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/60 italic text-center">
                        Representação visual do banner mobile.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'categories' ? (
              <motion.div 
                key="categories-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Organização</span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-on-background">Categorias</h2>
                    <p className="text-[11px] text-on-surface-variant mt-1">Gerencie as categorias de produtos da sua loja.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10">
                  <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-3">
                    <input 
                      className="flex-1 bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                      type="text" 
                      placeholder="Nome da nova categoria..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <input 
                      className="flex-1 bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                      type="text" 
                      placeholder="URL do Banner (opcional)..."
                      value={newCategoryBanner}
                      onChange={(e) => setNewCategoryBanner(e.target.value)}
                    />
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/10 active:scale-95 transition-all whitespace-nowrap"
                    >
                      Adicionar
                    </button>
                  </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categories.map(category => (
                    <div 
                      key={category.name}
                      className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant/10 flex flex-col gap-3 group hover:border-primary/30 transition-all"
                    >
                      {editingCategory === category.name ? (
                        <form onSubmit={handleSaveCategoryEdit} className="flex flex-col gap-2">
                          <input 
                            autoFocus
                            className="bg-surface-container-low border border-primary rounded-xl px-3 py-2 text-on-surface text-sm outline-none" 
                            type="text" 
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            placeholder="Nome da categoria"
                          />
                          <input 
                            className="bg-surface-container-low border border-primary rounded-xl px-3 py-2 text-on-surface text-sm outline-none" 
                            type="text" 
                            value={editCategoryBanner}
                            onChange={(e) => setEditCategoryBanner(e.target.value)}
                            placeholder="URL do Banner"
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-on-primary text-[10px] font-bold py-2 rounded-lg">Salvar</button>
                            <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 bg-surface-container-low text-on-surface-variant text-[10px] font-bold py-2 rounded-lg">Cancelar</button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-on-surface uppercase tracking-wider">{category.name}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditCategory(category)}
                                className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button 
                                onClick={() => deleteCategory(category.name)}
                                className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </div>
                          {category.bannerImage && (
                            <div className="w-full h-16 rounded-lg overflow-hidden relative">
                              <img src={category.bannerImage} alt={category.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'brands' ? (
              <motion.div 
                key="brands-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Parcerias</span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-on-background">Marcas</h2>
                    <p className="text-[11px] text-on-surface-variant mt-1">Gerencie as marcas disponíveis na sua loja.</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant/10">
                  <form onSubmit={handleAddBrand} className="flex gap-3">
                    <input 
                      className="flex-1 bg-surface-container-low border border-surface-variant/20 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/30 transition-all outline-none" 
                      type="text" 
                      placeholder="Nome da nova marca..."
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                    />
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/10 active:scale-95 transition-all"
                    >
                      Adicionar
                    </button>
                  </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {brands.map(brand => (
                    <div 
                      key={brand}
                      className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant/10 flex flex-col gap-3 group hover:border-primary/30 transition-all"
                    >
                      {editingBrand === brand ? (
                        <form onSubmit={handleSaveBrandEdit} className="flex flex-col gap-2">
                          <input 
                            autoFocus
                            className="bg-surface-container-low border border-primary rounded-xl px-3 py-2 text-on-surface text-sm outline-none" 
                            type="text" 
                            value={editBrandName}
                            onChange={(e) => setEditBrandName(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-on-primary text-[10px] font-bold py-2 rounded-lg">Salvar</button>
                            <button type="button" onClick={() => setEditingBrand(null)} className="flex-1 bg-surface-container-low text-on-surface-variant text-[10px] font-bold py-2 rounded-lg">Cancelar</button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center border border-surface-variant/10">
                              <span className="material-symbols-outlined text-primary text-lg">verified</span>
                            </div>
                            <span className="text-sm font-bold text-on-surface uppercase tracking-wider">{brand}</span>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEditBrand(brand)}
                              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button 
                              onClick={() => deleteBrand(brand)}
                              className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="inventory-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8 flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-1 text-on-background">Catálogo</h2>
                    <p className="text-on-surface-variant text-xs">Gerencie seus produtos e conteúdos.</p>
                  </div>
                  <button 
                    onClick={handleAddNew}
                    className="md:hidden bg-primary text-on-primary p-2 rounded-full shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {products.map(product => (
                    <div 
                      key={product.id}
                      className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-variant/10 hover:border-primary/30 transition-all group cursor-pointer flex flex-col gap-3"
                      onClick={() => { setEditingProduct(product); setIsAdding(false); }}
                    >
                      <div className="aspect-square rounded-xl bg-surface-container-low overflow-hidden relative">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        {product.videoUrl && (
                          <div className="absolute top-1.5 right-1.5 bg-black/40 backdrop-blur p-1 rounded-lg">
                            <span className="material-symbols-outlined text-xs text-primary">play_circle</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-0.5">{product.brand}</p>
                        <h4 className="font-bold text-on-surface text-xs truncate mb-1">{product.name}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-on-surface font-black text-xs">{product.price}</p>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[8px] text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded uppercase font-bold">{product.category}</span>
                            {product.specialOffer && (
                              <span className="text-[7px] text-white bg-primary px-1.5 py-0.5 rounded uppercase font-bold">{product.specialOffer}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-surface-variant/10">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="flex-1 py-1.5 bg-surface-container-high text-[10px] font-bold rounded-lg hover:bg-surface-container-highest transition-colors"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}
                          className="p-1.5 text-error hover:bg-error/5 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-6 pt-2 bg-background/90 backdrop-blur-xl border-t border-surface-variant/10 z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center w-14 h-10 text-on-surface-variant/50">
          <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          <span className="text-[9px] font-bold">Site</span>
        </button>
        <button onClick={() => { setEditingProduct(null); setIsAdding(false); setActiveTab('inventory'); }} className={`flex flex-col items-center justify-center w-14 h-10 ${activeTab === 'inventory' ? 'text-primary' : 'text-on-surface-variant/50'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'inventory' ? "'FILL' 1" : "" }}>inventory_2</span>
          <span className="text-[9px] font-bold">Itens</span>
        </button>
        <button onClick={() => { setEditingProduct(null); setIsAdding(false); setActiveTab('brands'); }} className={`flex flex-col items-center justify-center w-14 h-10 ${activeTab === 'brands' ? 'text-primary' : 'text-on-surface-variant/50'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'brands' ? "'FILL' 1" : "" }}>branding_watermark</span>
          <span className="text-[9px] font-bold">Marcas</span>
        </button>
        <button onClick={() => { setEditingProduct(null); setIsAdding(false); setActiveTab('categories'); }} className={`flex flex-col items-center justify-center w-14 h-10 ${activeTab === 'categories' ? 'text-primary' : 'text-on-surface-variant/50'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'categories' ? "'FILL' 1" : "" }}>category</span>
          <span className="text-[9px] font-bold">Cats</span>
        </button>
        <button onClick={() => { setEditingProduct(null); setIsAdding(false); setActiveTab('home'); }} className={`flex flex-col items-center justify-center w-14 h-10 ${activeTab === 'home' ? 'text-primary' : 'text-on-surface-variant/50'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "" }}>home</span>
          <span className="text-[9px] font-bold">Home</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-14 h-10 text-on-surface-variant/50">
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="text-[9px] font-bold">Perfil</span>
        </button>
      </nav>
    </div>
  );
}
