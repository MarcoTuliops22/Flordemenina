'use client';

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Instagram, MapPin, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSecurityModal?: () => void;
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSecurityModal,
  onSelectCategory,
  selectedCategory = 'Todos',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: 'Brincos', val: 'Brincos' },
    { label: 'Colares', val: 'Colares' },
    { label: 'Anéis', val: 'Anéis' },
    { label: 'Pulseiras', val: 'Pulseiras' },
    { label: 'Conjuntos', val: 'Conjuntos' },
  ];

  const handleNavClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    setMobileMenuOpen(false);
    
    // Smooth scroll to catalog section
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e7e0d3]">
      {/* Announcement Bar */}
      <div className="gold-gradient-bg text-white text-[11px] md:text-xs font-medium py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-2 flex-wrap">
        <span>✨ FLOR DE MENINA (@flordemenina__to)</span>
        <span className="hidden md:inline">•</span>
        <span>FRETE GRÁTIS R$ 250+</span>
        <span className="hidden md:inline">•</span>
        <span>1 Ano de Garantia no Banho</span>
        <span className="hidden md:inline">•</span>
        <span>Até 6x Sem Juros ou 5% OFF Pix</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#44403c] hover:text-[#9b7237] transition"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <button
              onClick={() => handleNavClick('Todos')}
              className="inline-block text-left cursor-pointer group"
            >
              <span className="font-serif text-2xl md:text-3xl font-light tracking-widest text-[#1c1917] group-hover:text-[#9b7237] transition">
                FLOR DE MENINA
              </span>
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#9b7237] font-semibold text-center md:text-left">
                Semijoias Finas • @flordemenina__to
              </span>
            </button>
          </div>

          {/* Desktop Navigation Category Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs uppercase tracking-widest font-semibold text-[#44403c]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.val;
              return (
                <button
                  key={cat.val}
                  onClick={() => handleNavClick(cat.val)}
                  className={`transition-colors relative py-1 cursor-pointer ${
                    isActive ? 'text-[#9b7237] font-bold' : 'hover:text-[#9b7237]'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b7237] rounded-full" />
                  )}
                </button>
              );
            })}
            <a href="#instagram" className="flex items-center gap-1 text-[#9b7237] font-semibold hover:underline">
              <Instagram className="w-3.5 h-3.5" /> IG Feed
            </a>
            <a href="#frete" className="flex items-center gap-1 text-[#9b7237] font-semibold hover:underline">
              <MapPin className="w-3.5 h-3.5" /> Palmas-TO
            </a>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Instagram Profile Badge Button */}
            <a
              href="https://www.instagram.com/flordemenina__to/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-full hover:opacity-90 transition shadow-xs cursor-pointer"
              title="Acessar o perfil oficial @flordemenina__to no Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">@flordemenina__to</span>
            </a>

            {/* Security Audit Badge Trigger */}
            {onOpenSecurityModal && (
              <button
                onClick={onOpenSecurityModal}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-[#f5efe6] text-[#9b7237] border border-[#e7e0d3] rounded-full hover:bg-[#e8d8c3] transition cursor-pointer"
                title="Auditoria de Segurança OWASP & PCI-DSS"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Auditoria</span>
              </button>
            )}

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#1c1917] bg-[#f5efe6] rounded-full hover:bg-[#e8d8c3] transition flex items-center gap-2 cursor-pointer"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5 text-[#9b7237]" />
              <span className="hidden md:inline text-xs font-semibold text-[#1c1917]">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9b7237] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-[#e7e0d3] px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#44403c] uppercase tracking-wider">
            {categories.map((cat) => (
              <button
                key={cat.val}
                onClick={() => handleNavClick(cat.val)}
                className={`text-left hover:text-[#9b7237] ${
                  selectedCategory === cat.val ? 'text-[#9b7237] font-bold' : ''
                }`}
              >
                {cat.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/flordemenina__to/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#9b7237] pt-2"
            >
              <Instagram className="w-4 h-4" /> Instagram @flordemenina__to
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
