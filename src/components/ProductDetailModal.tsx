'use client';

import React, { useState } from 'react';
import { Product, ProductVariation } from '@/lib/types';
import { X, ShieldCheck, Award, Sparkles, Check, ShoppingBag, ZoomIn, Truck } from 'lucide-react';
import FreightCalculator from './FreightCalculator';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variation: ProductVariation, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation>(product.variations[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const currentPrice = selectedVariation.promotionalPrice || selectedVariation.price;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-[#e7e0d3] max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-[#1c1917] shadow-md transition"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: High Res Image Gallery with Zoom */}
        <div className="w-full md:w-1/2 bg-[#fdfbf7] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7e0d3]">
          
          {/* Main Zoomable Image Box */}
          <div
            className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#e7e0d3] cursor-zoom-in group"
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage}
              alt={product.title}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                zoomActive ? 'scale-220' : 'scale-100'
              }`}
              style={
                zoomActive
                  ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                  : undefined
              }
            />

            {!zoomActive && (
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1c1917] text-[11px] px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 pointer-events-none font-medium">
                <ZoomIn className="w-3.5 h-3.5 text-[#9b7237]" /> Passe o mouse para dar zoom
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
            {product.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === imgUrl ? 'border-[#9b7237] ring-2 ring-[#9b7237]/20' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 bg-[#f5efe6] rounded-lg border border-[#e7e0d3] flex items-center gap-2 justify-center">
              <Award className="w-4 h-4 text-[#9b7237]" />
              <span className="font-semibold text-[#1c1917] text-[11px]">1 Ano de Garantia</span>
            </div>
            <div className="p-2 bg-[#f5efe6] rounded-lg border border-[#e7e0d3] flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-[#9b7237]" />
              <span className="font-semibold text-[#1c1917] text-[11px]">Antialérgico Premium</span>
            </div>
          </div>
        </div>

        {/* Right Column: Variations, Details & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[85vh] space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9b7237] font-semibold">
              {product.category} • Ref: {product.id}
            </span>
            <h2 className="font-serif text-2xl font-normal text-[#1c1917] mt-1">{product.title}</h2>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-[#1c1917]">
                R$ {currentPrice.toFixed(2).replace('.', ',')}
              </span>
              {selectedVariation.promotionalPrice && (
                <span className="text-sm text-[#78716c] line-through">
                  R$ {selectedVariation.price.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-xs text-[#9b7237] font-semibold bg-[#f5efe6] px-2.5 py-1 rounded-full">
                6x R$ {(currentPrice / 6).toFixed(2).replace('.', ',')} sem juros
              </span>
            </div>
          </div>

          <p className="text-xs text-[#78716c] leading-relaxed border-b border-[#e7e0d3] pb-4">
            {product.description}
          </p>

          {/* Variation Selector: Plating & Size */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1c1917] uppercase tracking-wider mb-2">
                Selecione o Banho / Tamanho:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variations.map((varItem) => {
                  const isSelected = selectedVariation.id === varItem.id;
                  return (
                    <button
                      key={varItem.id}
                      onClick={() => setSelectedVariation(varItem)}
                      className={`p-3 rounded-lg text-left text-xs border transition flex items-center justify-between ${
                        isSelected
                          ? 'border-[#9b7237] bg-[#f5efe6] text-[#1c1917] font-semibold ring-1 ring-[#9b7237]'
                          : 'border-[#e7e0d3] bg-white text-[#44403c] hover:bg-[#fdfbf7]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{varItem.name}</div>
                        <div className="text-[10px] text-[#78716c]">Estoque: {varItem.stock} unidades</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#9b7237]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider">Quantidade:</span>
              <div className="flex items-center border border-[#e7e0d3] rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#44403c] hover:bg-[#f5efe6]"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold text-[#1c1917]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariation.stock, quantity + 1))}
                  className="px-3 py-1 text-sm font-bold text-[#44403c] hover:bg-[#f5efe6]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA Button */}
          <button
            onClick={() => {
              onAddToCart(product, selectedVariation, quantity);
              onClose();
            }}
            className="w-full py-4 gold-gradient-bg text-white font-medium text-sm tracking-widest uppercase rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" /> Adicionar ao Carrinho
          </button>

          {/* Technical Details List */}
          <div className="bg-[#fdfbf7] p-4 rounded-xl border border-[#e7e0d3] space-y-2">
            <span className="text-xs font-bold text-[#1c1917] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#9b7237]" /> Especificações Técnicas:
            </span>
            <ul className="text-xs text-[#78716c] space-y-1 list-disc list-inside">
              {product.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Inline Freight Calculator Preview */}
          <div className="pt-2">
            <span className="text-xs font-bold text-[#1c1917] uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-[#9b7237]" /> Calcular Frete e Prazo de Entrega:
            </span>
            <FreightCalculator cartSubtotal={currentPrice * quantity} totalWeightGram={product.weightGram * quantity} />
          </div>

        </div>
      </div>
    </div>
  );
}
