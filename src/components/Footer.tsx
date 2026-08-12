import React from 'react';
import { Instagram, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSecurityModal: () => void;
}

export default function Footer({ onOpenSecurityModal }: FooterProps) {
  return (
    <footer className="bg-[#1c1917] text-[#f5efe6] pt-16 pb-8 border-t border-[#44403c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl tracking-widest text-[#d4af37]">FLOR DE MENINA</span>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              Semijoias exclusivas com tripla camada de banho em Ouro 18k e Prata 925. 
              Tecnologia alemã antialérgica e garantia de 1 ano. 
              Inspirado no perfil oficial <a href="https://www.instagram.com/flordemenina__to/" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline">@flordemenina__to</a>.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#d4af37]">
              <MapPin className="w-4 h-4" />
              <span>Palmas - Tocantins (TO)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#d4af37]">Coleções</h4>
            <ul className="text-xs text-[#a8a29e] space-y-2">
              <li><a href="#catalog" className="hover:text-white transition">Brincos Cravejados</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Colares & Chokers</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Anéis Solitários</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Pulseiras Riviera</a></li>
              <li><a href="#catalog" className="hover:text-white transition">Conjuntos Esmeralda</a></li>
            </ul>
          </div>

          {/* Logistics & Shipping */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#d4af37]">Envio & Retirada</h4>
            <ul className="text-xs text-[#a8a29e] space-y-2">
              <li>📦 Correios Mini Envios & SEDEX</li>
              <li>🛵 Uber Flash / Motoboy em Palmas/TO</li>
              <li>📍 Taquaralto, Aurenys & Plano Diretor</li>
              <li>🛡️ 1 Ano de Garantia com Certificado</li>
            </ul>
          </div>

          {/* Instagram & Security Audit Trigger */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#d4af37]">Siga no Instagram</h4>
            <a
              href="https://www.instagram.com/flordemenina__to/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-xs font-bold text-white hover:opacity-90 transition shadow-sm"
            >
              <Instagram className="w-4 h-4" /> @flordemenina__to
            </a>

            <div>
              <button
                onClick={onOpenSecurityModal}
                className="w-full text-left p-3 rounded-lg bg-[#27272a] border border-[#9b7237] text-xs text-white hover:bg-[#3f3f46] transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <div>
                    <div className="font-semibold text-xs">Auditoria de Segurança</div>
                    <div className="text-[10px] text-[#a8a29e]">Conformidade OWASP & PCI-DSS</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#9b7237] text-white font-bold px-2 py-0.5 rounded">Audit</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716c] gap-4">
          <div>
            © 2026 Flor de Menina Semijoias (@flordemenina__to). Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            Inspiração total <Sparkles className="w-3.5 h-3.5 text-[#d4af37] inline" /> @flordemenina__to • Palmas / TO
          </div>
        </div>

      </div>
    </footer>
  );
}

