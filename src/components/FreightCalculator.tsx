'use client';

import React, { useState } from 'react';
import { ShippingOption } from '@/lib/types';
import { Truck, MapPin, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FreightCalculatorProps {
  cartSubtotal: number;
  totalWeightGram?: number;
  onSelectShipping?: (option: ShippingOption) => void;
  onAddressFound?: (address: { cep: string; street: string; neighborhood: string; city: string; state: string }) => void;
  selectedShippingCode?: string;
}

export default function FreightCalculator({
  cartSubtotal,
  totalWeightGram = 50,
  onSelectShipping,
  onAddressFound,
  selectedShippingCode,
}: FreightCalculatorProps) {
  const [cepInput, setCepInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<{ city: string; state: string; street: string; neighborhood: string; cep: string } | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [quoteSource, setQuoteSource] = useState<string | null>(null);

  const triggerCalculation = async (rawCep: string) => {
    const cleanCep = rawCep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cep: cleanCep,
          totalWeightGram,
          cartSubtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Não foi possível consultar o frete para este CEP.');
        setShippingOptions([]);
      } else {
        const addr = {
          cep: data.address.cep,
          street: data.address.street || '',
          neighborhood: data.address.neighborhood || '',
          city: data.address.city || '',
          state: data.address.state || '',
        };

        setAddressData(addr);
        setShippingOptions(data.options || []);
        setQuoteSource(data.meta?.source || null);

        // Auto-fill address in parent component (e.g. Checkout)
        if (onAddressFound) {
          onAddressFound(addr);
        }

        // Auto-select first available local or express shipping option if none selected
        if (data.options && data.options.length > 0 && onSelectShipping && !selectedShippingCode) {
          onSelectShipping(data.options[0]);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão ao consultar frete.');
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, '').slice(0, 8);
    let masked = digits;
    if (digits.length > 5) {
      masked = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    setCepInput(masked);

    // Auto-calculate immediately when 8 digits are entered
    if (digits.length === 8) {
      triggerCalculation(digits);
    }
  };

  return (
    <div className="bg-[#fdfbf7] p-4 rounded-xl border border-[#e7e0d3] space-y-3">
      {/* CEP Input Container */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716c]" />
          <input
            type="text"
            value={cepInput}
            onChange={handleCepChange}
            placeholder="Digite seu CEP (ex: 77015-000)"
            maxLength={9}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#e7e0d3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9b7237] text-[#1c1917]"
          />
        </div>
        <button
          type="button"
          onClick={() => triggerCalculation(cepInput)}
          disabled={loading}
          className="px-4 py-2 bg-[#9b7237] text-white text-xs font-semibold rounded-lg hover:bg-[#835e2b] transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
          <span>Buscar</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {addressData && (
        <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-md border border-emerald-200 font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Endereço localizado: <strong>{addressData.city}/{addressData.state}</strong> {addressData.neighborhood ? `• Bairro: ${addressData.neighborhood}` : ''} {addressData.street ? `• ${addressData.street}` : ''}
          </span>
        </div>
      )}

      {/* Render Shipping Options with Unique Keys */}
      {shippingOptions.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1c1917]">
              Modalidades de Envio Disponíveis:
            </span>
            {quoteSource === 'melhor_envio' || quoteSource === 'correios_live' ? (
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ Cotação em tempo real
              </span>
            ) : (
              <span className="text-[9px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Valores estimados
              </span>
            )}
          </div>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {shippingOptions.map((opt) => {
              const isSelected = selectedShippingCode === opt.code;
              return (
                <div
                  key={opt.code}
                  onClick={() => onSelectShipping && onSelectShipping(opt)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'border-[#9b7237] bg-[#f5efe6] font-semibold ring-1 ring-[#9b7237]'
                      : 'border-[#e7e0d3] bg-white hover:bg-[#fdfbf7]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base">{opt.carrierLogo}</span>
                    <div>
                      <div className="font-semibold text-[#1c1917] flex items-center gap-1">
                        {opt.name}
                        {opt.isLocalPickup && (
                          <span className="bg-[#9b7237] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                            Local Palmas
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#78716c]">{opt.description}</div>
                      <div className="text-[10px] text-[#9b7237] font-medium">
                        Prazo: {opt.deliveryDays === 0 ? 'Retirada Imediata / Hoje' : `${opt.deliveryDays} dia(s) útil(eis)`}
                        {opt.isLiveQuote && (
                          <span className="ml-1 text-emerald-600">• Preço real</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-2">
                    <div className="font-bold text-[#1c1917]">
                      {opt.price === 0 ? (
                        <span className="text-emerald-700 font-extrabold">GRÁTIS</span>
                      ) : (
                        `R$ ${opt.price.toFixed(2).replace('.', ',')}`
                      )}
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#9b7237]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
