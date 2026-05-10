// Navegación responsive con accesibilidad mejorada
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Actualizar atributos ARIA
    hamburger.setAttribute('aria-expanded', isActive);
    navMenu.setAttribute('aria-hidden', !isActive);

    // Manejar foco
    if (isActive) {
        // Enfocar el primer enlace del menú
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
    }
}

hamburger.addEventListener('click', toggleMenu);

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    });
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        hamburger.focus(); // Devolver foco al botón hamburguesa
    }
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
});

// Inicializar atributos ARIA
hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
navMenu.setAttribute('aria-hidden', 'true');
navMenu.setAttribute('role', 'navigation');

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

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');
scrollAnimatedElements.forEach(el => scrollObserver.observe(el));

// Smooth scroll para el scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('#nosotros').scrollIntoView({ behavior: 'smooth' });
});

// Modo neón / normal
const neonToggle = document.getElementById('neonToggle');

if (neonToggle) {
    neonToggle.addEventListener('click', () => {
        const isNeon = document.body.classList.toggle('neon-mode');
        neonToggle.innerHTML = isNeon
            ? '<i class="fas fa-sun"></i> modo normal'
            : '<i class="fas fa-lightbulb"></i> modo neón';
        neonToggle.setAttribute('aria-pressed', isNeon);
    });
}

// Manejo del formulario con Formspree
// El formulario se envía mediante AJAX para mostrar un modal en lugar de redirigir.
const joinForm = document.getElementById('joinForm');
const formModal = document.getElementById('formModal');
const modalCloseX = document.querySelector('.modal-close');
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

function closeModal() {
    if (!formModal) return;
    formModal.classList.remove('show');
    setTimeout(() => {
        formModal.classList.add('hidden');
    }, 500);
}

function openModal() {
    if (!formModal) return;
    formModal.classList.remove('hidden');
    formModal.classList.add('show');
}

if (modalCloseX) {
    modalCloseX.addEventListener('click', closeModal);
}

if (joinForm) {
    joinForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const btn = joinForm.querySelector('button[type="submit"]');

        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.disabled = true;
        }

        const formData = new FormData(joinForm);

        try {
            const response = await fetch(joinForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                joinForm.reset();
                openModal();
            } else {
                throw new Error('No se pudo enviar la solicitud.');
            }
        } catch (error) {
            alert('Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.');
        } finally {
            if (btn) {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar solicitud';
                btn.disabled = false;
            }
        }
    });
}

// Animación de partículas de fuego en el hero (efecto visual sutil)
function createFireParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${['#e85d04', '#d00000', '#ffba08', '#ff8500'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        opacity: ${Math.random() * 0.4 + 0.2};
        pointer-events: none;
        animation: fireUp ${Math.random() * 4 + 3}s linear forwards;
        z-index: 1;
    `;
    
    hero.appendChild(particle);
    
    setTimeout(() => particle.remove(), 7000);
}

// Crear partículas de fuego periódicamente
setInterval(createFireParticle, 400);

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

