const i18n = {
    translations: {},
    currentLang: 'en',

    init: function() {
        console.log('i18n init called');
        this.loadTranslations();
        this.setupLanguageSelector();
    },

    loadTranslations: function() {
        console.log('Loading translations for:', this.currentLang);
        fetch(`lang/${this.currentLang}.json`)
            .then(response => response.json())
            .then(data => {
                console.log('Translations loaded:', data);
                this.translations = data;
                this.updateContent();
            })
            .catch(error => {
                console.error('Error loading translations:', error);
            });
    },

    updateContent: function() {
        console.log('Updating content');
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            console.log('Translating:', key, 'to:', this.translations[key]);
            if (this.translations[key]) {
                element.textContent = this.translations[key];
            }
        });
    },

    translate: function(key) {
        return this.translations[key] || key;
    },

    setupLanguageSelector: function() {
        const languageSelector = document.querySelector('.language-selector');
        const selectedLanguage = languageSelector.querySelector('.selected-language');
        const languageOptions = languageSelector.querySelector('.language-options');

        selectedLanguage.addEventListener('click', (e) => {
            e.stopPropagation();
            languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
        });

        languageOptions.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const selectedLang = e.target.getAttribute('data-lang');
                this.setLanguage(selectedLang);
                languageOptions.style.display = 'none';
            }
        });

        document.addEventListener('click', () => {
            languageOptions.style.display = 'none';
        });
    },

    setLanguage: function(lang) {
        this.currentLang = lang;
        this.loadTranslations();
        const currentLanguageSpan = document.querySelector('.current-language');
        currentLanguageSpan.textContent = document.querySelector(`.language-options li[data-lang="${lang}"]`).textContent;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing i18n');
    i18n.init();
});

    updateDynamicContent: function() {
        // Update dynamic content like product listings
        if (typeof renderProducts === 'function' && typeof products !== 'undefined') {
            renderProducts(products);
        }
        // Add other dynamic content update functions here
    },

    setLanguage: function(lang) {
        console.log('Setting language to:', lang);
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.loadTranslations();
        
        const selector = document.querySelector('.language-selector');
        if (selector) {
            const currentLanguageSpan = selector.querySelector('.current-language');
            const selectedOption = selector.querySelector(`.language-options li[data-lang="${lang}"]`);
            if (currentLanguageSpan && selectedOption) {
                currentLanguageSpan.textContent = selectedOption.textContent;
            }
        }
    },

  translate: function(key) {
        return this.translations[key] || key;
    },

    setupLanguageSelector: function() {
        const languageSelector = document.querySelector('.language-selector');
        const selectedLanguage = languageSelector.querySelector('.selected-language');
        const languageOptions = languageSelector.querySelector('.language-options');

        selectedLanguage.addEventListener('click', (e) => {
            e.stopPropagation();
            languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
        });

        languageOptions.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const selectedLang = e.target.getAttribute('data-lang');
                this.setLanguage(selectedLang);
                languageOptions.style.display = 'none';
            }
        });

        document.addEventListener('click', () => {
            languageOptions.style.display = 'none';
        });
    },

        document.addEventListener('click', () => {
            languageOptions.style.display = 'none';
        });

        console.log('Language selector setup complete');
    }
};

setLanguage: function(lang) {
        this.currentLang = lang;
        this.loadTranslations();
        const currentLanguageSpan = document.querySelector('.current-language');
        currentLanguageSpan.textContent = document.querySelector(`.language-options li[data-lang="${lang}"]`).textContent;
    }
};

window.i18n = i18n;

function loadAndRenderProducts() {
    if (typeof i18n !== 'undefined') {
        // Your existing product loading and rendering code
    } else {
        console.error('i18n is not defined. Retrying in 1 second...');
        setTimeout(loadAndRenderProducts, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof i18n !== 'undefined') {
        i18n.init();
    }
    loadAndRenderProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing i18n');
    i18n.init();
});
