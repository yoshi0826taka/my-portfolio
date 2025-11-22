// ブラウザ向けのフロントエンドスクリプト

// ハンバーガーメニュー（要素が存在する場合のみ）
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// スムーススクロール（存在チェックあり）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// スキルバーアニメーション（セクションがある場合のみ監視）
const observerOptions = { threshold: 0.5 };
const skillsSection = document.getElementById('skills');
if (skillsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress') || '0';
                    bar.style.width = progress + '%';
                });
            }
        });
    }, observerOptions);
    observer.observe(skillsSection);
}

// フォームバリデーション（HTML の id に合わせて修正）
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');

function validateAndSubmit(event) {
    if (event) event.preventDefault();
    let isValid = true;

    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const name = (nameEl && nameEl.value || '').trim();
    const email = (emailEl && emailEl.value || '').trim();
    const message = (messageEl && messageEl.value || '').trim();

    if (!name) {
        if (nameError) nameError.textContent = '名前を入力してください。';
        isValid = false;
    } else if (nameError) {
        nameError.textContent = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        if (emailError) emailError.textContent = '有効なメールアドレスを入力してください';
        isValid = false;
    } else if (emailError) {
        emailError.textContent = '';
    }

    if (!message) {
        if (messageError) messageError.textContent = 'メッセージを入力してください';
        isValid = false;
    } else if (messageError) {
        messageError.textContent = '';
    }

    if (isValid) {
        alert('お問い合わせありがとうございます！\n（実際の送信機能は実装されていません）');
        if (form) form.reset();
    }
}

if (submitButton) {
    submitButton.addEventListener('click', validateAndSubmit);
} else if (form) {
    form.addEventListener('submit', validateAndSubmit);
}
