/* =====================================================================
   FLOR DE MENINA SEMIJOIAS - CATALOG LOGIC & SUPABASE INTEGRATION
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupFilters();
  
  // Se o Supabase estiver configurado em supabase-config.js, carrega produtos dinâmicos
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    carregarProdutosSupabase();
  }
});

// Configuração de Filtros de Categoria
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      const productCards = document.querySelectorAll('.product-card');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        if (filter === 'todos' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Dicionário de Produtos para o Modal de Zoom (Fallback local e dinâmico)
const productsData = {
  'modal-gota': {
    title: 'Conjunto Aura Gota Champagne',
    ref: 'REF: FM-2041 | Banho Ouro 18k | R$ 140,00',
    img: 'images/conjunto-gota-champagne.jpg'
  },
  'modal-safira': {
    title: 'Conjunto Solitário Safira Imperial',
    ref: 'REF: FM-2042-AZ | Banho Ouro 18k | R$ 120,00',
    img: 'images/conjunto-solitario-safira.jpg'
  },
  'modal-rubi': {
    title: 'Conjunto Solitário Rubi Passion',
    ref: 'REF: FM-2043-VM | Banho Ouro 18k | R$ 120,00',
    img: 'images/conjunto-solitario-rubi.jpg'
  },
  'modal-esmeralda': {
    title: 'Conjunto Solitário Esmeralda Sublime',
    ref: 'REF: FM-2044-VD | Banho Ouro 18k | R$ 120,00',
    img: 'images/conjunto-solitario-esmeralda.jpg'
  },
  'modal-borboleta': {
    title: 'Conjunto Borboleta Metamorfose',
    ref: 'REF: FM-2045-BB | Acabamento Couture | R$ 198,00',
    img: 'images/conjunto-borboleta-couture.jpg'
  },
  'modal-pave-black': {
    title: 'Conjunto Ébano Imperial Pavê Negro',
    ref: 'REF: FM-2046-BK | Banho Ouro 18k | R$ 295,00',
    img: 'images/conjunto-pave-black-gold.jpg'
  },
  'modal-laco': {
    title: 'Conjunto Laço Sublime Cravejado',
    ref: 'REF: FM-2047-LC | Banho Ouro 18k | R$ 125,00',
    img: 'images/conjunto-laco-romance.jpg'
  },
  'modal-no-infinito': {
    title: 'Conjunto Nó Infinito em Ródio Branco',
    ref: 'REF: FM-2048-RB | Banho Ródio Branco | R$ 108,00',
    img: 'images/conjunto-no-infinito-rodio.jpg'
  },
  'modal-cushion': {
    title: 'Conjunto Cushion Royale Almofada Pavê',
    ref: 'REF: FM-2049-CR | Banho Ouro 18k | R$ 318,00',
    img: 'images/conjunto-cushion-royale.jpg'
  },
  'modal-barril': {
    title: 'Conjunto Cilindro Pavê Diamond',
    ref: 'REF: FM-2050-CL | Banho Ródio Branco | R$ 108,00',
    img: 'images/conjunto-barril-rodio-diamante.jpg'
  },
  'modal-coracao-vazado': {
    title: 'Conjunto Coração Vazado Amore',
    ref: 'REF: FM-2051-CV | Banho Ouro 18k | R$ 169,00',
    img: 'images/conjunto-coracao-vazado-pave.jpg'
  },
  'modal-triade': {
    title: 'Conjunto Tríade Geométrica Tricolor',
    ref: 'REF: FM-2052-TG | Ouro 18k & Rosé | R$ 258,00',
    img: 'images/conjunto-triade-geometrica.jpg'
  },
  'modal-coracao-cushion': {
    title: 'Conjunto Coração Imperial Perolado',
    ref: 'REF: FM-2053-CP | Banho Ouro 18k | R$ 298,00',
    img: 'images/conjunto-coracao-cushion-perolado.jpg'
  },
  'modal-quadrado-negro': {
    title: 'Conjunto Noir Cushion Dourado',
    ref: 'REF: FM-2054-ON | Banho Ouro 18k | R$ 168,00',
    img: 'images/conjunto-quadrado-pave-negro.jpg'
  },
  'modal-circulo-solar': {
    title: 'Conjunto Mandala Sol Radiante',
    ref: 'REF: FM-2055-SL | Banho Ouro 18k | R$ 158,00',
    img: 'images/conjunto-circulo-pave-radiante.jpg'
  },
  'modal-octogonal-london': {
    title: 'Conjunto Octogonal London Blue Art Déco',
    ref: 'REF: FM-2056-LB | Banho Ródio Branco | R$ 189,00',
    img: 'images/conjunto-octogonal-london-blue.jpg'
  },
  'modal-solitario-topazio': {
    title: 'Conjunto Solitário Topázio Swiss',
    ref: 'REF: FM-2057-TB | Banho Ródio Branco | R$ 138,00',
    img: 'images/conjunto-solitario-topazio-swiss.jpg'
  }
};

// Funções do Modal de Zoom
function openModal(productId) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalRef = document.getElementById('modal-ref');

  const data = productsData[productId];
  if (data) {
    modalImg.src = data.img;
    modalTitle.textContent = data.title;
    modalRef.textContent = data.ref;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Expõe para o escopo global (compatibilidade com onclick nos cards HTML e módulos)
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Integração com Supabase (Carregamento Dinâmico)
async function carregarProdutosSupabase() {
  const grid = document.querySelector('.products-grid');
  if (!grid || !supabaseClient) return;

  try {
    const { data: produtos, error } = await supabaseClient
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .order('ordem', { ascending: true });

    if (error) {
      console.warn('Supabase: Erro na busca, usando produtos estáticos.', error.message);
      return;
    }

    if (produtos && produtos.length > 0) {
      renderizarProdutosSupabase(produtos);
    }
  } catch (err) {
    console.warn('Supabase: Conexão indisponível, usando fallback local.', err);
  }
}

// Renderizador Dinâmico dos Cards do Supabase
function renderizarProdutosSupabase(produtos) {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  grid.innerHTML = ''; // Limpa cards estáticos

  produtos.forEach(prod => {
    const modalKey = 'modal-' + prod.ref.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Atualiza o dicionário de modal dinamicamente
    productsData[modalKey] = {
      title: prod.nome,
      ref: `REF: ${prod.ref} | R$ ${Number(prod.preco).toFixed(2).replace('.', ',')}`,
      img: prod.imagem_url
    };

    // Prepara specs HTML
    const specsHtml = (prod.specs || [])
      .map(s => `<span class="spec-pill"><i class="fa-solid fa-check"></i> ${s}</span>`)
      .join('');

    // Preço e parcelas
    const precoFormatado = Number(prod.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const parcelasTexto = prod.parcelas || `ou até 3x de ${(prod.preco / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros`;

    // Mensagem de WhatsApp
    const zapMsg = encodeURIComponent(`Olá! Gostaria de pedir o *${prod.nome}* (REF: ${prod.ref}) do catálogo Flor de Menina.`);
    const zapNumber = (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.whatsappNumber) ? SUPABASE_CONFIG.whatsappNumber : '5563999111818';

    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-category', prod.categoria);

    card.innerHTML = `
      ${prod.badge ? `<div class="product-badge ${prod.badge_classe || ''}">${prod.badge}</div>` : ''}
      <div class="product-media" onclick="openModal('${modalKey}')">
        <img src="${prod.imagem_url}" alt="${prod.nome}" loading="lazy">
        <div class="media-overlay">
          <span class="view-details-tag"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver Detalhes</span>
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta-top">
          <span class="product-ref">REF: ${prod.ref}</span>
          <span class="product-stock in-stock"><i class="fa-solid fa-circle"></i> Disponível</span>
        </div>
        <h3 class="product-title">${prod.nome}</h3>
        ${prod.subtitulo ? `<p class="product-category">${prod.subtitulo}</p>` : ''}
        <p class="product-desc">${prod.descricao || ''}</p>
        <div class="product-specs">
          ${specsHtml}
        </div>
        <div class="product-pricing-box">
          <div class="pricing-labels">
            <span class="price-condition">Conjunto Completo</span>
            <span class="product-price">${precoFormatado}</span>
            <span class="price-installment">${parcelasTexto}</span>
          </div>
          <a href="https://wa.me/${zapNumber}?text=${zapMsg}" 
             target="_blank" class="btn-order-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> Quero Este
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Atualiza contador no botão de filtro
  const totalBtn = document.querySelector('.filter-btn[data-filter="todos"]');
  if (totalBtn) {
    totalBtn.textContent = `Todas as Peças (${produtos.length})`;
  }

  setupFilters();
}
