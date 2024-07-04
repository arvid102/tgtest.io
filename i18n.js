const i18n = {
  translations: {},
  currentLang: 'en',

  init: function() {
    this.currentLang = localStorage.getItem('language') || 'en';
    const selector = document.getElementById('languageSelector');
    if (selector) {
      selector.value = this.currentLang;
    }
    this.loadTranslations();
  },

  loadTranslations: function() {
    fetch(`lang/${this.currentLang}.json`)
      .then(response => response.text())
      .then(data => {
        try {
          this.translations = JSON.parse(data);
          this.updateContent();
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Raw JSON data:', data);
        }
      })
      .catch(error => console.error('Error loading translations:', error));
  },

  updateContent: function() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (this.translations[key]) {
        element.textContent = this.translations[key];
      }
    });
  },

  setLanguage: function(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.loadTranslations();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
  
  const selector = document.getElementById('languageSelector');
  if (selector) {
    selector.addEventListener('change', (e) => {
      i18n.setLanguage(e.target.value);
    });
  }
});
