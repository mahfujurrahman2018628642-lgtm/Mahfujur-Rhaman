import { useState } from 'react';
import { Sun, Moon, Film, Menu, X } from 'lucide-react';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations['nav'];
}

export function Navbar({ theme, toggleTheme, language, setLanguage, t }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navLinks = [
    { label: t.about, href: '#about' },
    { label: t.journey, href: '#journey' },
    { label: t.videoWork, href: '#videos' },
    { label: t.graphicWork, href: '#graphics' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 relative ${
        isDark
          ? 'bg-[#0B0F17]/90 border-[#CBEA30]/20 text-[#F8FAFC]'
          : 'bg-white/90 border-[#CBEA30]/40 text-[#0F172A] shadow-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand identity: Left side */}
        <a
          href="#profile"
          id="brand-logo-link"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.01]"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2"
            style={{
              backgroundColor: isDark ? 'rgba(203, 234, 48, 0.12)' : 'rgba(203, 234, 48, 0.22)',
              borderColor: isDark ? 'rgba(203, 234, 48, 0.5)' : 'rgba(203, 234, 48, 0.75)',
              boxShadow: isDark
                ? '0 0 16px rgba(203, 234, 48, 0.25)'
                : '0 0 12px rgba(203, 234, 48, 0.35)',
            }}
          >
            <Film className="w-5 h-5 text-[#CBEA30]" />
          </div>

          <div className="flex flex-col">
            <span
              className={`font-extrabold text-base sm:text-lg tracking-tight leading-none uppercase transition-colors ${
                isDark ? 'text-white group-hover:text-[#CBEA30]' : 'text-slate-900 group-hover:text-black'
              }`}
            >
              MAHFUJUR RAHMAN
            </span>
            <span className="text-xs font-bold tracking-wide mt-1 text-[#CBEA30]">
              Video Editor & Graphic Designer
            </span>
          </div>
        </a>

        {/* Desktop Navigation: Right side */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isDark
                    ? 'text-slate-300 hover:text-[#CBEA30] hover:bg-[#CBEA30]/10'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#CBEA30]/20'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* UI Controls Order: [English / বাংলা]   [Dark/Light Mode Toggle] */}
          <div className="flex items-center gap-2 ml-2">
            {/* Language Switcher */}
            <div
              id="desktop-language-switcher"
              className="inline-flex items-center p-0.5 rounded-xl border-2 transition-all"
              style={{
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                backgroundColor: isDark ? 'rgba(203, 234, 48, 0.08)' : 'rgba(203, 234, 48, 0.15)',
              }}
              title="Switch Language / ভাষা পরিবর্তন করুন"
            >
              <button
                type="button"
                id="lang-btn-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#CBEA30] text-[#0B0F17] shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-[#CBEA30]'
                    : 'text-slate-700 hover:text-black'
                }`}
                aria-pressed={language === 'en'}
              >
                English
              </button>
              <button
                type="button"
                id="lang-btn-bn"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'bn'
                    ? 'bg-[#CBEA30] text-[#0B0F17] shadow-xs'
                    : isDark
                    ? 'text-slate-300 hover:text-[#CBEA30]'
                    : 'text-slate-700 hover:text-black'
                }`}
                aria-pressed={language === 'bn'}
              >
                বাংলা
              </button>
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center"
              style={{
                borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                backgroundColor: isDark ? 'rgba(203, 234, 48, 0.10)' : 'rgba(203, 234, 48, 0.18)',
              }}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#CBEA30]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Controls: [English / বাংলা] [Theme Toggle] [Menu Button] */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          {/* Mobile Language Switcher */}
          <div
            id="mobile-language-switcher"
            className="inline-flex items-center p-0.5 rounded-xl border-2 transition-all"
            style={{
              borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
              backgroundColor: isDark ? 'rgba(203, 234, 48, 0.08)' : 'rgba(203, 234, 48, 0.15)',
            }}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-[#CBEA30] text-[#0B0F17]'
                  : isDark
                  ? 'text-slate-300'
                  : 'text-slate-700'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                language === 'bn'
                  ? 'bg-[#CBEA30] text-[#0B0F17]'
                  : isDark
                  ? 'text-slate-300'
                  : 'text-slate-700'
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Mobile Theme Toggle */}
          <button
            type="button"
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl border-2 transition-all"
            style={{
              borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
              backgroundColor: isDark ? 'rgba(203, 234, 48, 0.10)' : 'rgba(203, 234, 48, 0.18)',
            }}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#CBEA30]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-900" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border-2 transition-all"
            style={{
              borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
              color: isDark ? '#CBEA30' : '#0F172A',
            }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className={`md:hidden border-b px-4 py-4 space-y-1 shadow-lg transition-colors ${
            isDark ? 'bg-[#0F172A] border-[#CBEA30]/20' : 'bg-white border-[#CBEA30]/35'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isDark
                  ? 'text-slate-200 hover:text-[#CBEA30] hover:bg-[#CBEA30]/10'
                  : 'text-slate-800 hover:text-black hover:bg-[#CBEA30]/20'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
