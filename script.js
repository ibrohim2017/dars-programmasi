// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const categoryBtns = document.querySelectorAll('.category-btn');
const courseCards = document.querySelectorAll('.course-card');
const statNumbers = document.querySelectorAll('.stat-number');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.querySelector('.chat-messages');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Course filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        courseCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animated counters
function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const current = parseInt(stat.textContent);
        const increment = target / 100;

        if (current < target) {
            stat.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            stat.textContent = target;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;

            // Add animation classes
            if (element.classList.contains('stat-card')) {
                element.style.animation = 'fadeIn 0.8s ease forwards';
            }

            if (element.classList.contains('student-card')) {
                element.style.animation = 'slideInLeft 0.8s ease forwards';
            }

            if (element.classList.contains('course-card')) {
                element.style.animation = 'slideInRight 0.8s ease forwards';
            }

            if (element.classList.contains('ai-feature')) {
                element.style.animation = 'fadeIn 0.8s ease forwards';
            }

            // Animate counters when stats section is visible
            if (element.classList.contains('stats-grid')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .student-card, .course-card, .ai-feature, .stats-grid').forEach(el => {
    observer.observe(el);
});

// Chat functionality
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            ${content}
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage(message) {
    // Add user message
    addMessage(message, true);

    // Clear input
    chatInput.value = '';

    // Simulate AI response after delay
    setTimeout(() => {
        let response = getAIResponse(message);
        addMessage(response);
    }, 1000);
}

function getAIResponse(message) {
    const responses = {
        'matematik': 'Matematika bo\'yicha qanday mavzuda yordam kerak? Algebra, geometriya, yoki analiz?',
        'fizik': 'Fizika juda qiziq fan! Qaysi bo\'limda yordam kerak - mexanika, termodinamika yoki elektr?',
        'kimyo': 'Kimyo bo\'yicha savollaringiz bormi? Organik yoki noorganik kimyo?',
        'dasturlash': 'Dasturlash o\'rganish uchun qaysi tilni tanlaysiz? Python, JavaScript yoki boshqa?',
        'imtihon': 'Imtihonga tayyorlanish uchun rejali o\'qish va takrorlash muhim. Qaysi fandan imtihon?',
        'reja': 'O\'qish rejasini tuzish uchun maqsadlaringizni aniq belgilang va vaqtni to\'g\'ri taqsimlang.',
        'yordam': 'Har doim yordamga tayyorman! Qanday mavzuda ko\'mak kerak?'
    };

    const lowerMessage = message.toLowerCase();

    for (let key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }

    return 'Savolingiz juda qiziq! Iltimos, aniqroq ayting va men sizga yordam beraman.';
}

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
            handleUserMessage(message);
        }
    }
});

// Send message on button click
sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        handleUserMessage(message);
    }
});

// Suggestion buttons
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const suggestion = btn.textContent;
        handleUserMessage(suggestion);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Progress bars animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Animate progress bars when students section is visible
const studentsSection = document.querySelector('.students-section');
if (studentsSection) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.5 });

    progressObserver.observe(studentsSection);
}

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;

        // Add mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Course card hover effects
function enhanceCourseCards() {
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceFloatingCards();
    enhanceCourseCards();

    // Add initial animations to elements
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animation = `fadeIn 0.8s ease ${index * 0.2}s forwards`;
            el.style.opacity = '0';
        });
    }, 500);
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize scroll to top
createScrollToTop();

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Form validation (if needed)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });

    return isValid;
}

// Add loading states
function showLoading(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuklanmoqda...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    console.log('EduPlatform sayti yuklandi!');

    // Add any additional initialization here
    lazyLoadImages();
});