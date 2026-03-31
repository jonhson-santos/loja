import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useStore } from '../StoreContext';

export default function UserProfile() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBack = () => navigate(-1);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
  };

  const togglePreference = (key: keyof typeof user.preferences) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [key]: !user.preferences[key]
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-background text-on-surface font-body min-h-screen"
    >
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-surface-variant/10 flex justify-between items-center w-full px-4 h-12">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="flex items-center justify-center p-1.5 rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface text-[20px]">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-base tracking-tight">Meu Perfil</h1>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center overflow-hidden border border-primary/10">
            <span className="material-symbols-outlined text-primary text-sm">notifications</span>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-28 px-4 max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-primary/5">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover" 
                src={user.avatar}
                referrerPolicy="no-referrer"
              />
            </div>
            <input 
              type="file" 
              id="avatar-upload" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUser({ ...user, avatar: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label 
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </label>
          </div>
          <div className="space-y-0.5">
            <h2 className="font-headline font-extrabold text-xl tracking-tight text-on-background">{user.name}</h2>
            <p className="text-on-surface-variant text-xs font-medium">{user.email}</p>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-4">
          {/* Personal Information */}
          <div className="bg-surface-container-lowest border border-surface-variant/10 shadow-sm p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <h3 className="font-headline font-bold text-base">Informações Pessoais</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Nome Completo</label>
                <input 
                  className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 outline-none font-medium text-sm text-on-surface focus:bg-white focus:border-primary transition-all" 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Email</label>
                <input 
                  className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 outline-none font-medium text-sm text-on-surface focus:bg-white focus:border-primary transition-all" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">Telefone</label>
                <input 
                  className="w-full bg-surface-container-low border border-surface-variant/20 rounded-xl px-4 py-2.5 outline-none font-medium text-sm text-on-surface focus:bg-white focus:border-primary transition-all" 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="pt-2">
                <button 
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/10 hover:brightness-110 transition-all active:scale-[0.98]" 
                  type="submit"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>

          {/* Preferences */}
          <div className="bg-surface-container-lowest border border-surface-variant/10 shadow-sm p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>settings_suggest</span>
              </div>
              <h3 className="font-headline font-bold text-base">Preferências</h3>
            </div>
            <div className="space-y-1">
              {/* Toggle Item */}
              <div className="flex items-center justify-between py-1.5">
                <div className="space-y-0.5">
                  <p className="font-bold text-sm">Notificações</p>
                  <p className="text-[10px] text-on-surface-variant">Alertas de pedidos e promoções</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.preferences.notifications}
                    onChange={() => togglePreference('notifications')}
                  />
                  <div className="w-10 h-5.5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="h-px bg-surface-variant/10 my-1"></div>
              <div className="flex items-center justify-between py-1.5">
                <div className="space-y-0.5">
                  <p className="font-bold text-sm">Modo Escuro</p>
                  <p className="text-[10px] text-on-surface-variant">Ativar tema escuro</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.preferences.darkMode}
                    onChange={() => togglePreference('darkMode')}
                  />
                  <div className="w-10 h-5.5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <div className="space-y-0.5">
                  <p className="font-bold text-sm">Alertas de Estoque</p>
                  <p className="text-[10px] text-on-surface-variant">Avise-me quando itens voltarem</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={user.preferences.stockAlerts}
                    onChange={() => togglePreference('stockAlerts')}
                  />
                  <div className="w-10 h-5.5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="pt-2 space-y-3">
            <button 
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-center gap-2 text-primary font-bold text-sm py-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              Painel Administrativo
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center gap-2 text-error font-bold text-sm py-3 rounded-xl border border-error/10 hover:bg-error/5 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Sair da Conta
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
