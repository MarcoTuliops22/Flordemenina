-- =====================================================================
-- FLOR DE MENINA SEMIJOIAS (@flordemenina__to)
-- SCHEMA & SEED PARA O SUPABASE
-- =====================================================================

-- 1. CRIAÇÃO DA TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS public.produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    subtitulo TEXT,
    categoria TEXT NOT NULL, -- 'solitarios', 'organicos', 'couture', 'rodio'
    descricao TEXT,
    specs TEXT[] DEFAULT '{}',
    preco NUMERIC(10, 2) NOT NULL,
    parcelas TEXT,
    imagem_url TEXT NOT NULL,
    badge TEXT,
    badge_classe TEXT DEFAULT '', -- '', 'accent-blue', 'accent-red', 'accent-green', 'accent-gold'
    disponivel BOOLEAN DEFAULT TRUE,
    ordem INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICA DE LEITURA PÚBLICA (Qualquer visitante do catálogo pode visualizar)
DROP POLICY IF EXISTS "Permitir leitura publica dos produtos" ON public.produtos;
CREATE POLICY "Permitir leitura publica dos produtos"
ON public.produtos FOR SELECT
USING (true);

-- 4. POLÍTICA DE GESTÃO PARA USUÁRIOS AUTENTICADOS (Adicionar, atualizar, excluir)
DROP POLICY IF EXISTS "Permitir modificacoes apenas autenticados" ON public.produtos;
CREATE POLICY "Permitir modificacoes apenas autenticados"
ON public.produtos FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. CRIAÇÃO DO BUCKET DE IMAGENS NO STORAGE (Opcional caso queira hospedar fotos no Supabase)
INSERT INTO storage.buckets (id, name, public)
VALUES ('catalogo', 'catalogo', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Imagens de acesso publico" ON storage.objects;
CREATE POLICY "Imagens de acesso publico"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalogo');

-- 6. INSERÇÃO DOS 13 PRODUTOS DO CATÁLOGO (SEED COM PREÇOS ATUALIZADOS)
INSERT INTO public.produtos (ref, nome, subtitulo, categoria, descricao, specs, preco, parcelas, imagem_url, badge, badge_classe, ordem)
VALUES
(
    'FM-2041',
    'Conjunto Aura Gota Champagne',
    'Colar Veneziana + Brincos com Cristal Abaulado',
    'organicos',
    'Design abaulado e orgânico contemporâneo. O pingente em formato de gota encapsula um cristal champagne facetado em moldura espelhada dourada. Puro luxo e presença.',
    ARRAY['Banho Ouro 18k', 'Cristal Champagne', 'Níquel-Free'],
    140.00,
    'ou até 3x de R$ 46,66 sem juros',
    'images/conjunto-gota-champagne.jpg',
    'Best Seller',
    '',
    1
),
(
    'FM-2042-AZ',
    'Conjunto Solitário Safira Imperial',
    'Colar Veneziana + Brincos Solitários 4 Garras',
    'solitarios',
    'O clássico mais desejado. Zircônia nobre com a intensidade do Azul Safira lapidada em brilhante, fixada por 4 garras delicadas que valorizam a passagem da luz e o brilho intenso.',
    ARRAY['Banho Ouro 18k', 'Zircônia Safira', 'Corrente Veneziana'],
    120.00,
    'ou até 3x de R$ 40,00 sem juros',
    'images/conjunto-solitario-safira.jpg',
    'Alta Joalheria',
    'accent-blue',
    2
),
(
    'FM-2043-VM',
    'Conjunto Solitário Rubi Passion',
    'Colar Veneziana + Brincos Solitários 4 Garras',
    'solitarios',
    'Uma explosão de feminilidade e elegância audaciosa. O tom vermelho rubi profundo magnetiza os olhares e adiciona calor e poder tanto para composições casuais quanto formais.',
    ARRAY['Banho Ouro 18k', 'Zircônia Rubi Vivid', 'Hipoalergênico'],
    120.00,
    'ou até 3x de R$ 40,00 sem juros',
    'images/conjunto-solitario-rubi.jpg',
    'Destaque Nobre',
    'accent-red',
    3
),
(
    'FM-2044-VD',
    'Conjunto Solitário Esmeralda Sublime',
    'Colar Veneziana + Brincos Solitários 4 Garras',
    'solitarios',
    'O tom verde esmeralda colombiano é o ápice da sofisticação atemporal. O contraste perfeito entre o ouro 18k aquecido e o brilho verde profundo faz deste conjunto um coringa refinado.',
    ARRAY['Banho Ouro 18k', 'Zircônia Esmeralda', 'Hipoalergênico'],
    120.00,
    'ou até 3x de R$ 40,00 sem juros',
    'images/conjunto-solitario-esmeralda.jpg',
    'Tendência Realeza',
    'accent-green',
    4
),
(
    'FM-2045-BB',
    'Conjunto Borboleta Metamorfose',
    'Gargantilha com Pingente Escultural + Brincos Asas',
    'couture',
    'Uma verdadeira escultura em forma de semijoia. Asas com texturização acetinada em relevo e bordas polidas em alto brilho. Simboliza leveza, renovação e a feminilidade graciosa da Flor de Menina.',
    ARRAY['Efeito Acetinado & Polido', 'Acabamento Escultural', 'Hipoalergênico'],
    198.00,
    'ou até 3x de R$ 66,00 sem juros',
    'images/conjunto-borboleta-couture.jpg',
    'Design Autoral',
    'accent-gold',
    5
),
(
    'FM-2046-BK',
    'Conjunto Ébano Imperial',
    'Gargantilha com Trio Abaulado + Brincos com Pavê Negro',
    'organicos',
    'O ápice da sofisticação contemporânea. Formas orgânicas abauladas com polimento espelhado contrastadas por uma cápsula central inteiramente cravejada com microzircônias negras estilo pavê. Audacioso, magnético e refinado.',
    ARRAY['Banho Ouro 18k', 'Micro Pavê Black Spinel', 'Hipoalergênico'],
    295.00,
    'ou até 3x de R$ 98,33 sem juros',
    'images/conjunto-pave-black-gold.jpg',
    'Alta Joalheria Italiana',
    'accent-gold',
    6
),
(
    'FM-2047-LC',
    'Conjunto Laço Sublime',
    'Gargantilha com Laço Curvilíneo + Brincos Laço Delicado',
    'couture',
    'Uma ode à feminilidade e ao romantismo contemporâneo. A corrente abraça uma elegante curvatura cravejada que culmina em um laço tridimensional cravejado em microzircônias cristais. Brincos delicados e cheios de graça.',
    ARRAY['Banho Ouro 18k', 'Zircônias Cristais Pavê', 'Design Exclusivo'],
    125.00,
    'ou até 3x de R$ 41,67 sem juros',
    'images/conjunto-laco-romance.jpg',
    'Romance & Delicadeza',
    '',
    7
),
(
    'FM-2048-RB',
    'Conjunto Nó Infinito Ródio',
    'Colar Veneziana + Brincos Nó Trançado Cravejado',
    'rodio',
    'O brilho cintilante do ródio branco em um entrelaço contínuo e geométrico vazado. Simboliza a união eterna e a beleza sem fim. Cravejado com dezenas de zircônias de lapidação brilhante com efeito alta joalheria.',
    ARRAY['Banho Ródio Branco', 'Micro Pavê Diamantado', 'Hipoalergênico'],
    108.00,
    'ou até 3x de R$ 36,00 sem juros',
    'images/conjunto-no-infinito-rodio.jpg',
    'Linha Ródio Nobre',
    'accent-blue',
    8
),
(
    'FM-2049-CR',
    'Conjunto Cushion Royale',
    'Colar com Pingente Almofada + Brincos Cushion Cravejados',
    'organicos',
    'Inspirado nos tesouros da joalheria imperial. A clássica lapidação cushion (almofada) traz um tapete brilhante de micro pavê envolvido por uma requintada moldura de esferas douradas em ouro 18k. Visual opulento e imponente.',
    ARRAY['Banho Ouro 18k', 'Manta de Micro Pavê', 'Borda Milgrain Dourada'],
    318.00,
    'ou até 3x de R$ 106,00 sem juros',
    'images/conjunto-cushion-royale.jpg',
    'Inspiração Realeza',
    'accent-gold',
    9
),
(
    'FM-2050-CL',
    'Conjunto Cilindro Pavê Diamond',
    'Colar com Pingente Barril 360° + Brincos Meia Argola',
    'rodio',
    'A arquitetura do luxo italiano. Pingente em formato de cilindro rendado cravejado em 360° que desliza livremente pela corrente veneziana, acompanhado de brincos meia-argola com cravação pavê de luz radiante.',
    ARRAY['Banho Ródio Branco', 'Cravação Pavê 360°', 'Hipoalergênico'],
    108.00,
    'ou até 3x de R$ 36,00 sem juros',
    'images/conjunto-barril-rodio-diamante.jpg',
    'Linha Ródio Nobre',
    'accent-blue',
    10
),
(
    'FM-2051-CV',
    'Conjunto Coração Vazado Amore',
    'Colar Veneziana + Brincos Coração Vazado Cravejado',
    'couture',
    'A elegância do afeto em linhas limpas e luminosas. O coração vazado traz uma silhueta anatômica enriquecida por uma densa borda cravejada com microzircônias cristais. Leve, gracioso e perfeito para o dia a dia e encontros românticos.',
    ARRAY['Banho Ouro 18k', 'Micro Pavê de Zircônias', 'Hipoalergênico'],
    169.00,
    'ou até 3x de R$ 56,33 sem juros',
    'images/conjunto-coracao-vazado-pave.jpg',
    'Romance Atemporal',
    '',
    11
),
(
    'FM-2052-TG',
    'Conjunto Tríade Geométrica',
    'Gargantilha Malha Fina + Brincos Triangulares Pavê',
    'organicos',
    'Pura vanguarda e requinte escultural. A malha flexível desliza no colo trazendo um trio de prismas abaulados (ouro polido, pavê cintilante e rosé espelhado), acompanhado de brincos volumosos inteiramente cravejados de zircônias.',
    ARRAY['Efeito Tricolor Nobre', 'Malha Maleável Luxo', 'Hipoalergênico'],
    258.00,
    'ou até 3x de R$ 86,00 sem juros',
    'images/conjunto-triade-geometrica.jpg',
    'Design Contemporâneo',
    'accent-gold',
    12
),
(
    'FM-2053-CP',
    'Conjunto Coração Imperial',
    'Colar com Coração Abaulado + Brincos Puff Heart',
    'couture',
    'O coração em sua forma mais opulenta e adorável (puff heart). Recoberto por um manto contínuo de microzircônias pavê de brilho estelar, abraçado por uma sofisticada moldura de esferas de ouro 18k peroladas milgrain.',
    ARRAY['Banho Ouro 18k', 'Puff Heart Abaulado', 'Borda Perolada Milgrain'],
    298.00,
    'ou até 3x de R$ 99,33 sem juros',
    'images/conjunto-coracao-cushion-perolado.jpg',
    'Alta Joalheria Afetiva',
    'accent-gold',
    13
)
ON CONFLICT (ref) DO UPDATE SET
    nome = EXCLUDED.nome,
    subtitulo = EXCLUDED.subtitulo,
    categoria = EXCLUDED.categoria,
    descricao = EXCLUDED.descricao,
    specs = EXCLUDED.specs,
    preco = EXCLUDED.preco,
    parcelas = EXCLUDED.parcelas,
    imagem_url = EXCLUDED.imagem_url,
    badge = EXCLUDED.badge,
    badge_classe = EXCLUDED.badge_classe,
    ordem = EXCLUDED.ordem;
