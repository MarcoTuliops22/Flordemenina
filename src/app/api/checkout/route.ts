import { NextResponse } from 'next/server';
import { CheckoutSchema } from '@/lib/schemas';
import { PRODUCTS } from '@/lib/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Input Hardening: Zod strict schema validation
    const validation = CheckoutSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Dados do checkout inconsistentes ou malformados.',
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 2. PCI-DSS Compliance Enforcement Check:
    // Ensure raw card numbers or CVV never leak into server requests
    if ('cardNumber' in body || 'cardCvv' in body || 'pan' in body) {
      return NextResponse.json(
        {
          error: 'Violação de Segurança PCI-DSS: Dados de cartão em texto puro são proibidos no servidor.',
          code: 'PCI_DSS_VIOLATION',
        },
        { status: 400 }
      );
    }

    // 3. Recalculate Subtotal on Server-Side to prevent price tampering
    let calculatedSubtotal = 0;
    for (const item of data.items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Produto ID ${item.productId} não encontrado.` },
          { status: 404 }
        );
      }
      const variation = product.variations.find((v) => v.id === item.variationId);
      if (!variation) {
        return NextResponse.json(
          { error: `Variação ID ${item.variationId} não encontrada.` },
          { status: 404 }
        );
      }
      const priceToUse = variation.promotionalPrice || variation.price;
      calculatedSubtotal += priceToUse * item.quantity;
    }

    // Generate unique Order ID
    const orderId = `FM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 4. Payment Gateway Handling Simulation
    let paymentDetails: Record<string, unknown> = {};

    if (data.paymentMethod === 'PIX') {
      // 5% Off Discount for Pix Payments
      const pixDiscount = Math.round(calculatedSubtotal * 0.05 * 100) / 100;
      const finalAmount = Math.max(0, calculatedSubtotal - pixDiscount);
      
      // Dynamic simulated PIX Copy & Paste string
      const pixCopyPaste = `00020126580014br.gov.bcb.pix0136flordemenina.palmas@gmail.com520400005303986540${finalAmount.toFixed(2).replace('.', '')}5802BR5920FLOR DE MENINA SEMIJOIAS6006PALMAS62070503***6304A1B2`;

      paymentDetails = {
        pixQrCodeBase64: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ffffff"/><path d="M20 20h60v60H20zM40 40v20h20V40zM120 20h60v60h-60zM140 40v20h20V40zM20 120h60v60H20zM40 140v20h20v-20zM100 20h10v20h-10zM100 60h20v20h-20zM120 100h20v40h-20zM160 120h20v60h-20zM100 160h40v20h-40z" fill="%231c1917"/></svg>',
        pixCopyPaste,
        pixDiscount,
        expiresInMinutes: 15,
      };
    } else if (data.paymentMethod === 'CREDIT_CARD') {
      if (!data.cardToken) {
        return NextResponse.json(
          { error: 'Token de cartão de crédito ausente.' },
          { status: 400 }
        );
      }
      paymentDetails = {
        cardToken: data.cardToken,
        cardLast4: data.cardLast4 || '4242',
        cardBrand: data.cardBrand || 'Visa',
        installments: data.installments || 1,
        status: 'approved',
        authCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      };
    } else if (data.paymentMethod === 'BOLETO') {
      paymentDetails = {
        barcode: '23793.38128 60000.123456 7 89100000010000',
        pdfUrl: 'https://flordemenina.com.br/boleto-exemplo.pdf',
        dueDateDays: 3,
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Pedido criado com sucesso sob arquitetura de alta segurança.',
      orderId,
      subtotal: calculatedSubtotal,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      customerName: data.name,
      paymentDetails,
      securityAudit: {
        pciDssCompliant: true,
        sanitizedInput: true,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('API Error /api/checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar o pedido.' },
      { status: 500 }
    );
  }
}
