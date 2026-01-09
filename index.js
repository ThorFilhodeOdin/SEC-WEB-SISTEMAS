// SEC SISTEMAS - JavaScript Principal

// ============================================
// MATRIX EFFECT
// ============================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Configurar tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres do Matrix (binário + símbolos)
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = canvas.width / fontSize;

// Array de gotas
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Função de desenho
function drawMatrix() {
    // Fundo semi-transparente para efeito de trilha
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cor verde do Matrix
    ctx.fillStyle = '#0f9';
    ctx.font = fontSize + 'px monospace';

    // Desenhar caracteres
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Resetar gota quando chega ao fim ou aleatoriamente
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animar Matrix
setInterval(drawMatrix, 35);

// Redimensionar canvas quando janela muda
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('.nav');

if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
