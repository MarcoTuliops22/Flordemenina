export type PlatingOption = 'OURO_18K' | 'PRATA_925' | 'RODIO_BRANCO';

export interface ProductVariation {
  id: string;
  name: string;
  plating: PlatingOption;
  platingLabel: string;
  size?: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: 'Brincos' | 'Colares' | 'Anéis' | 'Pulseiras' | 'Conjuntos';
  description: string;
  details: string[];
  warranty: string; // e.g., "1 ano de garantia no banho"
  antiAllergic: boolean; // Verniz hipoalergênico premium
  weightGram: number; // Peso para frete
  dimensionsCm: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
  variations: ProductVariation[];
  featured?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  variation: ProductVariation;
  quantity: number;
}

export interface ShippingOption {
  code: 'MOTOBOY_LOCAL' | 'RETIRO_SHOWROOM' | 'MINI_ENVIOS' | 'PAC' | 'SEDEX' | 'JADLOG' | 'RETIRO_PAGO';
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
  carrierLogo?: string;
  isLocalPickup?: boolean;
  /** true = preço consultado em tempo real; false = estimativa */
  isLiveQuote?: boolean;
}

export interface AddressInfo {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
  complemento?: string;
}

export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BOLETO';

export interface CheckoutFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  shippingOption: ShippingOption['code'];
  paymentMethod: PaymentMethod;
  // Card Token fields (Zero raw PAN saved on server!)
  cardToken?: string;
  cardLast4?: string;
  cardBrand?: string;
  installments?: number;
}
