javascriptCopyconst i18n = {
    translations: {},
    currentLang: 'en',

    init: function() {
        this.currentLang = localStorage.getItem('language') || 'en';
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
                if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
                    element.placeholder = this.translations[key];
                } else {
                    element.textContent = this.translations[key];
                }
            }
        });
        this.updateDynamicContent();
    },

    updateDynamicContent: function() {
        // Update dynamic content like product listings
        if (typeof renderProducts === 'function') {
            renderProducts(products); // Assuming 'products' is your global products array
        }
    },

    setLanguage: function(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.loadTranslations();
    },

    translate: function(key) {
        return this.translations[key] || key;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();

    const languageSelector = document.querySelector('.language-selector');
    const selectedLanguage = languageSelector.querySelector('.selected-language');
    const languageOptions = languageSelector.querySelector('.language-options');
    const currentLanguageSpan = languageSelector.querySelector('.current-language');

    selectedLanguage.addEventListener('click', (e) => {
        e.stopPropagation();
        languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
    });

    languageOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedLang = e.target.getAttribute('data-lang');
            const selectedText = e.target.textContent;
            
            currentLanguageSpan.textContent = selectedText;

            languageOptions.querySelectorAll('li').forEach(li => {
                li.classList.remove('selected');
            });
            e.target.classList.add('selected');

            languageOptions.style.display = 'none';

            i18n.setLanguage(selectedLang);
        }
    });

    document.addEventListener('click', () => {
        languageOptions.style.display = 'none';
    });
});
