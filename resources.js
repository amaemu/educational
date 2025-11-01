// Resources Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Resource data
    const resources = [
        {
            id: 1,
            title: "Introduction to Machine Learning",
            type: "article",
            description: "A comprehensive guide to understanding machine learning concepts and applications.",
            author: "Dr. Sarah Johnson",
            date: "2023-10-15",
            image: "images/resource1.jpg",
            downloadUrl: "#",
            tags: ["AI", "Machine Learning", "Technology"]
        },
        {
            id: 2,
            title: "Web Development Best Practices",
            type: "video",
            description: "Learn essential practices for building modern, accessible web applications.",
            author: "Mike Chen",
            date: "2023-09-28",
            image: "images/resource2.jpg",
            downloadUrl: "#",
            tags: ["Web Development", "Best Practices", "Frontend"]
        },
        {
            id: 3,
            title: "Data Science Handbook",
            type: "ebook",
            description: "Complete guide to data science methodologies and tools.",
            author: "Prof. Emily Davis",
            date: "2023-08-12",
            image: "images/resource3.jpg",
            downloadUrl: "#",
            tags: ["Data Science", "Analytics", "Python"]
        },
        {
            id: 4,
            title: "Digital Marketing Strategies",
            type: "article",
            description: "Effective strategies for online marketing and brand building.",
            author: "Alex Rodriguez",
            date: "2023-11-05",
            image: "images/resource4.jpg",
            downloadUrl: "#",
            tags: ["Marketing", "Digital", "Business"]
        },
        {
            id: 5,
            title: "UX Design Principles Tutorial",
            type: "video",
            description: "Master the fundamentals of user experience design.",
            author: "Lisa Wang",
            date: "2023-10-22",
            image: "images/resource5.jpg",
            downloadUrl: "#",
            tags: ["UX", "Design", "User Experience"]
        },
        {
            id: 6,
            title: "Python Programming Cheat Sheet",
            type: "download",
            description: "Quick reference guide for Python syntax and common operations.",
            author: "Educational Hub Team",
            date: "2023-09-15",
            image: "images/resource6.jpg",
            downloadUrl: "#",
            tags: ["Python", "Programming", "Cheat Sheet"]
        },
        {
            id: 7,
            title: "Cybersecurity Fundamentals",
            type: "article",
            description: "Essential knowledge for protecting digital assets and privacy.",
            author: "Security Expert Team",
            date: "2023-11-10",
            image: "images/resource7.jpg",
            downloadUrl: "#",
            tags: ["Security", "Cybersecurity", "Privacy"]
        },
        {
            id: 8,
            title: "Project Management Guide",
            type: "ebook",
            description: "Comprehensive guide to modern project management methodologies.",
            author: "Project Management Institute",
            date: "2023-07-30",
            image: "images/resource8.jpg",
            downloadUrl: "#",
            tags: ["Project Management", "Agile", "Leadership"]
        }
    ];

    // DOM elements
    const resourcesContainer = document.getElementById('resources-container');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const resourceSearchInput = document.getElementById('resource-search-input');
    const resourceSearchBtn = document.getElementById('resource-search-btn');
    const addCommentBtn = document.getElementById('add-comment-btn');
    const commentsSection = document.getElementById('comments-section');

    // Initialize resources display
    displayResources(resources);

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.dataset.category;
            const filteredResources = category === 'all' ? resources : resources.filter(resource => resource.type === category);
            displayResources(filteredResources);
        });
    });

    // Search functionality
    resourceSearchBtn.addEventListener('click', function() {
        const query = resourceSearchInput.value.trim().toLowerCase();
        if (query) {
            const searchedResources = resources.filter(resource =>
                resource.title.toLowerCase().includes(query) ||
                resource.description.toLowerCase().includes(query) ||
                resource.author.toLowerCase().includes(query) ||
                resource.tags.some(tag => tag.toLowerCase().includes(query))
            );
            displayResources(searchedResources);
        } else {
            displayResources(resources);
        }
    });

    // Allow Enter key to trigger search
    resourceSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            resourceSearchBtn.click();
        }
    });

    // Discussion forum functionality
    if (addCommentBtn) {
        addCommentBtn.addEventListener('click', function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Please log in to add comments.');
                return;
            }

            const comment = prompt('Enter your comment:');
            if (comment && comment.trim()) {
                addComment(currentUser.name, comment.trim());
            }
        });
    }

    // Load existing comments
    loadComments();

    function displayResources(resourcesToDisplay) {
        resourcesContainer.innerHTML = '';

        if (resourcesToDisplay.length === 0) {
            resourcesContainer.innerHTML = '<p>No resources found matching your criteria.</p>';
            return;
        }

        resourcesToDisplay.forEach(resource => {
            const resourceCard = createResourceCard(resource);
            resourcesContainer.appendChild(resourceCard);
        });
    }

    function createResourceCard(resource) {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <img src="${resource.image}" alt="${resource.title}">
            <div class="resource-content">
                <h3>${resource.title}</h3>
                <span class="resource-type">${capitalizeFirstLetter(resource.type)}</span>
                <p>${resource.description}</p>
                <div class="resource-meta">
                    <span class="author">By ${resource.author}</span>
                    <span class="date">${formatDate(resource.date)}</span>
                </div>
                <div class="resource-tags">
                    ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="download-btn" data-resource-id="${resource.id}">Download/View</button>
            </div>
        `;

        // Add event listener for download
        const downloadBtn = card.querySelector('.download-btn');
        downloadBtn.addEventListener('click', function() {
            downloadResource(resource.id);
        });

        return card;
    }

    function downloadResource(resourceId) {
        const resource = resources.find(r => r.id === resourceId);
        if (resource) {
            // Simulate download - in a real app, this would trigger actual download
            alert(`Downloading "${resource.title}"...`);
            // For demo purposes, just open in new tab
            window.open(resource.downloadUrl, '_blank');
        }
    }

    function addComment(author, text) {
        const comments = JSON.parse(localStorage.getItem('forumComments') || '[]');
        const newComment = {
            id: Date.now(),
            author: author,
            text: text,
            date: new Date().toISOString().split('T')[0]
        };
        comments.push(newComment);
        localStorage.setItem('forumComments', JSON.stringify(comments));
        loadComments();
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('forumComments') || '[]');
        commentsSection.innerHTML = '';

        if (comments.length === 0) {
            commentsSection.innerHTML = '<p>No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <strong>${comment.author}</strong>
                    <span class="comment-date">${formatDate(comment.date)}</span>
                </div>
                <p>${comment.text}</p>
            `;
            commentsSection.appendChild(commentElement);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
