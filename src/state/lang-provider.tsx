import { createContext, useContext, useState } from "react";

type Language = "en" | "de";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLang?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const initialState: LanguageProviderState = {
  lang: "en",
  setLang: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLang = "en",
  storageKey = "btown-lang",
  ...props
}: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLang
  );

  const value = {
    lang,
    setLang: (lang: Language) => {
      localStorage.setItem(storageKey, lang);
      setLang(lang);
    },
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLang must be used within a LanguageProvider");

  return context;
};
