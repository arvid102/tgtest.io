const i18n = {
    translations: {},
    currentLang: 'en',

    init: function() {
        this.currentLang = localStorage.getItem('language') || 'en';
        const selector = document.querySelector('.language-selector');
        if (selector) {
            const currentLanguageSpan = selector.querySelector('.current-language');
            const selectedOption = selector.querySelector(`.language-options li[data-lang="${this.currentLang}"]`);
            if (currentLanguageSpan && selectedOption) {
                currentLanguageSpan.textContent = selectedOption.textContent;
            }
        }
        this.loadTranslations();
        this.setupLanguageSelector();
    },

    loadTranslations: function() {
        fetch(`lang/${this.currentLang}.json`)
            .then(response => response.json())
            .then(data => {
                this.translations = data;
                this.updateContent();
            })
            .catch(error => {
                console.error('Error loading translations:', error);
                if (this.currentLang !== 'en') {
                    console.log('Falling back to English');
                    this.currentLang = 'en';
                    this.loadTranslations();
                }
            });
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
        if (typeof renderProducts === 'function' && typeof products !== 'undefined') {
            renderProducts(products);
        }
        // Add other dynamic content update functions here
    },

    setLanguage: function(lang) {
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
    if (!languageSelector) {
        console.log('Language selector not found');
        return;
    }

    const selectedLanguage = languageSelector.querySelector('.selected-language');
    const languageOptions = languageSelector.querySelector('.language-options');
    const currentLanguageSpan = languageSelector.querySelector('.current-language');

    if (!selectedLanguage || !languageOptions || !currentLanguageSpan) {
        console.log('Language selector elements not found');
        return;
    }

    // Ensure language options are initially hidden
    languageOptions.style.display = 'none';

    selectedLanguage.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Language selector clicked');
        languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
    });

    languageOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            console.log('Language option clicked:', e.target.textContent);
            const selectedLang = e.target.getAttribute('data-lang');
            const selectedText = e.target.textContent;
            
            currentLanguageSpan.textContent = selectedText;

            languageOptions.querySelectorAll('li').forEach(li => {
                li.classList.remove('selected');
            });
            e.target.classList.add('selected');

            languageOptions.style.display = 'none';

            this.setLanguage(selectedLang);
        }
    });

    document.addEventListener('click', () => {
        languageOptions.style.display = 'none';
    });

    console.log('Language selector setup complete');
}

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
