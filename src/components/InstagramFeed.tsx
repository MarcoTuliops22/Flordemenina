'use client';

import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, CheckCircle2, Award, Sparkles, Truck, Star } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tag: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    likes: 428,
    comments: 36,
    caption: 'Brinco Argola Glória banhada a Ouro 18k com zircônias de brilho intenso ✨ Perfeição em cada detalhe! #flordemenina #semijoias',
    tag: 'Brincos'
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    likes: 512,
    comments: 48,
    caption: 'Mix de colares delicados para deixar seu dia a dia ainda mais radiante 💛 Banho em Ouro 18k com 1 ano de garantia! #flordemeninato',
    tag: 'Colares'
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80',
    likes: 389,
    comments: 29,
    caption: 'Gota Esmeralda Fusion: a sofisticação que você merece! Disponível para pronta entrega em Palmas/TO 🌿✨ #semijoiasdeluxo',
    tag: 'Lançamento'
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    likes: 604,
    comments: 53,
    caption: 'Solitário Classic & Aparador Cravejado 💍 A combinação dos sonhos para qualquer ocasião inesquecível! #flordemenina__to',
    tag: 'Anéis'
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    likes: 375,
    comments: 24,
    caption: 'Ear Cuff Ramos de Zircônia 🌿 Não necessita de segundo furo e traz um charme único para sua produção! #semijoiaspalmas',
    tag: 'Ear Cuff'
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
    likes: 490,
    comments: 41,
    caption: 'Pulseira Riviera de Zircônias 💎 Elegância pura no seu pulso. Banho antialérgico livre de níquel! #flordemeninadecor',
    tag: 'Pulseiras'
  }
];

const STORY_HIGHLIGHTS = [
  { label: 'Garantia 1 Ano', icon: Award, color: 'from-amber-500 to-yellow-400' },
  { label: 'Envios Palmas', icon: Truck, color: 'from-pink-500 to-rose-400' },
  { label: 'Depoimentos', icon: Star, color: 'from-purple-500 to-indigo-400' },
  { label: 'Lançamentos', icon: Sparkles, color: 'from-rose-500 to-amber-500' },
];

export default function InstagramFeed() {
  return (
    <section className="bg-white py-16 border-y border-[#e7e0d3]" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Instagram Profile Header Showcase Card */}
        <div className="bg-[#fdfbf7] rounded-2xl p-6 md:p-8 border border-[#e7e0d3] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Instagram Avatar Circle with Story Ring */}
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[3px] shadow-md group-hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80"
                  alt="Flor de Menina (@flordemenina__to)"
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#9b7237] text-white p-1 rounded-full border-2 border-white">
                <Instagram className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1917]">
                  @flordemenina__to
                </h3>
                <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500 stroke-white" />
              </div>
              <p className="text-xs font-semibold text-[#9b7237] uppercase tracking-wider">
                Vânia Arcanjo Silva • Flor de Menina Semijoias
              </p>
              <p className="text-xs text-[#78716c] max-w-md">
                ✨ Semijoias Finas banhadas a Ouro 18k e Prata 925 com 1 Ano de Garantia. Envio rápido para Palmas/TO e todo o Brasil.
              </p>
              <div className="flex items-center gap-4 pt-1 text-xs font-medium text-[#44403c]">
                <span><strong>503</strong> publicações</span>
                <span><strong>11.2K</strong> seguidores</span>
                <span><strong>3.7K</strong> seguindo</span>
              </div>
            </div>
          </div>

          {/* Direct Instagram Link Button */}
          <a
            href="https://www.instagram.com/flordemenina__to/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-semibold text-xs tracking-wider uppercase rounded-xl hover:opacity-95 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Seguir no Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Story Highlights Bubbles */}
        <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto pb-2">
          {STORY_HIGHLIGHTS.map((story, idx) => {
            const Icon = story.icon;
            return (
              <a
                key={idx}
                href="https://www.instagram.com/flordemenina__to/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr ${story.color} p-[2.5px] shadow-xs group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#9b7237]" />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#44403c] group-hover:text-[#9b7237] transition">
                  {story.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Section Heading */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9b7237] uppercase tracking-wider">
            <Instagram className="w-4 h-4 text-[#9b7237]" /> @flordemenina__to Feed
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#1c1917]">
            Inspirações Direto do Nosso Instagram
          </h2>
          <p className="text-xs text-[#78716c]">
            Confira as últimas peças postadas no perfil oficial da Flor de Menina
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/flordemenina__to/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden shadow-xs border border-[#e7e0d3] aspect-square bg-[#f5efe6] block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Category Pill Tag */}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-md">
                {post.tag}
              </div>

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex items-center justify-end">
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </div>

                <p className="text-[10px] text-white/90 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                <div className="flex items-center justify-around text-xs font-semibold pt-1 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" /> {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center pt-4">
          <a
            href="https://www.instagram.com/flordemenina__to/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9b7237] hover:text-[#835e2b] transition border-b-2 border-[#9b7237] pb-0.5"
          >
            <Instagram className="w-4 h-4" />
            <span>Ver mais novidades no perfil @flordemenina__to</span>
          </a>
        </div>

      </div>
    </section>
  );
}
