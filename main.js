// Educational Hub - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Search Functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // Simple search simulation - in a real app, this would search the database
                alert(`Searching for: ${query}`);
                // Redirect to courses page with search parameter
                window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
            }
        });

        // Allow Enter key to trigger search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Newsletter Signup
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Simulate signup - in a real app, this would send to server
                alert('Thank you for subscribing! You will receive our latest updates.');
                this.reset();
            }
        });
    }

    // User Account System (Simple localStorage implementation)
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            showSignupModal();
        });
    }

    // Load user data on page load
    loadUserData();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Accessibility: Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '1000';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '0 0 4px 4px';

    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
});

// User Account Functions
function showLoginModal() {
    const modal = createModal('Login', `
        <form id="login-form">
            <div class="form-group">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" required>
            </div>
            <div class="form-group">
                <label for="login-password">Password:</label>
                <input type="password" id="login-password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    `);

    const loginForm = modal.querySelector('#login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simple authentication simulation
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            updateUserInterface();
            modal.remove();
        } else {
            alert('Invalid email or password.');
        }
    });
}

function showSignupModal() {
    const modal = createModal('Sign Up', `
        <form id="signup-form">
            <div class="form-group">
                <label for="signup-name">Name:</label>
                <input type="text" id="signup-name" required>
            </div>
            <div class="form-group">
                <label for="signup-email">Email:</label>
                <input type="email" id="signup-email" required>
            </div>
            <div class="form-group">
                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" required>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    `);

    const signupForm = modal.querySelector('#signup-form');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simple user registration simulation
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            alert('User with this email already exists.');
        } else {
            const newUser = { name, email, password, enrolledCourses: [] };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            alert('Sign up successful!');
            updateUserInterface();
            modal.remove();
        }
    });
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${title}</h2>
            ${content}
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        position: relative;
    `;

    const closeBtn = modal.querySelector('.close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
    `;

    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    return modal;
}

function updateUserInterface() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (currentUser) {
        if (loginBtn) loginBtn.textContent = `Welcome, ${currentUser.name}`;
        if (signupBtn) signupBtn.textContent = 'Logout';
        if (signupBtn) {
            signupBtn.removeEventListener('click', showSignupModal);
            signupBtn.addEventListener('click', logout);
        }
    } else {
        if (loginBtn) loginBtn.textContent = 'Login';
        if (signupBtn) signupBtn.textContent = 'Sign Up';
        if (signupBtn) {
            signupBtn.removeEventListener('click', logout);
            signupBtn.addEventListener('click', showSignupModal);
        }
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateUserInterface();
    alert('Logged out successfully!');
}

function loadUserData() {
    updateUserInterface();
}

// Utility function for form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add modal styles dynamically
const modalStyles = `
    .modal .form-group {
        margin-bottom: 15px;
    }
    .modal label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .modal input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .modal button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .modal button:hover {
        background-color: #0056b3;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
