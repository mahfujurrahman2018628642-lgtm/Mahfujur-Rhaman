import { useState } from 'react';
import { Play, Film, Mail, ExternalLink, MessageSquare } from 'lucide-react';
import { FEATURED_VIDEO, USER_INFO } from '../data/portfolioData.ts';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface HeroSectionProps {
  theme: ThemeMode;
  language: Language;
  t: Translations['hero'];
}

export function HeroSection({ theme, language: _language, t }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isDark = theme === 'dark';

  return (
    <section id="profile" className="pt-4 sm:pt-8 pb-14 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* 1. HERO / INTRODUCTION */}
      <div
        id="hero-profile-card"
        className={`card-bottom-glow relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 shadow-xl overflow-hidden ${
          isDark ? 'bg-[#111827] text-white' : 'bg-white text-slate-900 shadow-lg'
        }`}
        style={{
          borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
          boxShadow: isDark
            ? '0 12px 32px -10px rgba(203, 234, 48, 0.2), 0 4px 16px rgba(0, 0, 0, 0.5)'
            : '0 12px 32px -10px rgba(160, 195, 20, 0.25), 0 4px 16px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10">
          {/* Profile Picture */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div
              className={`relative w-32 h-32 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl p-1 shadow-md transition-transform duration-300 hover:scale-[1.02] border-2 ${
                isDark ? 'bg-[#0F172A]' : 'bg-slate-100'
              }`}
              style={{
                borderColor: isDark ? 'rgba(203, 234, 48, 0.55)' : 'rgba(203, 234, 48, 0.75)',
                boxShadow: isDark
                  ? '0 0 20px rgba(203, 234, 48, 0.3)'
                  : '0 0 16px rgba(203, 234, 48, 0.4)',
              }}
            >
              <img
                id="user-profile-avatar"
                src={USER_INFO.avatarLocal}
                data-postimg={USER_INFO.avatarPostimg}
                alt={USER_INFO.name}
                onError={(e) => {
                  e.currentTarget.src = USER_INFO.avatarDirect;
                }}
                className="w-full h-full object-cover rounded-[12px] sm:rounded-[20px]"
              />
            </div>

            {/* Small status tag */}
            <div
              className="mt-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border-[1.5px]"
              style={{
                backgroundColor: isDark ? 'rgba(203, 234, 48, 0.12)' : 'rgba(203, 234, 48, 0.2)',
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.7)',
                color: isDark ? '#CBEA30' : '#4d6100',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#CBEA30] animate-pulse" />
              <span>{t.status}</span>
            </div>
          </div>

          {/* Profile Identity & Text */}
          <div className="flex-1 text-center md:text-left space-y-4">
            {/* Small professional label */}
            <div className="flex items-center justify-center md:justify-start">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-[1.5px]"
                style={{
                  backgroundColor: isDark ? 'rgba(203, 234, 48, 0.12)' : 'rgba(203, 234, 48, 0.2)',
                  borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.7)',
                  color: isDark ? '#CBEA30' : '#4d6100',
                }}
              >
                <Film className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {USER_INFO.name}
              </h1>
              {/* Role */}
              <p className={`text-base sm:text-xl font-bold mt-1.5 ${
                isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
              }`}>
                {t.role}
              </p>
            </div>

            {/* Short Introduction */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl font-normal ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.shortIntro}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#featured-work-section"
                id="hero-watch-featured-btn"
                className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer bg-[#CBEA30] hover:bg-[#d8f53a] text-[#0B0F17]"
                style={{
                  boxShadow: '0 4px 18px rgba(203, 234, 48, 0.45)',
                }}
              >
                <Play className="w-4 h-4 fill-current text-[#0B0F17]" />
                <span>{t.featuredWorkBtn}</span>
              </a>

              <a
                href={USER_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2 border-2 ${
                  isDark
                    ? 'bg-[#1E293B] text-slate-200 hover:text-[#CBEA30] hover:border-[#CBEA30]/70'
                    : 'bg-white text-slate-800 hover:text-black hover:border-[#CBEA30] shadow-xs'
                }`}
                style={{
                  borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.65)',
                }}
              >
                <MessageSquare className="w-4 h-4 text-[#CBEA30]" />
                <span>{t.whatsappBtn}</span>
              </a>

              <a
                href={`mailto:${USER_INFO.email}`}
                id="hero-email-btn"
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all hover:-translate-y-0.5 flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#1E293B] text-slate-200 hover:text-[#CBEA30] hover:border-[#CBEA30]/70'
                    : 'bg-white text-slate-800 hover:text-black hover:border-[#CBEA30] shadow-xs'
                }`}
                style={{
                  borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.65)',
                }}
              >
                <Mail className="w-4 h-4 text-[#CBEA30]" />
                <span>{t.emailBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED VIDEO: Directly after identity area */}
      <div id="featured-work-section" className="space-y-4">
        {/* Section title */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-[#CBEA30]" />
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {t.featuredSectionTitle}
            </h2>
          </div>

          <a
            href={FEATURED_VIDEO.originalUrl}
            target="_blank"
            rel="noreferrer"
            className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 hover:underline transition-colors ${
              isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
            }`}
          >
            <span>{t.openYouTube}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Responsive 16:9 video container */}
        <div
          id="featured-video-container"
          className="card-bottom-glow relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 shadow-xl transition-all duration-300"
          style={{
            aspectRatio: '16 / 9',
            backgroundColor: '#000000',
            borderColor: isDark ? 'rgba(203, 234, 48, 0.50)' : 'rgba(203, 234, 48, 0.70)',
            boxShadow: isDark
              ? '0 16px 36px -10px rgba(203, 234, 48, 0.25)'
              : '0 16px 36px -10px rgba(160, 195, 20, 0.3)',
          }}
        >
          {isPlaying ? (
            <iframe
              id="featured-youtube-iframe"
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${FEATURED_VIDEO.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={FEATURED_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden group">
              {/* YouTube thumbnail cover */}
              <img
                src={`https://img.youtube.com/vi/${FEATURED_VIDEO.youtubeId}/maxresdefault.jpg`}
                alt={FEATURED_VIDEO.title}
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${FEATURED_VIDEO.youtubeId}/hqdefault.jpg`;
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Play Button & Center Meta */}
              <div className="relative z-10 text-center px-4 flex flex-col items-center">
                <button
                  type="button"
                  id="play-featured-video-btn"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play Featured Video"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full text-[#0B0F17] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer mb-3 shadow-xl bg-[#CBEA30] hover:bg-[#d8f53a]"
                  style={{
                    boxShadow: '0 0 30px rgba(203, 234, 48, 0.75)',
                  }}
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-[#0B0F17]" />
                </button>

                <h3 className="text-lg sm:text-2xl font-bold max-w-xl text-white drop-shadow-md">
                  {FEATURED_VIDEO.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md">
                  {t.clickToPlay}
                </p>
              </div>

              {/* Bottom tag on Video */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                <a
                  href={FEATURED_VIDEO.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="open-youtube-featured-link"
                  className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors"
                >
                  <span>{t.watchOnYouTube}</span>
                  <ExternalLink className="w-3 h-3 text-[#CBEA30]" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
