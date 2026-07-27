import { NextResponse } from 'next/server';
import { CalculateShippingSchema } from '@/lib/schemas';
import {
  fetchAddressByCep,
  fetchLiveCorreiosRates,
  fetchMelhorEnvioRates,
  calculateShippingOptions,
  calculateCartWeightGram,
} from '@/lib/shipping';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parseResult = CalculateShippingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'CEP inválido. Por favor, digite um CEP com 8 números.',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { cep, totalWeightGram, cartSubtotal } = parseResult.data;
    const weightGram = calculateCartWeightGram(totalWeightGram || 50);

    const address = await fetchAddressByCep(cep);
    if (!address) {
      return NextResponse.json(
        { error: 'CEP não encontrado. Verifique o número digitado.' },
        { status: 404 }
      );
    }

    // Tenta Melhor Envio primeiro (cotação real multi-transportadora)
    const melhorEnvioOptions = await fetchMelhorEnvioRates(cep, weightGram, cartSubtotal);

    // Se Melhor Envio não disponível, consulta Correios ao vivo
    const liveCorreios = melhorEnvioOptions ? null : await fetchLiveCorreiosRates(cep, weightGram);

    const options = calculateShippingOptions(
      address.uf,
      address.localidade,
      weightGram,
      cartSubtotal,
      cep,
      liveCorreios,
      melhorEnvioOptions
    );

    const hasLiveQuote = options.some((opt) => opt.isLiveQuote);

    return NextResponse.json({
      success: true,
      address: {
        cep: address.cep,
        street: address.logradouro,
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
      },
      options,
      meta: {
        weightGram,
        source: melhorEnvioOptions ? 'melhor_envio' : liveCorreios ? 'correios_live' : 'fallback',
        liveCorreiosFetched: !!liveCorreios,
        hasLiveQuote,
      },
    });
  } catch (error) {
    console.error('Erro no cálculo de frete:', error);
    return NextResponse.json(
      { error: 'Não foi possível consultar o frete neste momento.' },
      { status: 500 }
    );
  }
}
