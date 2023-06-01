const defaultLocale = 'en';
const allLocales = ['en', 'el'];

let currentLocale;
// Get Locale from Local Storage
let sessionLocale = localStorage.getItem('session');

let translations = {};


// Actions to happen on page load.
document.addEventListener('DOMContentLoaded', () => {
  // Set Locale on Load.
  // First check if the session in Local Storage is either empty (no key if it's the first time accessing the website)
  // or if the language does not exist anymore (can't be found in the "allLocales" array if it was deleted for example).
  // If any of the above cases are true set the Locale to "defaultLocale", otherwise, set Locale to the one stored in Local Storage.
  // That is to ensure the Locale is maintained during page switch.
  if(sessionLocale === null || ! allLocales.includes(sessionLocale, 0)) {
    setLocale(defaultLocale);
  } else {
    setLocale(sessionLocale);
  }
  
  // Load Language Switcher.
  languageSwitcher();

  // Change Locale on click.
  changeLocale();
});


// Load translations for new locale and translate page.
async function setLocale(newLocale) {
  if (newLocale === currentLocale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);

  currentLocale = newLocale;
  translations = newTranslations;

  translatePage();
  translateElements();
};


// Get translations from JSON file.
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`assets/locale/languages/${newLocale}.json`);

  return await response.json();
};


// Translate page.
async function translatePage() {
  document.querySelectorAll('[data-lang-key]').forEach(translateText);
};


// Translate text.
function translateText(element) {
  const key = element.getAttribute('data-lang-key');
  const translation = translations[key];

  element.innerText = translation;
};


// Translate other page elements (like images for example).
function translateElements() {
  // Translate Logo.
  const logoImage = document.querySelectorAll('[data-logo]');

  logoImage.forEach((logo) => {
    const logoAlt = translations[logo.getAttribute('data-lang-key')];

    logo.setAttribute('src', `assets/img/Logo-${currentLocale}.png`);
    logo.setAttribute('alt', logoAlt);
  });
};


// Change page locale, add "active" class on current language and set Local Storage Session.
function changeLocale() {
  const language = document.querySelectorAll('[data-language]');
  
  language.forEach((currentLanguage) => {
    let locale = document.querySelector('[lang]');

    currentLanguage.addEventListener('click', () => {
      // Change <html> tag [lang] attribute value to current language.
      let localeCode = currentLanguage.getAttribute('data-language');
      locale.setAttribute('lang', localeCode);

      setLocale(document.querySelector('[lang]').getAttribute('lang'));

      // Add "active" class on current language <li> tag.
      language.forEach((currentLanguage) => {
        currentLanguage.classList.remove('active');
      });
      
      currentLanguage.classList.add('active');

      // Set Locale Session in Local Storage.
      localStorage.setItem('session', localeCode);
    });
  }); 
};


// Create language switcher
function languageSwitcher() {
  const switcher = document.querySelector('[lang-switcher]');

  for (let localeKey in allLocales) {
    const languageList = document.createElement('li');
    const languageName = document.createElement('span');

    // Set attributes for <li> element.
    languageList.setAttribute('data-language', allLocales[localeKey]);

    // Set "active" class for current language on first load.
    if(sessionLocale == null || ! allLocales.includes(sessionLocale, 0)) {
      if(languageList.getAttribute('data-language') === defaultLocale) {
        languageList.setAttribute('class', 'active');
       }
    } else {
      if(languageList.getAttribute('data-language') === sessionLocale) {
        languageList.setAttribute('class', 'active');
       }
    }

    // Set attributes for <span> element.
    languageName.setAttribute('class', 'language');
    languageName.setAttribute('data-lang-key', `switcherLanguage_${allLocales[localeKey]}`);

    // Create elements.
    languageList.appendChild(languageName);
    switcher.appendChild(languageList);
  };
};