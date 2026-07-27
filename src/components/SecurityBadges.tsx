import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Award } from 'lucide-react';

export default function SecurityBadges() {
  return (
    <div className="bg-[#f5efe6] border-y border-[#e7e0d3] py-6 px-4">
      <div className="max-w-7xl mx-mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/60 shadow-xs border border-[#e7e0d3]/60">
          <ShieldCheck className="w-7 h-7 text-[#9b7237] mb-1.5" />
          <span className="font-semibold text-xs text-[#1c1917] tracking-wide">COMPRA 100% SEGURA</span>
          <span className="text-[11px] text-[#78716c]">Criptografia SSL 256-bit</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/60 shadow-xs border border-[#e7e0d3]/60">
          <Lock className="w-7 h-7 text-[#9b7237] mb-1.5" />
          <span className="font-semibold text-xs text-[#1c1917] tracking-wide">PCI-DSS COMPLIANT</span>
          <span className="text-[11px] text-[#78716c]">Zero dados de cartão salvos</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/60 shadow-xs border border-[#e7e0d3]/60">
          <Award className="w-7 h-7 text-[#9b7237] mb-1.5" />
          <span className="font-semibold text-xs text-[#1c1917] tracking-wide">1 ANO DE GARANTIA</span>
          <span className="text-[11px] text-[#78716c]">Certificado em cada peça</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/60 shadow-xs border border-[#e7e0d3]/60">
          <CheckCircle2 className="w-7 h-7 text-[#9b7237] mb-1.5" />
          <span className="font-semibold text-xs text-[#1c1917] tracking-wide">TECNOLOGIA ANTIALÉRGICA</span>
          <span className="text-[11px] text-[#78716c]">100% Livre de Níquel</span>
        </div>
      </div>
    </div>
  );
}
