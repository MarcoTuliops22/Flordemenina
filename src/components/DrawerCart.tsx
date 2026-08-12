'use client';

import React from 'react';
import { CartItem, ShippingOption } from '@/lib/types';
import { X, Trash2, ShoppingBag, Truck, Lock, ArrowRight } from 'lucide-react';

interface DrawerCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, variationId: string, quantity: number) => void;
  onRemoveItem: (productId: string, variationId: string) => void;
  selectedShipping: ShippingOption | null;
  onOpenCheckout: () => void;
}

export default function DrawerCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  selectedShipping,
  onOpenCheckout,
}: DrawerCartProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.variation.promotionalPrice || item.variation.price;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbf7] shadow-2xl flex flex-col border-l border-[#e7e0d3]">
          
          {/* Cart Header */}
          <div className="p-5 bg-white border-b border-[#e7e0d3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9b7237]" />
              <h2 className="font-serif text-lg font-normal text-[#1c1917]">Seu Carrinho de Semijoias</h2>
              <span className="text-xs bg-[#f5efe6] text-[#9b7237] font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#f5efe6] text-[#78716c] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#f5efe6] p-4 border-b border-[#e7e0d3]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1c1917]">
              <Truck className="w-4 h-4 text-[#9b7237]" />
              Frete calculado conforme a sua região de entrega.
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#cbb89b] mx-auto opacity-50" />
                <p className="text-sm text-[#78716c] font-light">Seu carrinho está vazio no momento.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#9b7237] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#835e2b] transition"
                >
                  Explorar Semijoias
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.variation.promotionalPrice || item.variation.price;
                return (
                  <div
                    key={`${item.product.id}-${item.variation.id}`}
                    className="flex gap-3 bg-white p-3 rounded-xl border border-[#e7e0d3] shadow-2xs items-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg bg-[#f5efe6]"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif text-xs font-medium text-[#1c1917] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="text-[10px] text-[#9b7237] font-semibold">
                        {item.variation.name}
                      </div>
                      <div className="text-xs font-bold text-[#1c1917]">
                        R$ {itemPrice.toFixed(2).replace('.', ',')}
                      </div>

                      {/* Quantity Selector & Remove */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center border border-[#e7e0d3] rounded-md bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.variation.id,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-[#78716c] hover:bg-[#f5efe6]"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.variation.id,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-[#78716c] hover:bg-[#f5efe6]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.variation.id)}
                          className="text-red-500 hover:text-red-700 p-1 text-xs"
                          title="Remover Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#e7e0d3] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78716c]">
                  <span>Subtotal das Peças:</span>
                  <span className="font-semibold text-[#1c1917]">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="flex justify-between text-[#78716c]">
                  <span>Modalidade de Envio:</span>
                  <span className="font-semibold text-[#1c1917]">
                    {selectedShipping
                      ? `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`
                      : 'A calcular'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1c1917] pt-2 border-t border-[#e7e0d3]">
                  <span>Total Final:</span>
                  <span className="gold-gradient-text text-lg">R$ {grandTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-4 gold-gradient-bg text-white font-medium text-xs tracking-widest uppercase rounded-xl shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Finalizar Pedido Seguro <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-center text-[#78716c] flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-[#9b7237]" /> Ambientes Criptografado SSL 256-bit & PCI-DSS
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
