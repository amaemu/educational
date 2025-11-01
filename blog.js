// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Blog post data
    const blogPosts = [
        {
            id: 1,
            title: "The Future of Online Learning: Trends to Watch in 2024",
            excerpt: "As we move into 2024, online education continues to evolve at a rapid pace. From AI-powered personalized learning to immersive virtual reality classrooms, the landscape of digital education is transforming how we learn and teach.",
            category: "technology",
            date: "2023-11-15",
            author: "Dr. Sarah Johnson",
            image: "images/blog1.jpg",
            featured: true
        },
        {
            id: 2,
            title: "10 Proven Study Techniques for Better Retention",
            excerpt: "Effective study techniques can significantly improve your learning outcomes. Discover evidence-based methods that will help you retain information longer and perform better in your courses.",
            category: "learning-tips",
            date: "2023-11-10",
            author: "Prof. Michael Chen",
            image: "images/blog2.jpg",
            featured: false
        },
        {
            id: 3,
            title: "How to Transition into Tech: A Beginner's Guide",
            excerpt: "Thinking about switching to a career in technology? This comprehensive guide covers everything you need to know about making the transition, from choosing the right skills to landing your first job.",
            category: "career",
            date: "2023-11-05",
            author: "Emily Davis",
            image: "images/blog3.jpg",
            featured: false
        },
        {
            id: 4,
            title: "Essential Tools Every Data Scientist Should Know",
            excerpt: "Data science is a rapidly evolving field with new tools emerging regularly. Here are the essential tools and technologies that every aspiring data scientist should master.",
            category: "data-science",
            date: "2023-10-28",
            author: "Alex Rodriguez",
            image: "images/blog4.jpg",
            featured: false
        },
        {
            id: 5,
            title: "The Psychology Behind Great UX Design",
            excerpt: "User experience design is as much about psychology as it is about aesthetics. Understanding human behavior and cognitive processes is key to creating truly effective digital experiences.",
            category: "design",
            date: "2023-10-20",
            author: "Lisa Wang",
            image: "images/blog5.jpg",
            featured: false
        },
        {
            id: 6,
            title: "Building Better Habits for Lifelong Learning",
            excerpt: "Lifelong learning requires consistent habits and routines. Discover practical strategies for building a sustainable learning practice that fits into your busy lifestyle.",
            category: "productivity",
            date: "2023-10-15",
            author: "Carlos Rodriguez",
            image: "images/blog6.jpg",
            featured: false
        }
    ];

    // DOM elements
    const blogPostsContainer = document.querySelector('.blog-posts');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const sidebarNewsletter = document.getElementById('sidebar-newsletter');
    const mainNewsletter = document.getElementById('main-newsletter');

    // Initialize blog display
    displayBlogPosts(blogPosts);

    // Category filtering
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            const category = this.dataset.category;
            const filteredPosts = category === 'all' ? blogPosts : blogPosts.filter(post => post.category === category);
            displayBlogPosts(filteredPosts);
        });
    });

    // Newsletter subscriptions
    if (sidebarNewsletter) {
        sidebarNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup(this, 'sidebar');
        });
    }

    if (mainNewsletter) {
        mainNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup(this, 'main');
        });
    }

    // Tag cloud interaction
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagText = this.textContent.toLowerCase().replace(' ', '-');
            const filteredPosts = blogPosts.filter(post => post.category === tagText);
            displayBlogPosts(filteredPosts);
        });
    });

    function displayBlogPosts(postsToDisplay) {
        blogPostsContainer.innerHTML = '';

        postsToDisplay.forEach(post => {
            const postElement = createBlogPostElement(post);
            blogPostsContainer.appendChild(postElement);
        });
    }

    function createBlogPostElement(post) {
        const article = document.createElement('article');
        article.className = `blog-post${post.featured ? ' featured' : ''}`;

        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <div class="post-meta">
                    <span class="category">${capitalizeFirstLetter(post.category.replace('-', ' '))}</span>
                    <span class="date">${formatDate(post.date)}</span>
                    <span class="author">By ${post.author}</span>
                </div>
                <h${post.featured ? '2' : '3'}>${post.title}</h${post.featured ? '2' : '3'}>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more" data-post-id="${post.id}">Read More</a>
            </div>
        `;

        // Add event listener for read more
        const readMoreLink = article.querySelector('.read-more');
        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            showFullPost(post.id);
        });

        return article;
    }

    function showFullPost(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) return;

        // Create modal for full post
        const modal = document.createElement('div');
        modal.className = 'post-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <article class="full-post">
                    <img src="${post.image}" alt="${post.title}">
                    <div class="post-header">
                        <div class="post-meta">
                            <span class="category">${capitalizeFirstLetter(post.category.replace('-', ' '))}</span>
                            <span class="date">${formatDate(post.date)}</span>
                            <span class="author">By ${post.author}</span>
                        </div>
                        <h1>${post.title}</h1>
                    </div>
                    <div class="post-body">
                        <p>${post.excerpt}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h3>Key Takeaways</h3>
                        <ul>
                            <li>Understanding the fundamentals is crucial for success</li>
                            <li>Practice regularly to build proficiency</li>
                            <li>Stay updated with the latest trends and technologies</li>
                        </ul>
                    </div>
                </article>
            </div>
        `;

        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background-color: white;
            border-radius: 8px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            width: 100%;
        `;

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        `;

        // Add event listeners
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Add modal styles
        const modalStyles = `
            .full-post img {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 8px 8px 0 0;
            }
            .post-header {
                padding: 20px;
            }
            .post-body {
                padding: 0 20px 20px;
            }
            .post-body h3 {
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .post-body ul {
                margin-left: 20px;
            }
            .post-body li {
                margin-bottom: 5px;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);
    }

    function handleNewsletterSignup(form, location) {
        const email = form.querySelector('input[type="email"]').value;

        if (email) {
            // Simulate signup
            alert(`Thank you for subscribing! You'll receive our ${location} newsletter at ${email}.`);
            form.reset();
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
