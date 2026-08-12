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
    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#eadfce] bg-white/90 shadow-[0_20px_50px_-28px_rgba(116,89,52,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-24px_rgba(116,89,52,0.55)]">
      <div>
        <div
          className="relative aspect-[4/4.7] cursor-pointer overflow-hidden bg-[#f5efe6]"
          onClick={() => onSelectProduct(product)}
        >
          <img
            src={imgSrc}
            alt={product.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />

          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {defaultVariation.promotionalPrice && (
              <span className="rounded-full bg-[#9b7237] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                Oferta
              </span>
            )}
            <span className="rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[9px] font-semibold text-[#1c1917] backdrop-blur-sm">
              {defaultVariation.platingLabel}
            </span>
          </div>

          <div className="absolute right-3 top-3 z-10">
            <span className="flex items-center gap-1 rounded-full bg-[#1c1917]/80 px-2 py-1 text-[9px] font-medium text-white">
              <ShieldCheck className="h-3 w-3 text-[#d4af37]" /> 1 Ano Gar.
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#1c1917] shadow-lg transition hover:bg-[#9b7237] hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" /> Ver detalhes
            </button>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2 text-[10px] text-[#78716c]">
            <span className="flex items-center gap-1.5 font-semibold uppercase tracking-[0.22em] text-[#9b7237]">
              <Sparkles className="h-3 w-3" /> {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#d4af37] text-[#d4af37]" />
              <span className="font-semibold text-[#1c1917]">{product.rating}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="cursor-pointer font-serif text-[1.05rem] leading-snug text-[#1c1917] transition hover:text-[#9b7237]"
          >
            {product.title}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5">
            {product.variations.map((v) => (
              <span
                key={v.id}
                className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${
                  v.plating === 'OURO_18K'
                    ? 'border-[#f4d76a] bg-[#fff7d1] text-[#8a5d18]'
                    : v.plating === 'PRATA_925'
                    ? 'border-[#d7e4f0] bg-[#f3f8fd] text-[#334155]'
                    : 'border-[#eceae8] bg-[#fafaf9] text-[#27272a]'
                }`}
              >
                {v.plating === 'OURO_18K' ? 'Ouro 18k' : v.plating === 'PRATA_925' ? 'Prata 925' : 'Ródio'}
              </span>
            ))}
          </div>

          <div className="pt-1">
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-[#1c1917]">
                R$ {currentPrice.toFixed(2).replace('.', ',')}
              </span>
              {defaultVariation.promotionalPrice && (
                <span className="text-xs text-[#78716c] line-through">
                  R$ {defaultVariation.price.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9b7237]">
              ou 6x R$ {(currentPrice / 6).toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => onAddToCart(product, defaultVariation)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f5efe6] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1c1917] transition hover:bg-[#9b7237] hover:text-white"
        >
          <ShoppingBag className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  );
}
