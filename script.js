// Navegación responsive
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 26, 0.98)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.padding = '15px 0';
    }
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.about-card, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Smooth scroll para el scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('#nosotros').scrollIntoView({ behavior: 'smooth' });
});

// Manejo del formulario con Formspree
// El formulario se envía normalmente a Formspree. No se usa preventDefault.
// Si deseas agregar una animación al botón antes de enviar, puedes hacerlo aquí.
const joinForm = document.getElementById('joinForm');

joinForm.addEventListener('submit', () => {
    const btn = joinForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    // El navegador continúa con el envío POST a Formspree
});

// Efecto parallax sutil en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animación de contador para números (si se agregan estadísticas)
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            el.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target;
        }
    }
    
    updateCounter();
}

// Animación de partículas de fuego en el hero (efecto visual opcional)
function createFireParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${['#e85d04', '#d00000', '#ffba08', '#ff8500'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        opacity: ${Math.random() * 0.5 + 0.2};
        pointer-events: none;
        animation: fireUp ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    hero.appendChild(particle);
    
    setTimeout(() => particle.remove(), 5000);
}

// Crear partículas de fuego periódicamente
setInterval(createFireParticle, 300);

// Agregar keyframes para las partículas de fuego dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fireUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) scale(0.3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validación del formulario en tiempo real
const inputs = joinForm.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const formGroup = input.closest('.form-group');
    
    if (input.hasAttribute('required') && !input.value.trim()) {
        formGroup.classList.add('error');
        return false;
    }
    
    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    formGroup.classList.remove('error');
    return true;
}

// Agregar estilos para errores de validación
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .form-group.error input,
    .form-group.error textarea {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1) !important;
    }
    
    .form-group.error::after {
        content: 'Campo requerido';
        display: block;
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    }
`;
document.head.appendChild(errorStyle);

console.log('MJD Barinas - Sitio web cargado correctamente');
console.log('Movimiento Juvenil Dominicano - Barinas, Venezuela');

