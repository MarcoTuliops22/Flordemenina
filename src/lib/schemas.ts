import { z } from 'zod';

// Regex for CPF validation (11 digits)
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
// Regex for CEP validation (8 digits)
const cepRegex = /^\d{5}-?\d{3}$/;
// Regex for Phone
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const CalculateShippingSchema = z.object({
  cep: z.string().trim().regex(cepRegex, { message: 'CEP inválido. Digite 8 números ex: 77000-000' }),
  totalWeightGram: z.number().positive().default(50),
  cartSubtotal: z.number().nonnegative().default(0),
});

export const CheckoutItemSchema = z.object({
  productId: z.string().min(1),
  variationId: z.string().min(1),
  quantity: z.number().int().positive().max(50),
});

export const CheckoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'Nome não deve conter caracteres especiais ou numéricos' }),
  email: z.string().trim().toLowerCase().email({ message: 'Endereço de e-mail inválido' }),
  cpf: z.string().trim().regex(cpfRegex, { message: 'CPF inválido' }),
  phone: z.string().trim().regex(phoneRegex, { message: 'Telefone inválido ex: (63) 99999-8888' }),
  cep: z.string().trim().regex(cepRegex, { message: 'CEP inválido' }),
  street: z.string().trim().min(2, { message: 'Rua é obrigatória' }),
  number: z.string().trim().min(1, { message: 'Número é obrigatório' }),
  complement: z.string().trim().max(100).optional(),
  neighborhood: z.string().trim().min(2, { message: 'Bairro é obrigatório' }),
  city: z.string().trim().min(2, { message: 'Cidade é obrigatória' }),
  state: z.string().trim().length(2, { message: 'UF com 2 letras ex: TO' }),
  shippingOption: z.enum(['MOTOBOY_LOCAL', 'RETIRO_SHOWROOM', 'MINI_ENVIOS', 'PAC', 'SEDEX', 'JADLOG', 'RETIRO_PAGO'], {
    errorMap: () => ({ message: 'Modalidade de frete inválida' }),
  }),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO'], {
    errorMap: () => ({ message: 'Método de pagamento inválido' }),
  }),
  items: z.array(CheckoutItemSchema).min(1, { message: 'O carrinho não pode estar vazio' }),
  // PCI-DSS Client-side tokenized card payload (NO raw PAN/CVV allowed!)
  cardToken: z.string().optional(),
  cardLast4: z.string().length(4).optional(),
  cardBrand: z.string().optional(),
  installments: z.number().int().min(1).max(12).optional(),
});

export const PaymentWebhookSchema = z.object({
  event: z.enum(['payment_approved', 'payment_failed', 'payment_pending', 'chargeback']),
  orderId: z.string().min(1),
  transactionId: z.string().min(1),
  amount: z.number().positive(),
  timestamp: z.number(),
  signature: z.string().min(1),
});

export type CalculateShippingInput = z.infer<typeof CalculateShippingSchema>;
export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type PaymentWebhookInput = z.infer<typeof PaymentWebhookSchema>;
