import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PaymentWebhookSchema } from '@/lib/schemas';

// Chave secreta compartilhada para HMAC SHA-256
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'flor_de_menina_secret_key_2026_owasp';

function verifySignature(payload: string, signature: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'utf-8'),
      Buffer.from(expectedSignature, 'utf-8')
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-webhook-signature') || request.headers.get('x-hub-signature-256');

    if (!signature) {
      return NextResponse.json(
        { error: 'Assinatura HMAC ausente no cabeçalho (OWASP Webhook Security).' },
        { status: 401 }
      );
    }

    // 1. HMAC Signature Verification against replay & spoofing attacks
    const isValidSignature = verifySignature(rawBody, signature);
    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Assinatura HMAC inválida. Tentativa de webhook não autorizada.' },
        { status: 403 }
      );
    }

    // 2. Validate payload structure with Zod
    const bodyJson = JSON.parse(rawBody);
    const parseResult = PaymentWebhookSchema.safeParse(bodyJson);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Payload de webhook inválido.', errors: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { event, orderId, transactionId } = parseResult.data;

    // 3. Process status update (Simulation)
    console.log(`[WEBHOOK CONCILIATION] Pedido: ${orderId} | Status: ${event} | Transação: ${transactionId}`);

    return NextResponse.json({
      received: true,
      orderId,
      status: event,
      conciliatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar notificação de pagamento.' },
      { status: 500 }
    );
  }
}
