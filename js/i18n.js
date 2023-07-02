// Function to load translations based on the selected language
function loadTranslations(lang) {
    // Fetch the i18n file
    fetch('i18n.json')
        .then(response => response.json())
        .then(translations => {
            // Check if the selected language exists in the translations
            if (translations.hasOwnProperty(lang)) {
                const langTranslations = translations[lang];
                // Replace the text content of elements with translation keys
                const translateElements = document.querySelectorAll('[data-translate]');
                translateElements.forEach(element => {
                    const translationKey = element.getAttribute('data-translate');
                    if (langTranslations.hasOwnProperty(translationKey)) {
                        element.textContent = langTranslations[translationKey];
                    }
                });
            }
        })
        .catch(error => {
            console.error('Failed to load translations:', error);
        });
}

// Check if a language is already selected in localStorage
const storedLanguage = localStorage.getItem('language');

if (storedLanguage) {
    // Load the translations for the stored language
    loadTranslations(storedLanguage);
} else {
    // Fetch the i18n file to get the available languages
    fetch('i18n.json')
        .then(response => response.json())
        .then(translations => {
            // Get the first available language as the default language
            const defaultLanguage = Object.keys(translations)[0];
            // Save the default language to localStorage
            localStorage.setItem('language', defaultLanguage);
            // Load the translations for the default language
            loadTranslations(defaultLanguage);
        })
        .catch(error => {
            console.error('Failed to load translations:', error);
        });
}

// Event listener for flag icon click
const flagIcons = document.querySelectorAll('.flag-icon');
flagIcons.forEach(icon => {
    icon.addEventListener('click', event => {
        const selectedLanguage = event.target.getAttribute('data-lang');
        // Save the selected language to localStorage
        localStorage.setItem('language', selectedLanguage);
        // Load the translations for the selected language
        loadTranslations(selectedLanguage);
        handleLanguageChange(selectedLanguage);
    });
});

// Function to handle language change
function handleLanguageChange(language) {
    // Save the selected language to localStorage for future visits
    localStorage.setItem('language', language);
    // Load the translations for the selected language
    loadTranslations(language);
}


