import { AddressInfo, ShippingOption } from './types';
import {
  SHIPPING_ORIGIN_CEP,
  DEFAULT_PACKAGE,
  MIN_SHIPPING_WEIGHT_GRAM,
  PACKAGING_WEIGHT_GRAM,
} from './shipping-config';

const FETCH_TIMEOUT_MS = 8000;

export interface LiveCorreiosRates {
  miniPrice?: number;
  miniDays?: number;
  pacPrice?: number;
  pacDays?: number;
  sedexPrice?: number;
  sedexDays?: number;
}

interface PackageDimensions {
  length: number;
  width: number;
  height: number;
}

/** Calcula peso total do carrinho incluindo embalagem */
export function calculateCartWeightGram(itemsWeightGram: number): number {
  return Math.max(MIN_SHIPPING_WEIGHT_GRAM, itemsWeightGram + PACKAGING_WEIGHT_GRAM);
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Consulta CEP gratuita via ViaCEP
 */
export async function fetchAddressByCep(cep: string): Promise<AddressInfo | null> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const response = await fetchWithTimeout(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data.erro) return null;

    return {
      cep: data.cep,
      logradouro: data.logradouro || '',
      bairro: data.bairro || '',
      localidade: data.localidade || '',
      uf: data.uf || '',
      numero: '',
      complemento: data.complemento || '',
    };
  } catch (error) {
    console.error('Erro ao consultar ViaCEP:', error);
    return null;
  }
}

/** Converte valor brasileiro "59,77" ou "1.234,56" para número */
function parseBrazilianCurrency(value: string): number {
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

/** Faz parse do XML retornado pelo CalcPrecoPrazo dos Correios */
function parseCorreiosXml(xmlText: string): LiveCorreiosRates {
  const rates: LiveCorreiosRates = {};
  const blocks = xmlText.match(/<cServico>[\s\S]*?<\/cServico>/g) || [];

  for (const block of blocks) {
    const code = block.match(/<Codigo>(\d+)<\/Codigo>/)?.[1];
    const errorCode = block.match(/<Erro>(\d+)<\/Erro>/)?.[1];
    const valor = block.match(/<Valor>([\d.,]+)<\/Valor>/)?.[1];
    const prazo = block.match(/<PrazoEntrega>(\d+)<\/PrazoEntrega>/)?.[1];

    if (errorCode !== '0' || !valor || !code) continue;

    const price = parseBrazilianCurrency(valor);
    const days = prazo ? parseInt(prazo, 10) : undefined;

    // Códigos de balcão (sem contrato)
    if (code === '04227' || code === '4227') {
      rates.miniPrice = price;
      rates.miniDays = days;
    } else if (code === '04510' || code === '4510') {
      rates.pacPrice = price;
      rates.pacDays = days;
    } else if (code === '04014' || code === '4014') {
      rates.sedexPrice = price;
      rates.sedexDays = days;
    }
  }

  return rates;
}

/**
 * Cotação ao vivo via WebService público dos Correios (CalcPrecoPrazo)
 * Origem: Palmas - TO
 */
export async function fetchLiveCorreiosRates(
  destCep: string,
  weightGram: number,
  dimensions: PackageDimensions = DEFAULT_PACKAGE
): Promise<LiveCorreiosRates | null> {
  const cleanDestCep = destCep.replace(/\D/g, '');
  const cleanOriginCep = SHIPPING_ORIGIN_CEP.replace(/\D/g, '');
  if (cleanDestCep.length !== 8) return null;

  const weight = Math.max(MIN_SHIPPING_WEIGHT_GRAM, Math.round(weightGram));

  const params = new URLSearchParams({
    nCdEmpresa: '',
    sDsSenha: '',
    sCepOrigem: cleanOriginCep,
    sCepDestino: cleanDestCep,
    nvPsGrama: String(weight),
    nCdFormato: '1',
    nvComprimento: String(dimensions.length),
    nvAltura: String(dimensions.height),
    nvLargura: String(dimensions.width),
    sCdMaoPropria: 'n',
    nvValorDeclarado: '0',
    sCdAvisoRecebimento: 'n',
    nCdServico: '04227,04510,04014',
    StrRetorno: 'xml',
  });

  const urls = [
    `https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${params}`,
    `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${params}`,
  ];

  for (const url of urls) {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FlorDeMenina/1.0)' },
        next: { revalidate: 3600 },
      });

      if (!response.ok) continue;

      const xmlText = await response.text();
      const rates = parseCorreiosXml(xmlText);

      if (rates.pacPrice || rates.sedexPrice || rates.miniPrice) {
        return rates;
      }
    } catch (err) {
      console.warn(`Correios WebService indisponível (${url}):`, err);
    }
  }

  return null;
}

interface MelhorEnvioQuote {
  id: number;
  name: string;
  price: string;
  custom_price: string;
  delivery_time: number;
  custom_delivery_time: number;
  company?: { name: string; picture?: string };
}

/** Mapeia resposta do Melhor Envio para códigos internos */
function mapMelhorEnvioService(name: string, companyName?: string): ShippingOption['code'] | null {
  const normalized = `${name} ${companyName || ''}`.toLowerCase();

  if (normalized.includes('mini') || normalized.includes('.package') || normalized.includes('pac mini')) {
    return 'MINI_ENVIOS';
  }
  if (normalized.includes('sedex')) return 'SEDEX';
  if (normalized.includes('pac')) return 'PAC';
  if (normalized.includes('jadlog')) return 'JADLOG';

  return null;
}

const CARRIER_LOGOS: Record<ShippingOption['code'], string> = {
  MINI_ENVIOS: '📦',
  PAC: '🟡',
  SEDEX: '🚀',
  JADLOG: '🚚',
  MOTOBOY_LOCAL: '🛵',
  RETIRO_SHOWROOM: '✨',
  RETIRO_PAGO: '🏪',
};

/**
 * Cotação REAL via API Melhor Envio (requer MELHOR_ENVIO_TOKEN no .env)
 * Retorna preços reais de Correios, Jadlog e outras transportadoras.
 */
export async function fetchMelhorEnvioRates(
  destCep: string,
  weightGram: number,
  subtotal: number,
  dimensions: PackageDimensions = DEFAULT_PACKAGE
): Promise<ShippingOption[] | null> {
  const token = process.env.MELHOR_ENVIO_TOKEN;
  if (!token) return null;

  const baseUrl =
    process.env.MELHOR_ENVIO_SANDBOX === 'true'
      ? 'https://sandbox.melhorenvio.com.br'
      : 'https://melhorenvio.com.br';

  const weightKg = Math.max(0.1, weightGram / 1000);

  try {
    const response = await fetchWithTimeout(`${baseUrl}/api/v2/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Flor de Menina Semijoias (contato@flordemenina.com.br)',
      },
      body: JSON.stringify({
        from: { postal_code: SHIPPING_ORIGIN_CEP.replace(/\D/g, '') },
        to: { postal_code: destCep.replace(/\D/g, '') },
        products: [
          {
            id: '1',
            width: dimensions.width,
            height: dimensions.height,
            length: dimensions.length,
            weight: weightKg,
            insurance_value: Math.max(subtotal, 1),
            quantity: 1,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.warn('Melhor Envio API erro:', response.status, await response.text());
      return null;
    }

    const quotes: MelhorEnvioQuote[] = await response.json();
    const options: ShippingOption[] = [];
    const seenCodes = new Set<string>();

    for (const quote of quotes) {
      const code = mapMelhorEnvioService(quote.name, quote.company?.name);
      if (!code || seenCodes.has(code)) continue;

      seenCodes.add(code);

      const rawPrice = parseFloat(quote.custom_price || quote.price);
      if (Number.isNaN(rawPrice)) continue;

      const deliveryDays = quote.custom_delivery_time || quote.delivery_time;

      options.push({
        code,
        name: `${quote.company?.name || 'Correios'} ${quote.name}`.trim(),
        description: 'Cotação em tempo real via Melhor Envio',
        price: Math.round(rawPrice * 100) / 100,
        deliveryDays,
        carrierLogo: CARRIER_LOGOS[code],
        isLiveQuote: true,
      });
    }

    return options.length > 0 ? options : null;
  } catch (err) {
    console.warn('Melhor Envio indisponível:', err);
    return null;
  }
}

/** Tabela de referência Correios 2026 — usada apenas quando APIs ao vivo falham */
function getCorreiosFallbackRates(uf: string, weightGram: number) {
  const ufUpper = uf.toUpperCase();
  const weightFactor = Math.max(0, (weightGram - 100) / 500) * 4.0;

  if (ufUpper === 'TO') {
    return { miniPrice: 15.9, pacPrice: 28.5 + weightFactor, sedexPrice: 42.9 + weightFactor, pacDays: 4, sedexDays: 2, miniDays: 4 };
  }
  if (['PA', 'AM', 'AP', 'RO', 'AC', 'RR'].includes(ufUpper)) {
    return { miniPrice: 19.9, pacPrice: 42.9 + weightFactor, sedexPrice: 68.5 + weightFactor * 1.5, pacDays: 6, sedexDays: 3, miniDays: 6 };
  }
  if (['DF', 'GO', 'MT', 'MS'].includes(ufUpper)) {
    return { miniPrice: 22.9, pacPrice: 48.9 + weightFactor, sedexPrice: 79.9 + weightFactor * 1.8, pacDays: 6, sedexDays: 3, miniDays: 7 };
  }
  if (['SP', 'RJ', 'MG', 'ES'].includes(ufUpper)) {
    return { miniPrice: 24.9, pacPrice: 59.77 + weightFactor, sedexPrice: 96.65 + weightFactor * 2, pacDays: 7, sedexDays: 3, miniDays: 8 };
  }
  if (['MA', 'PI', 'BA', 'CE', 'PE', 'RN', 'PB', 'AL', 'SE'].includes(ufUpper)) {
    return { miniPrice: 24.9, pacPrice: 56.9 + weightFactor, sedexPrice: 92.5 + weightFactor * 2.2, pacDays: 8, sedexDays: 3, miniDays: 8 };
  }
  return { miniPrice: 26.9, pacPrice: 64.9 + weightFactor, sedexPrice: 104.9 + weightFactor * 2.5, pacDays: 8, sedexDays: 3, miniDays: 9 };
}

function getPalmasAppDeliveryRate(cepNumber: number): { price: number; zoneName: string; estTime: string } {
  if (cepNumber >= 77015000 && cepNumber <= 77020999) {
    return { price: 10.0, zoneName: 'Plano Diretor Sul (100/200 Sul)', estTime: 'Entrega em até 1h' };
  }
  if (cepNumber >= 77021000 && cepNumber <= 77029999) {
    return { price: 14.0, zoneName: 'Plano Diretor Sul (300 a 500 Sul)', estTime: 'Entrega em até 1h a 2h' };
  }
  if (cepNumber >= 77001000 && cepNumber <= 77009999) {
    return { price: 16.0, zoneName: 'Plano Diretor Norte (100 a 400 Norte)', estTime: 'Entrega em até 2h' };
  }
  if (cepNumber >= 77050000 && cepNumber <= 77059999) {
    return { price: 22.0, zoneName: 'Região dos Aurenys / Bertaville', estTime: 'Entrega em até 2h a 3h' };
  }
  if (cepNumber >= 77060000 && cepNumber <= 77069999) {
    return { price: 28.0, zoneName: 'Taquaralto / Jardim Taquari', estTime: 'Entrega em até 3h' };
  }
  if (cepNumber >= 77070000 && cepNumber <= 77099999) {
    return { price: 35.0, zoneName: 'Distrito de Taquaruçu / Luzimangues', estTime: 'Entrega no mesmo dia' };
  }
  return { price: 15.0, zoneName: 'Palmas-TO', estTime: 'Entrega em até 2h' };
}

/**
 * Monta opções de frete combinando cotações ao vivo + entrega local Palmas
 */
export function calculateShippingOptions(
  uf: string,
  city: string,
  totalWeightGram: number,
  subtotal: number,
  rawCep?: string,
  liveCorreios?: LiveCorreiosRates | null,
  melhorEnvioOptions?: ShippingOption[] | null
): ShippingOption[] {
  const isPalmasRegion = uf.toUpperCase() === 'TO' || city.toLowerCase().includes('palmas');
  const cleanCepNumber = rawCep ? parseInt(rawCep.replace(/\D/g, ''), 10) : 0;

  let options: ShippingOption[] = [];

  // Prioridade 1: Melhor Envio (cotação real multi-transportadora)
  if (melhorEnvioOptions && melhorEnvioOptions.length > 0) {
    options = [...melhorEnvioOptions];
  } else {
    // Prioridade 2: Correios ao vivo ou fallback estimado
    const fallback = getCorreiosFallbackRates(uf, totalWeightGram);
    const hasLiveRates = !!(liveCorreios?.pacPrice || liveCorreios?.sedexPrice || liveCorreios?.miniPrice);

    const miniPrice = liveCorreios?.miniPrice ?? fallback.miniPrice;
    const pacPrice = liveCorreios?.pacPrice ?? fallback.pacPrice;
    const sedexPrice = liveCorreios?.sedexPrice ?? fallback.sedexPrice;
    const miniDays = liveCorreios?.miniDays ?? fallback.miniDays;
    const pacDays = liveCorreios?.pacDays ?? fallback.pacDays;
    const sedexDays = liveCorreios?.sedexDays ?? fallback.sedexDays;

    options = [
      {
        code: 'MINI_ENVIOS',
        name: 'Correios Mini Envios',
        description: hasLiveRates && liveCorreios?.miniPrice
          ? 'Cotação em tempo real dos Correios'
          : 'Valor estimado — tabela de referência Correios',
        price: Math.round(miniPrice * 100) / 100,
        deliveryDays: miniDays,
        carrierLogo: '📦',
        isLiveQuote: !!(hasLiveRates && liveCorreios?.miniPrice),
      },
      {
        code: 'PAC',
        name: 'Correios PAC',
        description: hasLiveRates && liveCorreios?.pacPrice
          ? 'Cotação em tempo real dos Correios'
          : 'Valor estimado — tabela de referência Correios',
        price: Math.round(pacPrice * 100) / 100,
        deliveryDays: pacDays,
        carrierLogo: '🟡',
        isLiveQuote: !!(hasLiveRates && liveCorreios?.pacPrice),
      },
      {
        code: 'SEDEX',
        name: 'Correios SEDEX',
        description: hasLiveRates && liveCorreios?.sedexPrice
          ? 'Cotação em tempo real dos Correios'
          : 'Valor estimado — tabela de referência Correios',
        price: Math.round(sedexPrice * 100) / 100,
        deliveryDays: sedexDays,
        carrierLogo: '🚀',
        isLiveQuote: !!(hasLiveRates && liveCorreios?.sedexPrice),
      },
    ];
  }

  // Entrega local em Palmas-TO
  if (isPalmasRegion) {
    const palmasApp = getPalmasAppDeliveryRate(cleanCepNumber);

    options.unshift({
      code: 'MOTOBOY_LOCAL',
      name: `Uber Flash / Motoboy (${palmasApp.zoneName})`,
      description: `Entrega rápida em Palmas • ${palmasApp.estTime}`,
      price: palmasApp.price,
      deliveryDays: 0,
      carrierLogo: '🛵',
      isLocalPickup: true,
      isLiveQuote: true,
    });

    options.unshift({
      code: 'RETIRO_SHOWROOM',
      name: 'Retirada Grátis no Showroom (204 Sul, Palmas-TO)',
      description: 'Retire sem taxa no mesmo dia no Showroom no Plano Diretor Sul',
      price: 0,
      deliveryDays: 0,
      carrierLogo: '✨',
      isLocalPickup: true,
      isLiveQuote: true,
    });
  }

  return options;
}
