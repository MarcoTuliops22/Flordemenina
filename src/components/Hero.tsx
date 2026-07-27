import React from 'react';
import { Sparkles, Shield, Truck, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#fdfbf7] py-12 md:py-20 border-b border-[#e7e0d3]">
      {/* Decorative subtle background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8d8c3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5efe6] border border-[#e7e0d3] text-xs font-semibold text-[#9b7237] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#9b7237]" />
              <span>Alta Joalheria em Semijoias Finas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1c1917] tracking-tight leading-[1.15]">
              Realce sua elegância com <span className="gold-gradient-text italic">brilho extraordinário</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#78716c] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Peças exclusivas banhadas a Ouro 18k e Prata 925 com tripla camada antialérgica. 
              Garantia de 1 ano, envio com frete grátis e opção de retirada local em Palmas/TO.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start p-2.5 rounded-lg bg-white/70 border border-[#e7e0d3]/60 shadow-2xs">
                <Award className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Garantia 1 Ano</span>
                <span className="text-[10px] text-[#78716c]">No banho & pedras</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-2.5 rounded-lg bg-white/70 border border-[#e7e0d3]/60 shadow-2xs">
                <Shield className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Antialérgico</span>
                <span className="text-[10px] text-[#78716c]">Verniz alemão nickel-free</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-2.5 rounded-lg bg-white/70 border border-[#e7e0d3]/60 shadow-2xs">
                <Truck className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Mini Envios & SEDEX</span>
                <span className="text-[10px] text-[#78716c]">5 opções de entrega</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-3.5 gold-gradient-bg text-white font-medium text-sm tracking-wider uppercase rounded-md shadow-md hover:opacity-95 transition text-center"
              >
                Ver Coleção Completa
              </a>
              <a
                href="#frete"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#9b7237] text-[#9b7237] font-medium text-sm tracking-wider uppercase rounded-md hover:bg-[#f5efe6] transition text-center"
              >
                Simular Frete por CEP
              </a>
            </div>
          </div>

          {/* Hero Banner Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Flor de Menina Semijoias Exclusivas"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">Coleção Glamour 2026</span>
                <h3 className="font-serif text-2xl font-light">Brincos, Colares & Anéis Banhados</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
