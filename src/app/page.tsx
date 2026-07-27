'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import { Product, ProductVariation, CartItem, ShippingOption } from '@/lib/types';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SecurityBadges from '@/components/SecurityBadges';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import DrawerCart from '@/components/DrawerCart';
import FreightCalculator from '@/components/FreightCalculator';
import TransparentCheckout from '@/components/TransparentCheckout';
import SecurityAuditModal from '@/components/SecurityAuditModal';
import Footer from '@/components/Footer';
import { Sparkles, Filter, Truck } from 'lucide-react';

export default function Home() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      variation: PRODUCTS[0].variations[0],
      quantity: 1,
    },
  ]);

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  const cartSubtotal = cartItems.reduce(
    (acc, i) => acc + (i.variation.promotionalPrice || i.variation.price) * i.quantity,
    0
  );
  const cartWeightGram = cartItems.reduce((acc, i) => acc + i.product.weightGram * i.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, variation: ProductVariation, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.variation.id === variation.id
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, variation, quantity }];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variationId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variationId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variation.id === variationId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, variationId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variation.id === variationId)
      )
    );
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const categories = ['Todos', 'Brincos', 'Colares', 'Anéis', 'Pulseiras', 'Conjuntos'];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedCategory={selectedCategory}
      />

      {/* Hero Section */}
      <Hero />

      {/* Security & Warranty Trust Bar */}
      <SecurityBadges />

      {/* Main Catalog Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="catalog">
        
        {/* Catalog Section Title & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#e7e0d3] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9b7237]">
              <Sparkles className="w-4 h-4 text-[#9b7237]" /> Coleção Flor de Menina
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#1c1917] mt-1">
              {selectedCategory === 'Todos' ? 'Catálogo Completo de Semijoias' : `Coleção de ${selectedCategory}`}
            </h2>
            <p className="text-xs text-[#78716c] mt-1">
              {PRODUCTS.length} peças exclusivas banhadas a Ouro 18k e Prata 925 com 1 Ano de Garantia e tecnologia antialérgica.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-[#78716c] shrink-0 hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition tracking-wider uppercase whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'gold-gradient-bg text-white shadow-xs font-semibold'
                    : 'bg-white text-[#44403c] border border-[#e7e0d3] hover:bg-[#f5efe6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#78716c]">
            Nenhuma peça encontrada nesta categoria no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(prod) => setActiveProductModal(prod)}
                onAddToCart={(prod, varItem) => handleAddToCart(prod, varItem, 1)}
              />
            ))}
          </div>
        )}

        {/* Standalone Freight Calculator Banner Section */}
        <section className="bg-[#f5efe6] rounded-2xl p-6 md:p-8 border border-[#e7e0d3] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="frete">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-[#9b7237] border border-[#e7e0d3]">
              <Truck className="w-4 h-4" /> Tarifa Local Uber Flash & Motoboy em Palmas/TO
            </div>
            <h3 className="font-serif text-2xl text-[#1c1917]">
              Cotação de Frete por Bairro e CEP em Palmas/TO ou Brasil
            </h3>
            <p className="text-xs text-[#78716c] leading-relaxed">
              Consulte valores em tempo real para <strong>Motoboy / Uber Flash</strong> (Plano Diretor, Aurenys, Taquaralto e Taquaruçu), 
              <strong> Retirada no Showroom</strong> ou <strong>Correios (Mini Envios/SEDEX)</strong>.
            </p>
          </div>

          <div className="lg:col-span-6">
            <FreightCalculator
              cartSubtotal={cartSubtotal}
              totalWeightGram={cartWeightGram}
              onSelectShipping={(opt) => {
                setSelectedShipping(opt);
                setIsCartOpen(true);
              }}
              selectedShippingCode={selectedShipping?.code}
            />
          </div>
        </section>

      </main>

      {/* Product Detail Modal with Zoom */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={(prod, varItem, qty) => handleAddToCart(prod, varItem, qty)}
      />

      {/* Drawer Cart */}
      <DrawerCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedShipping={selectedShipping}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Transparent Checkout Modal */}
      <TransparentCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />

      {/* Security Audit Modal */}
      <SecurityAuditModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenSecurityModal={() => setIsSecurityModalOpen(true)} />
    </div>
  );
}
