// Courses Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Course data
    const courses = [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn HTML, CSS, and JavaScript to build modern websites.",
            image: "images/course1.jpg",
            duration: "4 weeks",
            level: "beginner",
            subject: "technology",
            format: "online",
            instructor: "John Doe"
        },
        {
            id: 2,
            title: "Data Science Essentials",
            description: "Explore data analysis, statistics, and machine learning basics.",
            image: "images/course2.jpg",
            duration: "6 weeks",
            level: "intermediate",
            subject: "technology",
            format: "online",
            instructor: "Jane Smith"
        },
        {
            id: 3,
            title: "Digital Marketing Mastery",
            description: "Master online marketing strategies, SEO, and social media.",
            image: "images/course3.jpg",
            duration: "5 weeks",
            level: "intermediate",
            subject: "business",
            format: "hybrid",
            instructor: "Mike Johnson"
        },
        {
            id: 4,
            title: "UX/UI Design Principles",
            description: "Learn user-centered design and create intuitive interfaces.",
            image: "images/course4.jpg",
            duration: "8 weeks",
            level: "beginner",
            subject: "design",
            format: "online",
            instructor: "Sarah Wilson"
        },
        {
            id: 5,
            title: "Introduction to Python",
            description: "Start your programming journey with Python fundamentals.",
            image: "images/course5.jpg",
            duration: "6 weeks",
            level: "beginner",
            subject: "technology",
            format: "online",
            instructor: "Alex Chen"
        },
        {
            id: 6,
            title: "Business Strategy and Management",
            description: "Develop strategic thinking and leadership skills.",
            image: "images/course6.jpg",
            duration: "10 weeks",
            level: "advanced",
            subject: "business",
            format: "in-person",
            instructor: "Emily Davis"
        },
        {
            id: 7,
            title: "Spanish for Beginners",
            description: "Learn basic Spanish conversation and grammar.",
            image: "images/course7.jpg",
            duration: "8 weeks",
            level: "beginner",
            subject: "language",
            format: "online",
            instructor: "Carlos Rodriguez"
        },
        {
            id: 8,
            title: "Advanced Physics Concepts",
            description: "Dive deep into quantum mechanics and relativity.",
            image: "images/course8.jpg",
            duration: "12 weeks",
            level: "advanced",
            subject: "science",
            format: "hybrid",
            instructor: "Dr. Robert Brown"
        }
    ];

    // DOM elements
    const coursesContainer = document.getElementById('courses-container');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const subjectFilter = document.getElementById('subject-filter');
    const levelFilter = document.getElementById('level-filter');
    const formatFilter = document.getElementById('format-filter');
    const startQuizBtn = document.getElementById('start-quiz');

    // Initialize courses display
    displayCourses(courses);

    // Filter functionality
    applyFiltersBtn.addEventListener('click', function() {
        const filteredCourses = filterCourses(courses);
        displayCourses(filteredCourses);
    });

    // Quiz functionality
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startCourseQuiz);
    }

    // Check for search parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchedCourses = searchCourses(courses, searchQuery);
        displayCourses(searchedCourses);
    }

    function displayCourses(coursesToDisplay) {
        coursesContainer.innerHTML = '';

        if (coursesToDisplay.length === 0) {
            coursesContainer.innerHTML = '<p>No courses found matching your criteria.</p>';
            return;
        }

        coursesToDisplay.forEach(course => {
            const courseCard = createCourseCard(course);
            coursesContainer.appendChild(courseCard);
        });
    }

    function createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <span class="duration">${course.duration}</span>
            <span class="level">${capitalizeFirstLetter(course.level)}</span>
            <span class="instructor">Instructor: ${course.instructor}</span>
            <button class="enroll-btn" data-course-id="${course.id}">Enroll Now</button>
        `;

        // Add event listener for enrollment
        const enrollBtn = card.querySelector('.enroll-btn');
        enrollBtn.addEventListener('click', function() {
            enrollInCourse(course.id);
        });

        return card;
    }

    function filterCourses(courses) {
        const subject = subjectFilter.value;
        const level = levelFilter.value;
        const format = formatFilter.value;

        return courses.filter(course => {
            return (!subject || course.subject === subject) &&
                   (!level || course.level === level) &&
                   (!format || course.format === format);
        });
    }

    function searchCourses(courses, query) {
        const lowerQuery = query.toLowerCase();
        return courses.filter(course =>
            course.title.toLowerCase().includes(lowerQuery) ||
            course.description.toLowerCase().includes(lowerQuery) ||
            course.instructor.toLowerCase().includes(lowerQuery)
        );
    }

    function enrollInCourse(courseId) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Please log in to enroll in courses.');
            return;
        }

        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        // Check if already enrolled
        if (currentUser.enrolledCourses && currentUser.enrolledCourses.includes(courseId)) {
            alert('You are already enrolled in this course.');
            return;
        }

        // Add to enrolled courses
        if (!currentUser.enrolledCourses) currentUser.enrolledCourses = [];
        currentUser.enrolledCourses.push(courseId);

        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        alert(`Successfully enrolled in "${course.title}"!`);
    }

    function startCourseQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const questions = [
            {
                question: "What is your current experience level?",
                options: ["Beginner", "Intermediate", "Advanced"],
                weights: { "Beginner": "beginner", "Intermediate": "intermediate", "Advanced": "advanced" }
            },
            {
                question: "Which subject interests you most?",
                options: ["Technology", "Business", "Design", "Science", "Language"],
                weights: { "Technology": "technology", "Business": "business", "Design": "design", "Science": "science", "Language": "language" }
            },
            {
                question: "How much time can you dedicate per week?",
                options: ["Less than 5 hours", "5-10 hours", "More than 10 hours"],
                weights: { "Less than 5 hours": "beginner", "5-10 hours": "intermediate", "More than 10 hours": "advanced" }
            }
        ];

        let currentQuestion = 0;
        let answers = {};

        function showQuestion() {
            if (currentQuestion < questions.length) {
                const q = questions[currentQuestion];
                quizContainer.innerHTML = `
                    <h3>${q.question}</h3>
                    ${q.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">${option}</button>
                    `).join('')}
                `;

                // Add event listeners to options
                const options = quizContainer.querySelectorAll('.quiz-option');
                options.forEach(option => {
                    option.addEventListener('click', function() {
                        const selectedOption = q.options[parseInt(this.dataset.index)];
                        answers[q.question] = q.weights[selectedOption];
                        currentQuestion++;
                        showQuestion();
                    });
                });
            } else {
                showRecommendation();
            }
        }

        function showRecommendation() {
            // Simple recommendation logic based on answers
            const level = answers["What is your current experience level?"] || "beginner";
            const subject = answers["Which subject interests you most?"] || "technology";

            const recommendedCourses = courses.filter(course =>
                course.level === level && course.subject === subject
            );

            let recommendationHTML = '<h3>Recommended Courses for You:</h3>';
            if (recommendedCourses.length > 0) {
                recommendationHTML += recommendedCourses.map(course => `
                    <div class="recommended-course">
                        <h4>${course.title}</h4>
                        <p>${course.description}</p>
                        <button class="enroll-btn" data-course-id="${course.id}">Enroll Now</button>
                    </div>
                `).join('');
            } else {
                recommendationHTML += '<p>No specific recommendations found. Check out all our courses!</p>';
            }

            recommendationHTML += '<button id="retake-quiz">Retake Quiz</button>';

            quizContainer.innerHTML = recommendationHTML;

            // Add event listeners for enroll buttons
            const enrollBtns = quizContainer.querySelectorAll('.enroll-btn');
            enrollBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    enrollInCourse(parseInt(this.dataset.courseId));
                });
            });

            // Add event listener for retake quiz
            const retakeBtn = document.getElementById('retake-quiz');
            retakeBtn.addEventListener('click', function() {
                currentQuestion = 0;
                answers = {};
                startCourseQuiz();
            });
        }

        showQuestion();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
