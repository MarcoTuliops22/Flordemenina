'use client';

import React, { useState, useEffect } from 'react';
import { CartItem, ShippingOption, PaymentMethod } from '@/lib/types';
import { ShieldCheck, Lock, QrCode, CreditCard, FileText, CheckCircle, Copy, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import FreightCalculator from './FreightCalculator';

interface TransparentCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function TransparentCheckout({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}: TransparentCheckoutProps) {
  if (!isOpen) return null;

  // Form step state
  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'SUCCESS'>('DETAILS');

  // Customer & Address Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Shipping & Payment
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');

  // Card Tokenization Simulator (Client-Side only!)
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Status & Response
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderResponse, setOrderResponse] = useState<any>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [pixTimer, setPixTimer] = useState(900); // 15 minutos

  // Calculation Math
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.variation.promotionalPrice || item.variation.price;
    return acc + price * item.quantity;
  }, 0);

  const cartWeightGram = cartItems.reduce((acc, item) => acc + item.product.weightGram * item.quantity, 0);

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const pixDiscount = paymentMethod === 'PIX' ? subtotal * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - pixDiscount + shippingCost);

  // Timer for Pix Expiration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'SUCCESS' && paymentMethod === 'PIX' && pixTimer > 0) {
      interval = setInterval(() => {
        setPixTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, paymentMethod, pixTimer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !cpf || !phone || !cep || !street || !number || !city || !state) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios de entrega.');
      return;
    }

    if (!selectedShipping) {
      setErrorMessage('Por favor, escolha uma modalidade de envio de frete.');
      return;
    }

    setStep('PAYMENT');
  };

  const handleFinalizeOrder = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      let cardTokenPayload = {};
      if (paymentMethod === 'CREDIT_CARD') {
        if (!cardNumber || !cardExp || !cardCvv || !cardHolder) {
          setErrorMessage('Preencha os dados do cartão de crédito.');
          setLoading(false);
          return;
        }
        cardTokenPayload = {
          cardToken: `tok_simulated_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          cardLast4: cardNumber.replace(/\D/g, '').slice(-4) || '4242',
          cardBrand: 'Visa',
          installments,
        };
      }

      const payload = {
        name,
        email,
        cpf,
        phone,
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        shippingOption: selectedShipping?.code,
        paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          variationId: item.variation.id,
          quantity: item.quantity,
        })),
        ...cardTokenPayload,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Falha ao processar o checkout.');
      } else {
        setOrderResponse(data);
        setStep('SUCCESS');
        onClearCart();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro de conexão ao processar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (orderResponse?.paymentDetails?.pixCopyPaste) {
      navigator.clipboard.writeText(orderResponse.paymentDetails.pixCopyPaste);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#fdfbf7] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e7e0d3] overflow-hidden my-8">
        
        {/* Checkout Header */}
        <div className="bg-white p-5 border-b border-[#e7e0d3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#9b7237]" />
            <h2 className="font-serif text-xl font-normal text-[#1c1917]">
              Checkout Transparente Flor de Menina
            </h2>
          </div>
          <span className="text-[11px] font-semibold bg-[#f5efe6] text-[#9b7237] px-3 py-1 rounded-full border border-[#e7e0d3] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> PCI-DSS & OWASP Protected
          </span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 text-center border-b border-[#e7e0d3] bg-[#f5efe6] text-xs font-semibold">
          <div className={`py-3 ${step === 'DETAILS' ? 'bg-[#9b7237] text-white' : 'text-[#78716c]'}`}>
            1. Dados & Entrega
          </div>
          <div className={`py-3 ${step === 'PAYMENT' ? 'bg-[#9b7237] text-white' : 'text-[#78716c]'}`}>
            2. Pagamento
          </div>
          <div className={`py-3 ${step === 'SUCCESS' ? 'bg-emerald-700 text-white' : 'text-[#78716c]'}`}>
            3. Confirmação
          </div>
        </div>

        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Customer Details & Shipping selection */}
        {step === 'DETAILS' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-base font-normal text-[#1c1917] border-b border-[#e7e0d3] pb-2">
                1. Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg text-[#1c1917]"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@exemplo.com"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg text-[#1c1917]"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg text-[#1c1917]"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(63) 99999-8888"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg text-[#1c1917]"
                  />
                </div>
              </div>
            </div>

            {/* Address & Freight Selection with Auto-Fill */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-base font-normal text-[#1c1917] border-b border-[#e7e0d3] pb-2">
                2. Endereço de Entrega & Cotação de Frete
              </h3>
              
              <FreightCalculator
                cartSubtotal={subtotal}
                totalWeightGram={cartWeightGram}
                onSelectShipping={(opt) => {
                  setSelectedShipping(opt);
                }}
                onAddressFound={(addr) => {
                  setCep(addr.cep);
                  if (addr.street) setStreet(addr.street);
                  if (addr.neighborhood) setNeighborhood(addr.neighborhood);
                  if (addr.city) setCity(addr.city);
                  if (addr.state) setState(addr.state);
                }}
                selectedShippingCode={selectedShipping?.code}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Rua / Logradouro *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Auto-preenchido pelo CEP"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="123"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Complemento</label>
                  <input
                    type="text"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    placeholder="Apto 101"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Auto-preenchido"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Cidade *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Palmas"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[#44403c] font-semibold mb-1">Estado (UF) *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={state}
                    onChange={(e) => setState(e.target.value.toUpperCase())}
                    placeholder="TO"
                    className="w-full p-2.5 bg-white border border-[#e7e0d3] rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-[#e7e0d3]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs text-[#78716c] hover:text-[#1c1917]"
              >
                Voltar ao Carrinho
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 gold-gradient-bg text-white font-medium text-xs tracking-widest uppercase rounded-xl shadow-md hover:opacity-95 transition"
              >
                Ir para o Pagamento →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'PAYMENT' && (
          <div className="p-6 space-y-6">
            <button
              onClick={() => setStep('DETAILS')}
              className="text-xs text-[#9b7237] font-semibold flex items-center gap-1 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Editar dados pessoais ou frete
            </button>

            {/* Payment Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('PIX')}
                className={`p-3 rounded-xl border text-xs font-semibold transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'PIX'
                    ? 'border-[#9b7237] bg-[#f5efe6] text-[#1c1917] ring-2 ring-[#9b7237]'
                    : 'border-[#e7e0d3] bg-white text-[#78716c]'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#9b7237]" />
                <span>PIX (5% OFF)</span>
                <span className="text-[9px] text-emerald-700 font-bold">Aprovação Imediata</span>
              </button>

              <button
                onClick={() => setPaymentMethod('CREDIT_CARD')}
                className={`p-3 rounded-xl border text-xs font-semibold transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-[#9b7237] bg-[#f5efe6] text-[#1c1917] ring-2 ring-[#9b7237]'
                    : 'border-[#e7e0d3] bg-white text-[#78716c]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#9b7237]" />
                <span>Cartão de Crédito</span>
                <span className="text-[9px] text-[#9b7237]">Até 6x Sem Juros</span>
              </button>

              <button
                onClick={() => setPaymentMethod('BOLETO')}
                className={`p-3 rounded-xl border text-xs font-semibold transition flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'BOLETO'
                    ? 'border-[#9b7237] bg-[#f5efe6] text-[#1c1917] ring-2 ring-[#9b7237]'
                    : 'border-[#e7e0d3] bg-white text-[#78716c]'
                }`}
              >
                <FileText className="w-5 h-5 text-[#9b7237]" />
                <span>Boleto Bancário</span>
                <span className="text-[9px] text-[#78716c]">Vencimento em 3 dias</span>
              </button>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#fdfbf7] p-4 rounded-xl border border-[#e7e0d3] space-y-2 text-xs">
              <div className="flex justify-between text-[#78716c]">
                <span>Subtotal ({cartItems.length} itens):</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {paymentMethod === 'PIX' && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Desconto Pix (5% OFF):</span>
                  <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#78716c]">
                <span>Frete ({selectedShipping?.name}):</span>
                <span>{shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1c1917] pt-2 border-t border-[#e7e0d3]">
                <span>Total a Pagar:</span>
                <span className="gold-gradient-text text-lg">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            {/* Final CTA */}
            <button
              onClick={handleFinalizeOrder}
              disabled={loading}
              className="w-full py-4 gold-gradient-bg text-white font-medium text-xs tracking-widest uppercase rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processando com Criptografia SSL...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Concluir Compra Segura
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 3: Order Confirmation & Receipt */}
        {step === 'SUCCESS' && orderResponse && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-normal text-[#1c1917]">
                Pedido Realizado com Sucesso!
              </h3>
              <p className="text-xs text-[#78716c]">
                Código do Pedido: <strong className="text-[#9b7237]">{orderResponse.orderId}</strong>
              </p>
              <p className="text-xs text-[#78716c]">
                Enviamos os detalhes e comprovante para <strong>{email}</strong>.
              </p>
            </div>

            {/* PIX QR Code & Copy String */}
            {paymentMethod === 'PIX' && (
              <div className="bg-[#f5efe6] p-6 rounded-2xl border border-[#e7e0d3] space-y-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#1c1917]">
                  <QrCode className="w-4 h-4 text-[#9b7237]" />
                  <span>Escaneie o QR Code ou Copie o Código</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#e7e0d3] inline-block shadow-xs">
                  <img
                    src={orderResponse.paymentDetails.pixQrCodeBase64}
                    alt="QR Code Pix"
                    className="w-44 h-44 mx-auto"
                  />
                </div>

                <div className="text-xs text-[#78716c] font-medium flex items-center justify-center gap-1">
                  <span>Tempo de expiração do Pix:</span>
                  <span className="font-mono font-bold text-red-600 bg-white px-2 py-0.5 rounded border border-red-200">
                    {formatTimer(pixTimer)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopyPix}
                    className="w-full py-3 bg-[#9b7237] text-white text-xs font-semibold rounded-xl hover:bg-[#835e2b] transition flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedPix ? 'CÓDIGO PIX COPIADO!' : 'Copiar Código Pix (Copia e Cola)'}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#1c1917] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#44403c] transition"
            >
              Voltar à Loja Flor de Menina
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
