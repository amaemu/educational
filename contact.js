// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!validateContactForm(data)) {
                return;
            }

            // Simulate form submission
            console.log('Form submitted:', data);

            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');

            // Reset form
            this.reset();
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');

        // Initially hide answers
        answer.style.display = 'none';

        question.addEventListener('click', function() {
            // Toggle answer visibility
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                question.classList.add('active');
            } else {
                answer.style.display = 'none';
                question.classList.remove('active');
            }
        });

        // Add cursor pointer to questions
        question.style.cursor = 'pointer';
        question.style.userSelect = 'none';
    });
});

function validateContactForm(data) {
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showMessage('Please enter a valid name (at least 2 characters).', 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showMessage('Please enter a message with at least 10 characters.', 'error');
        return false;
    }

    return true;
}

function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;

    // Style the message
    messageElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    if (type === 'success') {
        messageElement.style.backgroundColor = '#28a745';
    } else {
        messageElement.style.backgroundColor = '#dc3545';
    }

    // Add to page
    document.body.appendChild(messageElement);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}
