import { useState } from 'react';
import { Mail, MessageSquare, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { USER_INFO } from '../data/portfolioData.ts';
import { ThemeMode, Language } from '../types.ts';
import { Translations } from '../data/translations.ts';

interface ContactSectionProps {
  theme: ThemeMode;
  language: Language;
  t: Translations['contact'];
}

export function ContactSection({ theme, language: _language, t }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const isDark = theme === 'dark';

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(USER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${senderName || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMessage}`
    );
    window.location.href = `mailto:${USER_INFO.email}?subject=${subject}&body=${body}`;
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 5000);
  };

  return (
    <section id="contact" className="py-14 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-2.5 h-6 rounded-full bg-[#CBEA30]" />
        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {t.sectionTitle}
        </h2>
      </div>

      <div
        id="contact-main-card"
        className={`card-bottom-glow p-6 sm:p-10 rounded-2xl border-2 transition-all duration-300 shadow-xl ${
          isDark ? 'bg-[#111827]' : 'bg-white shadow-md'
        }`}
        style={{
          borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
          boxShadow: isDark
            ? '0 8px 24px -6px rgba(203, 234, 48, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)'
            : '0 8px 24px -6px rgba(160, 195, 20, 0.22), 0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {t.cardTitle}
              </h3>
              <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t.cardSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 transition-colors ${
                  isDark ? 'bg-[#161F33]' : 'bg-slate-50'
                }`}
                style={{
                  borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.55)',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#CBEA30]/20 text-[#CBEA30] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#CBEA30]" />
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[11px] block font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {t.emailLabel}
                    </span>
                    <a
                      href={`mailto:${USER_INFO.email}`}
                      className={`text-xs sm:text-sm font-semibold hover:underline truncate block ${
                        isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                      }`}
                    >
                      {USER_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  title="Copy email address"
                  className={`px-2.5 py-1.5 rounded-lg border-2 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                    isDark
                      ? 'bg-[#0F172A] text-slate-200 hover:text-[#CBEA30] hover:border-[#CBEA30]/70'
                      : 'bg-white text-slate-800 hover:text-black hover:border-[#CBEA30] shadow-xs'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.65)',
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#CBEA30]" />
                      <span className="text-[#CBEA30]">{t.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={USER_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between gap-3 transition-all ${
                  isDark
                    ? 'bg-[#161F33] hover:border-[#CBEA30]/70 hover:bg-[#1E293B]'
                    : 'bg-slate-50 hover:border-[#CBEA30] hover:bg-slate-100 shadow-2xs'
                }`}
                style={{
                  borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.55)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#CBEA30]/20 text-[#CBEA30] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#CBEA30]" />
                  </div>
                  <div>
                    <span className={`text-[11px] block font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {t.whatsappLabel}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold block ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {USER_INFO.whatsappRaw}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#CBEA30]" />
              </a>

              {/* Facebook & Behance */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={USER_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl border-2 flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#161F33] hover:border-[#CBEA30]/70 hover:bg-[#1E293B]'
                      : 'bg-slate-50 hover:border-[#CBEA30] hover:bg-slate-100 shadow-2xs'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.55)',
                  }}
                >
                  <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                    isDark ? 'text-slate-200 hover:text-[#CBEA30]' : 'text-slate-800 hover:text-black'
                  }`}>
                    Facebook
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#CBEA30]" />
                </a>

                <a
                  href={USER_INFO.behance}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-xl border-2 flex items-center justify-between transition-all ${
                    isDark
                      ? 'bg-[#161F33] hover:border-[#CBEA30]/70 hover:bg-[#1E293B]'
                      : 'bg-slate-50 hover:border-[#CBEA30] hover:bg-slate-100 shadow-2xs'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.35)' : 'rgba(203, 234, 48, 0.55)',
                  }}
                >
                  <span className={`text-xs sm:text-sm font-semibold transition-colors ${
                    isDark ? 'text-slate-200 hover:text-[#CBEA30]' : 'text-slate-800 hover:text-black'
                  }`}>
                    Behance
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#CBEA30]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Working Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                  }`}
                >
                  {t.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border-2 focus:outline-hidden transition-colors ${
                    isDark
                      ? 'bg-[#0B0F17] text-white placeholder:text-slate-500 focus:border-[#CBEA30]'
                      : 'bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#8dae09]'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                  }`}
                >
                  {t.emailInputLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder={t.emailInputPlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border-2 focus:outline-hidden transition-colors ${
                    isDark
                      ? 'bg-[#0B0F17] text-white placeholder:text-slate-500 focus:border-[#CBEA30]'
                      : 'bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#8dae09]'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#CBEA30]' : 'text-[#627d04]'
                  }`}
                >
                  {t.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border-2 focus:outline-hidden transition-colors resize-none ${
                    isDark
                      ? 'bg-[#0B0F17] text-white placeholder:text-slate-500 focus:border-[#CBEA30]'
                      : 'bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#8dae09]'
                  }`}
                  style={{
                    borderColor: isDark ? 'rgba(203, 234, 48, 0.45)' : 'rgba(203, 234, 48, 0.65)',
                  }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="contact-send-btn"
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm text-[#0B0F17] shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer bg-[#CBEA30] hover:bg-[#d8f53a]"
                  style={{
                    boxShadow: '0 4px 18px rgba(203, 234, 48, 0.45)',
                  }}
                >
                  <Send className="w-4 h-4 text-[#0B0F17]" />
                  <span>{t.sendBtn}</span>
                </button>
              </div>

              {submittedNotice && (
                <div
                  className="p-3 rounded-xl border-2 text-xs font-semibold text-center transition-all bg-[#CBEA30]/15 border-[#CBEA30]/50 text-slate-900 dark:text-[#CBEA30]"
                >
                  {t.preparingEmail} {USER_INFO.email}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
