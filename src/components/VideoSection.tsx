import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { PORTFOLIO_VIDEOS } from '../data/portfolioData.ts';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface VideoSectionProps {
  theme: ThemeMode;
  language: Language;
  t: Translations['videos'];
}

export function VideoSection({ theme, language: _language, t }: VideoSectionProps) {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const isDark = theme === 'dark';

  const handlePlay = (id: string) => {
    setActiveVideos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="videos" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-2">
            <div className="w-2.5 h-6 rounded-full bg-[#CBEA30]" />
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {t.title}
            </h2>
          </div>
          <p className={`text-sm sm:text-base max-w-xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-start">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border-[1.5px]"
            style={{
              backgroundColor: isDark ? 'rgba(203, 234, 48, 0.12)' : 'rgba(203, 234, 48, 0.2)',
              borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.7)',
              color: isDark ? '#CBEA30' : '#4d6100',
            }}
          >
            {t.countBadge}
          </span>
        </div>
      </div>

      {/* Video Cards Grid (2 columns on medium/desktop, 1 column on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {PORTFOLIO_VIDEOS.map((video) => {
          const isPlaying = !!activeVideos[video.id];

          return (
            <div
              key={video.id}
              id={`video-card-${video.id}`}
              className={`card-bottom-glow group rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col ${
                isDark ? 'bg-[#111827]' : 'bg-white shadow-md'
              }`}
              style={{
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                boxShadow: isDark
                  ? '0 8px 24px -6px rgba(203, 234, 48, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)'
                  : '0 8px 24px -6px rgba(160, 195, 20, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Responsive Video Container (16:9 ratio) */}
              <div
                className="relative w-full overflow-hidden bg-black"
                style={{ aspectRatio: '16 / 9' }}
              >
                {isPlaying ? (
                  <iframe
                    className="w-full h-full border-0"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full flex items-center justify-center cursor-pointer group/thumb"
                    onClick={() => handlePlay(video.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(video.id);
                      }}
                      aria-label={`Play ${video.title}`}
                      className="relative z-10 w-14 h-14 rounded-full text-[#0B0F17] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/thumb:scale-110 active:scale-95 cursor-pointer bg-[#CBEA30] hover:bg-[#d8f53a]"
                      style={{
                        boxShadow: '0 0 22px rgba(203, 234, 48, 0.75)',
                      }}
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5 text-[#0B0F17]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Video Card Content */}
              <div className="p-5 flex-1 flex items-center justify-between gap-4">
                <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-[#CBEA30]' : 'text-slate-900 group-hover:text-[#627d04]'
                }`}>
                  {video.title}
                </h3>

                <a
                  href={video.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border-2 transition-all shrink-0 ${
                    isDark
                      ? 'bg-[#1E293B] text-slate-200 hover:text-[#CBEA30] hover:border-[#CBEA30]/70'
                      : 'bg-slate-50 text-slate-800 hover:text-black hover:border-[#CBEA30] shadow-xs'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.65)',
                  }}
                  title="Open video on YouTube"
                >
                  <span>{t.watchBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#CBEA30]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
