(function() {
  "use strict";

  const defaultLanguage = "es";
  const supportedLanguages = ["es", "en"];
  const storageKey = "language";
  let currentLanguage = localStorage.getItem(storageKey) || defaultLanguage;

  if (!supportedLanguages.includes(currentLanguage)) {
    currentLanguage = defaultLanguage;
  }

  function getTranslation(language, key) {
    return key.split(".").reduce(function(value, part) {
      return value && value[part] !== undefined ? value[part] : undefined;
    }, window.translations[language]);
  }

  function setLanguage(language) {
    if (!supportedLanguages.includes(language)) {
      return;
    }

    currentLanguage = language;
    localStorage.setItem(storageKey, language);
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(function(element) {
      const key = element.getAttribute("data-i18n");
      const translation = getTranslation(language, key);

      if (translation !== undefined) {
        element.textContent = translation;
      }
    });

    document.querySelectorAll("[data-i18n-typed-items]").forEach(function(element) {
      const key = element.getAttribute("data-i18n-typed-items");
      const translation = getTranslation(language, key);

      if (translation !== undefined) {
        element.setAttribute("data-typed-items", translation);
      }
    });

    if (typeof window.portfolioRefreshTyped === "function") {
      window.portfolioRefreshTyped();
    }
  }

  const languageToggle = document.querySelector("#languageToggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", function(event) {
      event.preventDefault();
      const nextLanguage = currentLanguage === "es" ? "en" : "es";
      setLanguage(nextLanguage);
    });
  }

  window.setLanguage = setLanguage;
  setLanguage(currentLanguage);
})();
