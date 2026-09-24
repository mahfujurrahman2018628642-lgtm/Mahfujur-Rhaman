import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { VideoSection } from './components/VideoSection.tsx';
import { GraphicSection } from './components/GraphicSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BubbleBackground } from './components/BubbleBackground.tsx';
import { ThemeMode, Language } from './types.ts';
import { TRANSLATIONS } from './data/translations.ts';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0B0F17';
      document.body.style.color = '#F8FAFC';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  return (
    <div
      id="portfolio-root"
      className={`min-h-screen font-sans selection:bg-[#CBEA30]/30 selection:text-[#CBEA30] relative overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F17] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* 1. Mouse cursor bubble trail + 2. Subtle floating background bubbles */}
      <BubbleBackground theme={theme} />

      {/* Top Navbar with Language Switcher and Dark/Light Mode Toggle */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        t={t.nav}
      />

      {/* Main Content Layout */}
      <main id="portfolio-main-content" className="relative z-10">
        {/* Hero Section: Featured Video at Top & Short Greeting with Avatar */}
        <HeroSection theme={theme} language={language} t={t.hero} />

        {/* Video Portfolio Grid */}
        <VideoSection theme={theme} language={language} t={t.videos} />

        {/* Graphic & Poster Designs Section with Lightbox */}
        <GraphicSection theme={theme} language={language} t={t.graphics} />

        {/* Detailed About Me (Bio) Section */}
        <AboutSection
          theme={theme}
          language={language}
          aboutT={t.about}
          journeyT={t.journey}
        />

        {/* Get in Touch Section */}
        <ContactSection theme={theme} language={language} t={t.contact} />
      </main>

      {/* Site Footer */}
      <Footer theme={theme} language={language} t={t.footer} />
    </div>
  );
}
