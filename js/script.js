// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Blog Category Filter
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button, .tab-button-modern');
    const blogItems = document.querySelectorAll('.blog-item, .blog-card');
    
    if (tabButtons.length > 0 && blogItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog items
                blogItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-question').classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    this.classList.add('active');
                    answer.classList.add('active');
                }
            });
        }
    });
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form, .contact-form-modern');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const name = contactForm.querySelector('#name');
            const phone = contactForm.querySelector('#phone');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            const privacy = contactForm.querySelector('input[name="privacy"]');
            const inquiryType = contactForm.querySelector('#inquiry-type');
            
            let isValid = true;
            
            // Clear previous error styles
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e0e0e0';
            });
            
            // Validate required fields
            if (!name.value.trim()) {
                name.style.borderColor = '#ff6b6b';
                isValid = false;
            }
            
            if (!phone.value.trim()) {
                phone.style.borderColor = '#ff6b6b';
                isValid = false;
            }
            
            if (!email.value.trim()) {
                email.style.borderColor = '#ff6b6b';
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                email.style.borderColor = '#ff6b6b';
                isValid = false;
                alert('正しいメールアドレスを入力してください。');
            }
            
            if (!message.value.trim()) {
                message.style.borderColor = '#ff6b6b';
                isValid = false;
            }
            
            if (!inquiryType.value) {
                inquiryType.style.borderColor = '#ff6b6b';
                isValid = false;
            }
            
            if (!privacy.checked) {
                alert('プライバシーポリシーに同意してください。');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('お問い合わせを受け付けました。後日担当者よりご連絡いたします。');
                contactForm.reset();
            } else {
                alert('必須項目を入力してください。');
            }
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]');
            
            if (email.value.trim() && isValidEmail(email.value)) {
                alert('メールマガジンの登録が完了しました。');
                email.value = '';
            } else {
                alert('正しいメールアドレスを入力してください。');
                email.focus();
            }
        });
    }
});

// Privacy Policy Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('privacy-modal');
    const privacyLink = document.querySelector('a[href="#privacy-modal"]');
    const closeBtn = document.querySelector('.close, .close-modern');
    
    if (modal && privacyLink && closeBtn) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or modal links
            if (href === '#' || href.includes('privacy-modal') || href.includes('privacy-policy')) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-item, .staff-member, .blog-item, .step, .point');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Loading state for forms
function showLoading(button) {
    button.disabled = true;
    button.textContent = '送信中...';
}

function hideLoading(button, originalText = '送信する') {
    button.disabled = false;
    button.textContent = originalText;
}

// Phone number formatting (Japanese format)
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^\d-]/g, '');
            
            // Basic formatting for Japanese phone numbers
            if (value.length >= 10) {
                value = value.replace(/(\d{2,4})(\d{2,4})(\d{4})/, '$1-$2-$3');
            }
            
            e.target.value = value;
        });
    });
});

// Print functionality (if needed)
function printPage() {
    window.print();
}

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1e3d6f';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#2c5aa0';
        this.style.transform = 'scale(1)';
    });
});