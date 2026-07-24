async function loadTranslations() {
  // Détecte si la langue de l'utilisateur commence par "fr"
  const userLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
  
  if (userLang === 'en') return; // Si c'est en anglais, pas besoin de traduire

  try {
    // Charge le fichier de traduction français
    const response = await fetch(`/locales/${userLang}.json`);
    const translations = await response.json();

    // Parcourt tous les éléments qui ont l'attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
  } catch (err) {
    console.error("Erreur lors du chargement de la traduction :", err);
  }
}

// Lance la traduction dès que la page est chargée
document.addEventListener('DOMContentLoaded', loadTranslations);