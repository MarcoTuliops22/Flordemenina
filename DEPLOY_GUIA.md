# Como Hospedar o Catálogo com Supabase e NPM

Seu projeto agora está 100% configurado como uma aplicação web moderna com **NPM**, **Vite** e a biblioteca oficial **`@supabase/supabase-js`**!

---

## 1. Entendendo a Arquitetura (Supabase + NPM)

No desenvolvimento web profissional:
* **Supabase (Backend):** É onde ficam os dados das semijoias (preços, referências, fotos, estoque). Você gerencia tudo por lá pelo navegador sem mexer no código.
* **NPM + Vite (Frontend):** É o código do catálogo que exibe as fotos, botões do WhatsApp e layout responsivo.

Como o Supabase é um banco de dados e serviço de arquivos (ele não possui um servidor web para servir sites estáticos diretamente), a documentação oficial do Supabase recomenda duas formas de hospedar:

---

## Opção A (Recomendada): Hospedar Grátis na Vercel com 1 comando NPM

A **Vercel** é a plataforma parceira oficial do Supabase, 100% gratuita, e coloca o catálogo no ar com link seguro `https://seucatalogo.vercel.app`:

1. No terminal da sua pasta, execute:
   ```bash
   npm run deploy:vercel
   ```
2. O assistente fará 3 perguntas simples:
   * *Set up and deploy?* Digite **Y** (Sim)
   * *Which scope?* Pressione **Enter**
   * *Link to existing project?* Digite **N** (Não)
   * *What's your project's name?* Digite `catalogo-flor-de-menina`
   * *In which directory is your code located?* Pressione **Enter**
3. **Pronto!** Em 30 segundos ele fornecerá o link público do seu catálogo no ar com HTTPS e alta velocidade no celular!

---

## Opção B: Hospedar 100% dentro do Supabase Storage

Se você quiser que os arquivos fiquem fisicamente guardados dentro do seu Supabase:

1. Gere a pasta de produção executando:
   ```bash
   npm run build
   ```
   *(Isso cria a pasta `dist/` otimizada com todos os arquivos prontos).*
2. No painel do seu Supabase ([supabase.com](https://supabase.com)):
   * Vá em **Storage** > crie um bucket público chamado `site` (marque a opção **Public Bucket**).
   * Arraste todo o conteúdo de dentro da pasta `dist/` para dentro desse bucket.
   * O arquivo `index.html` terá uma URL pública permanente que você pode compartilhar!

---

## Comandos NPM Disponíveis no seu Projeto:

| Comando | O que faz |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local para você ver as alterações no navegador na hora |
| `npm run build` | Compila o catálogo otimizado para a pasta `/dist` |
| `npm run preview` | Visualiza o site compilado em modo de produção |
| `npm run deploy:vercel` | Publica o site online na Vercel |
| `npm run deploy:netlify` | Publica o site online na Netlify |
