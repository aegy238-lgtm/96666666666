
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

const LanguageSwitcher: React.FC<Props> = ({ currentLang, onLangChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find(l => l.code === currentLang);

  return (
    <div className="fixed top-6 right-6 z-[100] group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all"
      >
        <span className="text-xl">{current?.flag}</span>
        <span className="text-sm font-bold">{current?.label}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 glass rounded-xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 min-w-[150px]">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  onLangChange(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/20 transition-colors text-right ${currentLang === lang.code ? 'bg-cyan-500/10 text-cyan-400' : ''}`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
