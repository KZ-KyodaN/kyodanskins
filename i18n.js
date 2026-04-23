const translations = {
    ru: {
        navHome: "Главная",
        navSkins: "Скины",
        navTools: "С чем работаю",
        navContact: "Связь",
        heroTitle: "Эксклюзивные кастомные скины для <span>CS2</span>",
        heroSubtitle: "Рисую уникальные скины для CS2. Премиум качество, внимание к деталям.",
        heroBtn: "Заказать скин",
        skinsTitle: "Мои <span>Работы</span>",
        skinsSubtitle: "Средняя цена за скин — 20 евро",
        toolsTitle: "С чем <span>работаю</span>",
        toolsKritaDesc: "Использую для детальной отрисовки текстур, создания паттернов и уникальных артов для скина.",
        toolsBlenderDesc: "Применяю для наложения текстур на 3D модель оружия и настройки материалов (PBR).",
        toolsCS2Desc: "Импорт готового скина в игру, настройка износа (Wear) и экспорт в финальном формате.",
        contactTitle: "Свяжитесь со <span>мной</span>",
        contactDesc: "Заказать кастомизированный скин специально для вас - договорная цена!",
        paymentInfo: "💎 Оплату принимаю в TON или USDT 💎",
        tgBtn: "Написать в TG",
        emailBtn: "Написать на Почту",
        footer: "&copy; 2026 KyodaN SkinS. Все права защищены.",
        zoomHint: "Кликните для увеличения"
    },
    en: {
        navHome: "Home",
        navSkins: "Skins",
        navTools: "Tools",
        navContact: "Contact",
        heroTitle: "Exclusive Custom Skins for <span>CS2</span>",
        heroSubtitle: "Designing unique skins for CS2. Premium quality, attention to detail.",
        heroBtn: "Order Skin",
        skinsTitle: "My <span>Works</span>",
        skinsSubtitle: "Average price per skin — 20 euros",
        toolsTitle: "Tools I <span>Use</span>",
        toolsKritaDesc: "Used for detailed texture drawing, creating patterns and unique art for the skin.",
        toolsBlenderDesc: "Applied for mapping textures onto the 3D weapon model and adjusting materials (PBR).",
        toolsCS2Desc: "Importing the finished skin into the game, setting the wear, and exporting in the final format.",
        contactTitle: "Contact <span>Me</span>",
        contactDesc: "Order a customized skin specifically for you - negotiable price!",
        paymentInfo: "💎 Payment accepted in TON or USDT 💎",
        tgBtn: "Message in TG",
        emailBtn: "Send Email",
        footer: "&copy; 2026 KyodaN SkinS. All rights reserved.",
        zoomHint: "Click to zoom"
    }
};

let currentLang = localStorage.getItem('kyodanLang') || 'en';

function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('kyodanLang', lang);
    
    // Обновляем тексты
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Обновляем активную кнопку
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang);
});
