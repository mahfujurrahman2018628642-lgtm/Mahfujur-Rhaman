import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { GRAPHIC_ITEMS } from '../data/portfolioData.ts';
import { GraphicItem, ThemeMode, Language } from '../types.ts';
import { LightboxModal } from './LightboxModal.tsx';
import { Translations } from '../data/translations.ts';

interface GraphicSectionProps {
  theme: ThemeMode;
  language: Language;
  t: Translations['graphics'];
}

export function GraphicSection({ theme, language: _language, t }: GraphicSectionProps) {
  const [selectedGraphicIndex, setSelectedGraphicIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  const handleOpenLightbox = (index: number) => {
    setSelectedGraphicIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedGraphicIndex(null);
  };

  const handleNext = () => {
    if (selectedGraphicIndex === null) return;
    setSelectedGraphicIndex((selectedGraphicIndex + 1) % GRAPHIC_ITEMS.length);
  };

  const handlePrev = () => {
    if (selectedGraphicIndex === null) return;
    setSelectedGraphicIndex((selectedGraphicIndex - 1 + GRAPHIC_ITEMS.length) % GRAPHIC_ITEMS.length);
  };

  const activeGraphic: GraphicItem | null =
    selectedGraphicIndex !== null ? GRAPHIC_ITEMS[selectedGraphicIndex] : null;

  return (
    <section id="graphics" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto">
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

      {/* 6 Graphic Image Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GRAPHIC_ITEMS.map((item, index) => (
          <div
            key={item.id}
            id={`graphic-card-${item.id}`}
            onClick={() => handleOpenLightbox(index)}
            className={`card-bottom-glow group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col ${
              isDark ? 'bg-[#111827]' : 'bg-white shadow-md'
            }`}
            style={{
              borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
              boxShadow: isDark
                ? '0 8px 24px -6px rgba(203, 234, 48, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)'
                : '0 8px 24px -6px rgba(160, 195, 20, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Image Container */}
            <div className="relative w-full overflow-hidden bg-slate-900" style={{ aspectRatio: '4 / 5' }}>
              <img
                src={item.localSrc}
                data-postimg={item.postimgUrl}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.src = item.directSrc;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span
                  className="p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 bg-[#CBEA30] text-[#0B0F17]"
                  style={{
                    boxShadow: '0 0 22px rgba(203, 234, 48, 0.8)',
                  }}
                >
                  <ZoomIn className="w-5 h-5 text-[#0B0F17]" />
                </span>
              </div>
            </div>

            {/* Bottom Card Title */}
            <div
              className={`p-4 border-t-2 flex items-center justify-between transition-colors ${
                isDark ? 'bg-[#111827] border-[#CBEA30]/25' : 'bg-slate-50 border-[#CBEA30]/40'
              }`}
            >
              <div>
                <h3 className={`font-bold text-base transition-colors ${
                  isDark ? 'text-white group-hover:text-[#CBEA30]' : 'text-slate-900 group-hover:text-[#627d04]'
                }`}>
                  {item.title}
                </h3>
                <span className={`text-xs font-semibold ${
                  isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                }`}>
                  {t.posterStudy}
                </span>
              </div>

              <span className={`text-xs font-bold transition-colors flex items-center gap-1 ${
                isDark ? 'text-[#CBEA30] group-hover:text-white' : 'text-[#627d04] group-hover:text-black'
              }`}>
                {t.viewBtn} <ZoomIn className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={selectedGraphicIndex !== null}
        activeItem={activeGraphic}
        currentIndex={selectedGraphicIndex ?? 0}
        totalCount={GRAPHIC_ITEMS.length}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
