const i18n = {
  translations: {},
  currentLang: 'en',

  init: function() {
    this.currentLang = localStorage.getItem('language') || 'en';
    document.getElementById('languageSelector').value = this.currentLang;
    this.loadTranslations();
  },

  loadTranslations: function() {
    fetch(`lang/${this.currentLang}.json`)
      .then(response => response.json())
      .then(data => {
        this.translations = data;
        this.updateContent();
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
  
  document.getElementById('languageSelector').addEventListener('change', (e) => {
    i18n.setLanguage(e.target.value);
  });
});
