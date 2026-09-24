import { ArrowUp, Video } from 'lucide-react';
import { USER_INFO } from '../data/portfolioData.ts';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface FooterProps {
  theme: ThemeMode;
  language: Language;
  t: Translations['footer'];
}

export function Footer({ theme, language: _language, t }: FooterProps) {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className={`border-t-2 py-10 px-4 sm:px-6 transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F17]' : 'bg-slate-100'
      }`}
      style={{
        borderColor: isDark ? 'rgba(203, 234, 48, 0.30)' : 'rgba(203, 234, 48, 0.50)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-[#CBEA30]/20 text-[#CBEA30] flex items-center justify-center shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <span className={`font-bold text-sm block ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {USER_INFO.name} —{' '}
              <span className={isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'}>
                {t.role}
              </span>
            </span>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              © {new Date().getFullYear()} {USER_INFO.name}. {t.rights}
            </span>
          </div>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          id="back-to-top-btn"
          aria-label="Back to top"
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border-2 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs ${
            isDark
              ? 'bg-[#111827] text-slate-300 hover:text-[#CBEA30] hover:border-[#CBEA30]/70'
              : 'bg-white text-slate-800 hover:text-black hover:border-[#CBEA30] shadow-xs'
          }`}
          style={{
            borderColor: isDark ? 'rgba(203, 234, 48, 0.40)' : 'rgba(203, 234, 48, 0.65)',
          }}
        >
          <span>{t.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#CBEA30]" />
        </button>
      </div>
    </footer>
  );
}
