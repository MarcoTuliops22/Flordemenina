'use client';

import React, { useState } from 'react';
import { Product, ProductVariation } from '@/lib/types';
import { Star, ShieldCheck, Eye, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variation: ProductVariation) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';

export default function ProductCard({ product, onSelectProduct, onAddToCart }: ProductCardProps) {
  const defaultVariation = product.variations[0];
  const currentPrice = defaultVariation.promotionalPrice || defaultVariation.price;
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#e7e0d3] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-square overflow-hidden bg-[#f5efe6] cursor-pointer" onClick={() => onSelectProduct(product)}>
          <img
            src={imgSrc}
            alt={product.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {defaultVariation.promotionalPrice && (
              <span className="bg-[#9b7237] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                OFERTA
              </span>
            )}
            <span className="bg-white/90 backdrop-blur-xs text-[#1c1917] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#e7e0d3]">
              {defaultVariation.platingLabel}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 bg-[#1c1917]/80 text-white text-[10px] px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" /> 1 Ano Gar.
            </span>
          </div>

          {/* Quick Hover Action Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="bg-white text-[#1c1917] px-4 py-2 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-[#9b7237] hover:text-white transition"
            >
              <Eye className="w-3.5 h-3.5" /> Espiar Detalhes & Zoom
            </button>
          </div>
        </div>

        {/* Product Meta Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#78716c]">
            <span className="uppercase tracking-widest text-[10px] font-medium text-[#9b7237] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-semibold text-[#1c1917]">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-base font-normal text-[#1c1917] line-clamp-1 cursor-pointer hover:text-[#9b7237] transition"
          >
            {product.title}
          </h3>

          {/* Plating Pills */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.variations.map((v) => (
              <span
                key={v.id}
                className={`text-[9px] px-2 py-0.5 rounded-md border font-medium ${
                  v.plating === 'OURO_18K'
                    ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]'
                    : v.plating === 'PRATA_925'
                    ? 'bg-[#f1f5f9] text-[#334155] border-[#cbd5e1]'
                    : 'bg-[#fafafa] text-[#27272a] border-[#e4e4e7]'
                }`}
              >
                {v.plating === 'OURO_18K' ? 'Ouro 18k' : v.plating === 'PRATA_925' ? 'Prata 925' : 'Ródio'}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#1c1917]">
              R$ {currentPrice.toFixed(2).replace('.', ',')}
            </span>
            {defaultVariation.promotionalPrice && (
              <span className="text-xs text-[#78716c] line-through">
                R$ {defaultVariation.price.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-[10px] text-[#9b7237] font-semibold ml-auto">
              ou 6x R$ {(currentPrice / 6).toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onAddToCart(product, defaultVariation)}
          className="w-full py-2.5 bg-[#f5efe6] text-[#1c1917] font-medium text-xs tracking-wider uppercase rounded-lg hover:bg-[#9b7237] hover:text-white transition flex items-center justify-center gap-2 group-hover:shadow-xs cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" /> Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
