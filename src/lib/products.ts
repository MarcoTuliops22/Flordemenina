import { Product } from './types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // BRINCOS
  // ==========================================
  {
    id: 'prod-1',
    slug: 'brinco-argola-zirconia-gloria',
    title: 'Brinco Argola Zircônia Glória',
    category: 'Brincos',
    description: 'Argola delicada cravejada com zircônias de altíssimo brilho. Desenvolvida com tecnologia alemã antialérgica (livre de níquel) e tripla camada de verniz de proteção.',
    details: [
      'Banhos disponíveis: Ouro 18k (10 milésimos) ou Prata 925 (50 milésimos)',
      'Tecnologia Antialérgica: 100% livre de Níquel',
      'Cravação manual em Zircônia Premium AAA',
      'Fecho com trava de segurança de alta precisão',
      'Garantia: 1 ano no banho e cravação'
    ],
    warranty: '1 Ano de Garantia com Certificado',
    antiAllergic: true,
    weightGram: 18,
    dimensionsCm: { length: 8, width: 8, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-1a',
        name: 'Ouro 18k - P (14mm)',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: '14mm (P)',
        price: 189.90,
        promotionalPrice: 159.90,
        stock: 12
      },
      {
        id: 'var-1b',
        name: 'Ouro 18k - M (18mm)',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: '18mm (M)',
        price: 219.90,
        promotionalPrice: 189.90,
        stock: 8
      },
      {
        id: 'var-1c',
        name: 'Prata 925 - M (18mm)',
        plating: 'PRATA_925',
        platingLabel: 'Prata 925',
        size: '18mm (M)',
        price: 179.90,
        stock: 15
      }
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 48
  },
  {
    id: 'prod-1b',
    slug: 'brinco-gota-esmeralda-luxo',
    title: 'Brinco Gota Zircônia Esmeralda Fusion',
    category: 'Brincos',
    description: 'Brinco elegante em formato de gota com pedra zircônia fusion na tonalidade esmeralda colombiana, caixa cravejada com micro-zircônias.',
    details: [
      'Zircônia tom esmeralda fusion 10x14mm',
      'Banho Ouro 18k com acabamento espelhado de 10 milésimos',
      'Tarraxas sutiã de orelha para sustentação anatômica perfeita'
    ],
    warranty: '1 Ano de Garantia com Certificado',
    antiAllergic: true,
    weightGram: 16,
    dimensionsCm: { length: 8, width: 8, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-1ba',
        name: 'Ouro 18k - Esmeralda',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 199.90,
        promotionalPrice: 169.90,
        stock: 7
      },
      {
        id: 'var-1bb',
        name: 'Ródio Branco - Cristais',
        plating: 'RODIO_BRANCO',
        platingLabel: 'Ródio Branco',
        price: 189.90,
        stock: 9
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 34
  },
  {
    id: 'prod-1c',
    slug: 'brinco-ear-cuff-ramos-zirconias',
    title: 'Brinco Ear Cuff Ramos de Zircônia',
    category: 'Brincos',
    description: 'Ear cuff moderno que sobe pela curvatura da orelha simulando folhagens reluzentes. Não necessita de segundo furo.',
    details: [
      'Design anatômico com pino e grampo de fixação traseira',
      'Cravejado com 14 zircônias em lapidação marquesa',
      'Banho de Ouro 18k ou Ródio Branco'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 14,
    dimensionsCm: { length: 6, width: 6, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-1ca',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 159.90,
        promotionalPrice: 139.90,
        stock: 11
      },
      {
        id: 'var-1cb',
        name: 'Ródio Branco',
        plating: 'RODIO_BRANCO',
        platingLabel: 'Ródio Branco',
        price: 149.90,
        stock: 6
      }
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 27
  },
  {
    id: 'prod-1d',
    slug: 'brinco-argolinha-coracao-cravejado',
    title: 'Brinco Argolinha Coração Cravejado',
    category: 'Brincos',
    description: 'Argolinha fechamento click com pingente removível em formato de coração delicadamente cravejado.',
    details: [
      'Diâmetro interno de 10mm',
      'Pingente 2 em 1: pode ser usado com ou sem o coração',
      'Triplo banho de Prata 925 com acabamento brilhante'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 12,
    dimensionsCm: { length: 6, width: 6, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-1da',
        name: 'Prata 925',
        plating: 'PRATA_925',
        platingLabel: 'Prata 925',
        price: 129.90,
        promotionalPrice: 99.90,
        stock: 18
      },
      {
        id: 'var-1db',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 139.90,
        stock: 14
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 39
  },

  // ==========================================
  // COLARES
  // ==========================================
  {
    id: 'prod-2',
    slug: 'colar-gargantilha-ponto-de-luz-aurora',
    title: 'Colar Ponto de Luz Aurora',
    category: 'Colares',
    description: 'Colar atemporal com pingente zircônia gota lapidada. A peça perfeita para compor mix elegantes no dia a dia ou eventos sofisticados.',
    details: [
      'Corrente veneziana de 45cm + 5cm de extensor regulável',
      'Pingente Zircônia Gota 8x10mm com acabamento impecável',
      'Camada dupla de verniz catalítico antialérgico',
      'Garantia de 1 ano contra desbotamento do banho'
    ],
    warranty: '1 Ano de Garantia com Certificado',
    antiAllergic: true,
    weightGram: 22,
    dimensionsCm: { length: 10, width: 10, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-2a',
        name: 'Ouro 18k - 45cm',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: '45cm + Extensor',
        price: 249.90,
        promotionalPrice: 219.90,
        stock: 10
      },
      {
        id: 'var-2b',
        name: 'Prata 925 - 45cm',
        plating: 'PRATA_925',
        platingLabel: 'Prata 925',
        size: '45cm + Extensor',
        price: 199.90,
        stock: 14
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 62
  },
  {
    id: 'prod-2b',
    slug: 'choker-elos-portugueses-ouro',
    title: 'Choker Elos Portugueses & Coração',
    category: 'Colares',
    description: 'Colar estilo Choker com corrente de elos portugueses encorpados e pingente de coração central com micro-zircônias.',
    details: [
      'Comprimento 40cm + 5cm extensor',
      'Banho extra de Ouro 18k 10 milésimos',
      'Fecho boia reforçado'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 28,
    dimensionsCm: { length: 10, width: 10, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-2ba',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 279.90,
        promotionalPrice: 239.90,
        stock: 8
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 21
  },
  {
    id: 'prod-2c',
    slug: 'colar-gravatinha-zirconia-gota',
    title: 'Colar Gravatinha Zircônia Gota Regulável',
    category: 'Colares',
    description: 'Colar estilo gravatinha com elo ajustável de altura e gota reluzente pendente na ponta.',
    details: [
      'Corrente 60cm com bola de silicone ajustável no peito',
      'Zircônia gota 7x10mm na ponta',
      'Ideal para decotes profundos ou composições duplas'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 20,
    dimensionsCm: { length: 10, width: 8, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-2ca',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 229.90,
        promotionalPrice: 189.90,
        stock: 9
      },
      {
        id: 'var-2cb',
        name: 'Ródio Branco',
        plating: 'RODIO_BRANCO',
        platingLabel: 'Ródio Branco',
        price: 219.90,
        stock: 5
      }
    ],
    featured: false,
    rating: 5.0,
    reviewsCount: 19
  },
  {
    id: 'prod-2d',
    slug: 'colar-duplo-trevo-madreperola',
    title: 'Colar Duplo Trevo Madrepérola & Zircônia',
    category: 'Colares',
    description: 'Colar com dupla corrente e pingentes de trevo inspirados na alta joalheria francesa, com madrepérola natural prensada.',
    details: [
      'Duas correntes integradas: 40cm e 45cm',
      'Trevo em madrepérola legítima com borda trabalhada',
      'Banho Ouro 18k com brilho de acabamento nobre'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 26,
    dimensionsCm: { length: 12, width: 10, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-2da',
        name: 'Ouro 18k - Madrepérola',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 289.90,
        promotionalPrice: 249.90,
        stock: 6
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 41
  },

  // ==========================================
  // ANÉIS
  // ==========================================
  {
    id: 'prod-3',
    slug: 'anel-solitario-classic-elegance',
    title: 'Anel Solitário Classic Elegance',
    category: 'Anéis',
    description: 'Símbolo supremo de sofisticação. Anel com zircônia central sustentada por 4 garras reforçadas e micro-zircônias no aro.',
    details: [
      'Banho em Ouro 18k com selo de espessura de 12 milésimos',
      'Cravação microscópica de precisão',
      'Design ergonômico e confortável (anatomia interna arredondada)'
    ],
    warranty: '1 Ano de Garantia com Certificado',
    antiAllergic: true,
    weightGram: 15,
    dimensionsCm: { length: 6, width: 6, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-3a',
        name: 'Ouro 18k - Tam 16',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: 'Aro 16',
        price: 169.90,
        stock: 5
      },
      {
        id: 'var-3b',
        name: 'Ouro 18k - Tam 18',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: 'Aro 18',
        price: 169.90,
        stock: 9
      },
      {
        id: 'var-3c',
        name: 'Prata 925 - Tam 16',
        plating: 'PRATA_925',
        platingLabel: 'Prata 925',
        size: 'Aro 16',
        price: 149.90,
        stock: 11
      }
    ],
    featured: true,
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'prod-3b',
    slug: 'anel-aparador-cravejado-duplo',
    title: 'Anel Aparador Cravejado Duplo',
    category: 'Anéis',
    description: 'Anel meia aliança com duas fileiras paralelas de micro-zircônias cravejadas. Perfeito para usar junto à aliança ou anel solitário.',
    details: [
      'Duas fileiras com 32 zircônias lapidadas',
      'Banho Ouro 18k 10 milésimos',
      'Formato anatômico para encaixe perfeito'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 14,
    dimensionsCm: { length: 6, width: 6, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-3ba',
        name: 'Ouro 18k - Tam 16',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: 'Aro 16',
        price: 159.90,
        promotionalPrice: 129.90,
        stock: 7
      },
      {
        id: 'var-3bb',
        name: 'Ouro 18k - Tam 20',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: 'Aro 20',
        price: 159.90,
        promotionalPrice: 129.90,
        stock: 6
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 23
  },
  {
    id: 'prod-3c',
    slug: 'anel-regulavel-organico-dourado',
    title: 'Anel Regulável Design Orgânico Fluido',
    category: 'Anéis',
    description: 'Anel ajustável com curvas orgânicas inspiradas na arquitetura contemporânea. Adapta-se confortavelmente a qualquer dedo do aro 14 ao 22.',
    details: [
      'Aro aberto ajustável com flexibilidade controlada',
      'Superfície polida com brilho alto vácuo',
      'Banho em Ouro 18k'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 16,
    dimensionsCm: { length: 6, width: 6, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-3ca',
        name: 'Ouro 18k - Ajustável',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: 'Tamanho Único Regulável',
        price: 149.90,
        promotionalPrice: 119.90,
        stock: 15
      }
    ],
    featured: false,
    rating: 4.7,
    reviewsCount: 16
  },

  // ==========================================
  // PULSEIRAS
  // ==========================================
  {
    id: 'prod-4',
    slug: 'pulseira-riviera-zirconias-luxo',
    title: 'Pulseira Riviera Zircônias Luxo',
    category: 'Pulseiras',
    description: 'A clássica pulseira Riviera que nunca sai de moda. Fileira ininterrupta de brilho intenso com fecho duplo gaveta.',
    details: [
      'Comprimento 17cm + 3cm extensor',
      'Zircônias quadradas 2mm com cravação contínua',
      'Fecho duplo tipo jóia para máxima segurança no pulso',
      'Livre de chumbo e níquel'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 25,
    dimensionsCm: { length: 12, width: 8, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-4a',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        size: '17cm a 20cm',
        price: 299.90,
        promotionalPrice: 269.90,
        stock: 8
      },
      {
        id: 'var-4b',
        name: 'Ródio Branco',
        plating: 'RODIO_BRANCO',
        platingLabel: 'Ródio Branco',
        size: '17cm a 20cm',
        price: 279.90,
        stock: 5
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 29
  },
  {
    id: 'prod-4b',
    slug: 'pulseira-elo-portugues-pingentes',
    title: 'Pulseira Elo Português & Charms',
    category: 'Pulseiras',
    description: 'Pulseira charmosa banhada a Ouro 18k com medalhas e cristais que balançam com o movimento do pulso.',
    details: [
      'Comprimento regulável de 16cm a 21cm',
      'Pingentes de zircônia e medalhinha abençoada',
      'Acabamento com verniz de proteção de alta durabilidade'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 20,
    dimensionsCm: { length: 10, width: 8, height: 3 },
    images: [
      'https://images.unsplash.com/photo-1611591475777-233cd73be3df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-4ba',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 229.90,
        promotionalPrice: 199.90,
        stock: 10
      }
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: 'prod-4c',
    slug: 'pulseira-bracelete-algema-oval-zirconias',
    title: 'Bracelete Algema Oval Zircônias',
    category: 'Pulseiras',
    description: 'Bracelete rígido articulado estilo algema com fecho lateral invisível e fileira de zircônias na parte frontal.',
    details: [
      'Abertura lateral por trava com mola de pressão',
      'Formato anatômico oval de 6cm x 5cm',
      'Banho espessura alta de Ouro 18k 12 milésimos'
    ],
    warranty: '1 Ano de Garantia com Certificado',
    antiAllergic: true,
    weightGram: 32,
    dimensionsCm: { length: 10, width: 10, height: 4 },
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-4ca',
        name: 'Ouro 18k',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 349.90,
        promotionalPrice: 299.90,
        stock: 6
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 38
  },

  // ==========================================
  // CONJUNTOS
  // ==========================================
  {
    id: 'prod-5',
    slug: 'conjunto-gargantilha-brincos-gota-safira',
    title: 'Conjunto Colar & Brincos Gota Safira',
    category: 'Conjuntos',
    description: 'Conjunto completo composto por colar e par de brincos combinando com pedras gota tom azul safira fusion.',
    details: [
      'Colar de 45cm + 5cm extensor com pingente gota',
      'Par de brincos gota de 12mm',
      'Caixinha de presente rígida e luxuosa inclusa'
    ],
    warranty: '1 Ano de Garantia no Banho',
    antiAllergic: true,
    weightGram: 38,
    dimensionsCm: { length: 14, width: 12, height: 5 },
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    variations: [
      {
        id: 'var-5a',
        name: 'Ouro 18k - Azul Safira',
        plating: 'OURO_18K',
        platingLabel: 'Ouro 18k',
        price: 389.90,
        promotionalPrice: 329.90,
        stock: 5
      },
      {
        id: 'var-5b',
        name: 'Ródio Branco - Cristais',
        plating: 'RODIO_BRANCO',
        platingLabel: 'Ródio Branco',
        price: 369.90,
        stock: 4
      }
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 52
  }
];

export const FREE_SHIPPING_THRESHOLD = 250.00; // R$ 250,00 para frete grátis
