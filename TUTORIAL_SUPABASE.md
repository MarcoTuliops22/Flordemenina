# Guia Rápido: Como Conectar o Catálogo Flor de Menina ao Supabase

Este guia ensina passo a passo como colocar seu catálogo no **Supabase** para gerenciar produtos, preços e fotos diretamente por um painel web sem precisar mexer em código!

---

## Passo 1: Criar o Projeto no Supabase
1. Acesse **[supabase.com](https://supabase.com)** e faça login (ou crie sua conta gratuita).
2. Clique em **"New Project"**.
3. Defina um nome para o projeto (ex: `flor-de-menina-catalogo`).
4. Crie uma senha segura para o banco de dados e selecione a região mais próxima (ex: `São Paulo - South America`).
5. Clique em **"Create new project"** e aguarde cerca de 1 minuto até o banco inicializar.

---

## Passo 2: Executar o Script SQL (Criar Tabela e Cadastrar as 13 Peças)
1. No menu lateral esquerdo do Supabase, clique no ícone **SQL Editor** (ícone de terminal `>_`).
2. Clique em **"New Query"**.
3. Abra o arquivo [supabase_schema.sql](file:///c:/Users/PC/OneDrive/Desktop/catalogo%20flor%20de%20menina/supabase_schema.sql) que criamos na sua pasta, copie todo o conteúdo e cole no editor do Supabase.
4. Clique no botão verde **"Run"** (ou pressione `Ctrl + Enter`).
5. **Pronto!** A tabela `produtos` será criada com as políticas de segurança (RLS) e todas as **13 peças** já cadastradas com os preços reais que você definiu.

---

## Passo 3: Conectar seu Catálogo ao Supabase
1. No painel do Supabase, clique na engrenagem **Project Settings** (canto inferior esquerdo).
2. Vá em **"Data API"** (ou **API**).
3. Você verá dois dados principais:
   * **Project URL:** algo como `https://abcdefghijk.supabase.co`
   * **anon public key:** uma chave longa começando com `eyJhbGci...`
4. Abra o arquivo [supabase-config.js](file:///c:/Users/PC/OneDrive/Desktop/catalogo%20flor%20de%20menina/supabase-config.js) no seu editor e cole os dois valores nos campos correspondentes:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://SEU_PROJETO.supabase.co',      // Cole sua URL aqui
  anonKey: 'SUA_CHAVE_ANON_AQUI',            // Cole sua chave aqui
  tableName: 'produtos',
  whatsappNumber: '5563999111818'
};
```

---

## Passo 4: Como Gerenciar seus Produtos no Dia a Dia
A partir de agora, você pode:
* **Alterar Preços:** Acesse **Table Editor** > tabela `produtos` no Supabase, dê dois cliques em qualquer valor na coluna `preco` e altere. O catálogo atualiza automaticamente!
* **Pausar Peças Esgotadas:** Basta desmarcar a caixinha da coluna `disponivel` para `false`. A peça desaparecerá do catálogo automaticamente.
* **Adicionar Novas Semijoias:** Clique em **"Insert row"** no Supabase e preencha o nome, foto, preço e categoria. A nova peça já entra no ar instantaneamente!
