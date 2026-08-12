import React from 'react';
import { Sparkles, Shield, Truck, Award, Instagram, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#fdfbf7] py-12 md:py-16 border-b border-[#e7e0d3]">
      {/* Decorative subtle background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8d8c3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5efe6] border border-[#e7e0d3] text-xs font-semibold text-[#9b7237] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#9b7237]" />
              <span>Flor de Menina • @flordemenina__to</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1c1917] tracking-tight leading-[1.15]">
              Realce sua beleza com a delicadeza da <span className="gold-gradient-text italic font-serif">Flor de Menina</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#78716c] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Peças exclusivas banhadas a Ouro 18k e Prata 925 com tripla camada antialérgica. 
              Inspiração oficial do nosso Instagram <a href="https://www.instagram.com/flordemenina__to/" target="_blank" rel="noopener noreferrer" className="text-[#9b7237] font-semibold underline hover:text-[#835e2b]">@flordemenina__to</a> com 1 ano de garantia e entrega expressa em Palmas/TO e todo o Brasil.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-[#e7e0d3] shadow-xs">
                <Award className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Garantia 1 Ano</span>
                <span className="text-[10px] text-[#78716c]">No banho & cravação</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-[#e7e0d3] shadow-xs">
                <Shield className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Antialérgico</span>
                <span className="text-[10px] text-[#78716c]">100% Livre de Níquel</span>
              </div>
              <div className="flex flex-col items-center lg:items-start p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-[#e7e0d3] shadow-xs">
                <Truck className="w-5 h-5 text-[#9b7237] mb-1" />
                <span className="text-xs font-bold text-[#1c1917]">Palmas & Brasil</span>
                <span className="text-[10px] text-[#78716c]">Motoboy & Correios</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-3.5 gold-gradient-bg text-white font-medium text-sm tracking-wider uppercase rounded-lg shadow-md hover:opacity-95 transition text-center cursor-pointer"
              >
                Ver Coleção Flor de Menina
              </a>
              <a
                href="https://www.instagram.com/flordemenina__to/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#9b7237] text-[#9b7237] font-semibold text-sm tracking-wider uppercase rounded-lg hover:bg-[#f5efe6] transition text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#9b7237]" />
                Siga @flordemenina__to
              </a>
            </div>
          </div>

          {/* Hero Banner Visual with Instagram Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Flor de Menina Semijoias Exclusivas"
                className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Instagram Floating Social Card */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-[#e7e0d3] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Instagram className="w-4 h-4 text-[#9b7237]" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#1c1917]">
                    <span>flordemenina__to</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 stroke-white" />
                  </div>
                  <span className="text-[10px] text-[#78716c] block">11K seguidores</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">Semijoias de Luxo • Palmas/TO</span>
                <h3 className="font-serif text-2xl font-light">Coleção Exclusiva Banhada a Ouro 18k</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

