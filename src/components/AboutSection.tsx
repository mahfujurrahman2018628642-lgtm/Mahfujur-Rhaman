import { CheckCircle2 } from 'lucide-react';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface AboutSectionProps {
  theme: ThemeMode;
  language: Language;
  aboutT: Translations['about'];
  journeyT: Translations['journey'];
}

export function AboutSection({ theme, language: _language, aboutT, journeyT }: AboutSectionProps) {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-16 py-14 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* 6. ABOUT ME SECTION */}
      <section id="about" className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 rounded-full bg-[#CBEA30]" />
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {aboutT.title}
          </h2>
        </div>

        {/* Main About Card */}
        <div
          id="about-me-card"
          className={`card-bottom-glow p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 shadow-xl ${
            isDark ? 'bg-[#111827]' : 'bg-white shadow-md'
          }`}
          style={{
            borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
            boxShadow: isDark
              ? '0 8px 24px -6px rgba(203, 234, 48, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)'
              : '0 8px 24px -6px rgba(160, 195, 20, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="space-y-5 text-sm sm:text-base leading-relaxed">
            <p className={`font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {aboutT.bio}
            </p>
          </div>
        </div>
      </section>

      {/* 7. MY CREATIVE JOURNEY */}
      <section id="journey" className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2.5 h-6 rounded-full bg-[#CBEA30]" />
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {journeyT.title}
              </h2>
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold border-[1.5px] mb-2"
              style={{
                backgroundColor: isDark ? 'rgba(203, 234, 48, 0.12)' : 'rgba(203, 234, 48, 0.2)',
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.7)',
                color: isDark ? '#CBEA30' : '#4d6100',
              }}
            >
              {journeyT.badge}
            </span>
            <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {journeyT.description}
            </p>
          </div>
        </div>

        {/* 3-Month Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journeyT.stages.map((stage, idx) => (
            <div
              key={stage.month}
              id={`journey-card-month-${idx + 1}`}
              className={`card-bottom-glow p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${
                isDark ? 'bg-[#111827]' : 'bg-white shadow-md'
              }`}
              style={{
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                boxShadow: isDark
                  ? '0 8px 24px -6px rgba(203, 234, 48, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)'
                  : '0 8px 24px -6px rgba(160, 195, 20, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold border-[1.5px]"
                    style={{
                      backgroundColor: isDark ? 'rgba(203, 234, 48, 0.15)' : 'rgba(203, 234, 48, 0.22)',
                      borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.7)',
                      color: isDark ? '#CBEA30' : '#4d6100',
                    }}
                  >
                    {stage.month}
                  </span>
                  <span className={`text-xs font-semibold ${
                    isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                  }`}>
                    {journeyT.skillMilestone}
                  </span>
                </div>

                <h3 className={`text-lg font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {stage.title}
                </h3>

                <ul className="space-y-2.5 pt-2">
                  {stage.points.map((point, pIdx) => (
                    <li key={pIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-[#CBEA30] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
