// Main Application Module
const app = {
    // Application state
    state: {
        theme: 'light',
        notifications: [],
        currentSection: 'home'
    },

    // Initialize application
    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.setupAuthListeners();
        this.renderScholarships();
        this.setupCourseCards();
        this.renderFeaturedColleges();
    },

    // Load theme from localStorage
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },

    // Set theme
    setTheme(theme) {
        document.body.className = `${theme}-theme`;
        this.state.theme = theme;
        localStorage.setItem('theme', theme);
    },

    // Setup event listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
                themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'light' ? 'moon' : 'sun'}"></i>`;
            });
        }

        // Notification button
        const notificationBtn = document.getElementById('notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.toggleNotifications();
            });
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    // Toggle notifications dropdown
    toggleNotifications() {
        const dropdown = document.querySelector('.notification-dropdown');
        dropdown.classList.toggle('active');
    },

    // Add notification
    addNotification(message, type = 'info') {
        this.state.notifications.unshift({
            id: Date.now(),
            message,
            type,
            read: false,
            timestamp: new Date()
        });
        this.updateNotificationBadge();
        this.renderNotifications();
    },

    // Update notification badge
    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        const unreadCount = this.state.notifications.filter(n => !n.read).length;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
    },

    // Render notifications
    renderNotifications() {
        const container = document.querySelector('.notification-dropdown');
        if (!container) return;

        if (this.state.notifications.length === 0) {
            container.innerHTML = '<p class="no-notifications">No notifications</p>';
            return;
        }

        container.innerHTML = this.state.notifications.map(notification => `
            <div class="notification-item ${notification.read ? 'read' : ''}" data-id="${notification.id}">
                <div class="notification-content">
                    <p>${notification.message}</p>
                    <small>${this.formatTimestamp(notification.timestamp)}</small>
                </div>
                ${!notification.read ? `
                    <button class="mark-read" onclick="app.markNotificationAsRead(${notification.id})">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
            </div>
        `).join('');
    },

    // Mark notification as read
    markNotificationAsRead(id) {
        const notification = this.state.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.updateNotificationBadge();
            this.renderNotifications();
        }
    },

    // Format timestamp
    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    },

    // Render scholarships
    renderScholarships() {
        const scholarshipIcons = [
            "fa-graduation-cap", // Post Matric Scholarship for SC/ST Students
            "fa-graduation-cap", // Post Matric Scholarship for BC/MBC/DNC Students
            "fa-university",     // Free Education Scheme for SC/ST Students
            "fa-university",     // Free Education Scheme for BC/MBC/DNC Students
            "fa-medal",          // Dr. Ambedkar Medhavi Scholarship
            "fa-female",         // EVR Nagammai Scholarship
            "fa-microscope",     // PhD Scholarship
            "fa-users",          // Children of Deceased Govt Servants
            "fa-wheelchair",     // Sons/Daughters of Differently-Abled
            "fa-wheelchair",     // Chief Minister's Special Scholarship
            "fa-tractor"         // Farmer's Children Scholarship
        ];

        const allScholarships = window.appData.scholarships;
        const tnScholarships = allScholarships.filter(s => s.category && s.category.toLowerCase().includes('tamil nadu'));
        const centralScholarships = allScholarships.filter(s => s.category && s.category.toLowerCase().includes('central'));
        renderScholarshipSection('tn-scholarships', tnScholarships, scholarshipIcons);
        renderScholarshipSection('central-scholarships', centralScholarships, scholarshipIcons);
    },

    // Show scholarship details
    showScholarshipDetails(id) {
        const scholarship = window.appData.scholarships.find(s => s.id === id);
        if (!scholarship) return;

        const modal = document.getElementById('scholarship-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-btn" onclick="app.closeModal('scholarship-modal')" title="Close">&times;</button>
                <div class="scholarship-details">
                    <div class="scholarship-header">
                        <i class="fas ${scholarship.icon || 'fa-graduation-cap'}"></i>
                        <h2>${scholarship.name}</h2>
                    </div>
                    <div class="scholarship-info">
                        <div class="info-section">
                            <h3>Eligibility</h3>
                            <p>${scholarship.eligibility && scholarship.eligibility.description ? scholarship.eligibility.description : 'N/A'}</p>
                        </div>
                        <div class="info-section">
                            <h3>Benefits</h3>
                            <p>${scholarship.benefits && scholarship.benefits.description ? scholarship.benefits.description : 'N/A'}</p>
                        </div>
                        <div class="info-section">
                            <h3>Application Process</h3>
                            <p>${scholarship.applicationProcess || 'N/A'}</p>
                        </div>
                        <div class="info-section">
                            <h3>Important Dates</h3>
                            <p>${scholarship.importantDates || 'N/A'}</p>
                        </div>
                        <div class="info-section">
                            <h3>Required Documents</h3>
                            <ul>
                                ${scholarship.requiredDocuments ? scholarship.requiredDocuments.map(doc => `<li>${doc}</li>`).join('') : '<li>N/A</li>'}
                            </ul>
                        </div>
                    </div>
                    <div class="scholarship-actions">
                        <a href="${scholarship.officialLink}" target="_blank" class="btn btn-primary">Visit Official Website</a>
                        <button class="btn btn-secondary" onclick="app.closeModal('scholarship-modal')">Close</button>
                    </div>
                </div>
            </div>
        `;
        modal.classList.add('active');
    },

    // Setup course cards
    setupCourseCards() {
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                const courseType = card.dataset.course;
                this.showCourseDetails(courseType);
            });
        });
    },

    // Show course details
    showCourseDetails(courseType) {
        const courseInfo = window.appData.courses.find(c => c.id === courseType);
        if (!courseInfo) return;

        const modal = document.getElementById('course-modal');
        if (!modal) {
            // Create modal if it doesn't exist
            const newModal = document.createElement('div');
            newModal.id = 'course-modal';
            newModal.className = 'modal';
            document.body.appendChild(newModal);
        }

        // Get colleges offering this course
        const collegesOffering = window.appData.colleges.filter(college => 
            college.courses.includes(courseInfo.name)
        );

        modal.innerHTML = `
            <div class="modal-content">
                <h2>${courseInfo.name} - ${courseInfo.fullName}</h2>
                <p>Duration: ${courseInfo.duration}</p>
                
                <div class="specializations-section">
                    <h3>Available Specializations:</h3>
                    <ul class="specializations-list">
                        ${courseInfo.specializations.map(spec => `
                            <li class="specialization-item" data-spec="${spec}">
                                ${spec}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="colleges-section">
                    <h3>Colleges Offering ${courseInfo.name}:</h3>
                    <div class="colleges-list">
                        ${collegesOffering.map(college => `
                            <div class="college-item">
                                <h4>${college.name}</h4>
                                <p>Location: ${college.location}</p>
                                <p>NAAC Grade: ${college.naacGrade}</p>
                                <a href="${college.website}" target="_blank" class="btn btn-primary">Visit Website</a>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button class="btn btn-secondary" onclick="app.closeModal('course-modal')">Close</button>
            </div>
        `;

        modal.classList.add('active');

        // Add click handlers for specializations
        document.querySelectorAll('.specialization-item').forEach(item => {
            item.addEventListener('click', () => {
                const spec = item.dataset.spec;
                this.showSpecializationDetails(courseType, spec);
            });
        });
    },

    // Show specialization details
    showSpecializationDetails(courseType, specialization) {
        const courseInfo = window.appData.courses.find(c => c.id === courseType);
        if (!courseInfo) return;

        const modal = document.getElementById('specialization-modal');
        if (!modal) {
            const newModal = document.createElement('div');
            newModal.id = 'specialization-modal';
            newModal.className = 'modal';
            document.body.appendChild(newModal);
        }

        // Get colleges offering this specialization
        const collegesOffering = window.appData.colleges.filter(college => 
            college.courses.includes(courseInfo.name) && 
            college.specializations && 
            college.specializations.includes(specialization)
        );

        modal.innerHTML = `
            <div class="modal-content">
                <h2>${specialization} - ${courseInfo.name}</h2>
                
                <div class="colleges-section">
                    <h3>Colleges Offering ${specialization}:</h3>
                    <div class="colleges-list">
                        ${collegesOffering.map(college => `
                            <div class="college-item">
                                <h4>${college.name}</h4>
                                <p>Location: ${college.location}</p>
                                <p>NAAC Grade: ${college.naacGrade}</p>
                                <p>Fee Range: ₹${college.feeRange.min.toLocaleString()} - ₹${college.feeRange.max.toLocaleString()}</p>
                                <a href="${college.website}" target="_blank" class="btn btn-primary">Visit Website</a>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button class="btn btn-secondary" onclick="app.closeModal('specialization-modal')">Close</button>
            </div>
        `;

        modal.classList.add('active');
    },

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    },

    // Render featured colleges
    renderFeaturedColleges() {
        // Try to get top 4 A++ colleges, fallback to A+ and A if not enough
        let featuredColleges = window.appData.colleges.filter(college => college.naacGrade === "A++");
        if (featuredColleges.length < 4) {
            featuredColleges = featuredColleges.concat(
                window.appData.colleges.filter(college => college.naacGrade === "A+" && !featuredColleges.includes(college))
            );
        }
        if (featuredColleges.length < 4) {
            featuredColleges = featuredColleges.concat(
                window.appData.colleges.filter(college => college.naacGrade === "A" && !featuredColleges.includes(college))
            );
        }
        featuredColleges = featuredColleges.slice(0, 4);

        const featuredContainer = document.getElementById('featured-colleges');
        if (featuredColleges.length === 0) {
            featuredContainer.innerHTML = '<p style="color:#888;">No featured colleges available.</p>';
            return;
        }
        featuredContainer.innerHTML = featuredColleges.map(college => `
            <div class="college-card">
                <div class="college-image">
                    ${
                        college.image
                            ? `<img src="${college.image}" alt="${college.name}" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';">`
                            : ''
                    }
                    <div class="college-icon" style="display:${college.image ? 'none' : 'flex'};">
                        <i class="fas fa-university"></i>
                    </div>
                </div>
                <div class="college-info">
                    <h3>${college.name}</h3>
                    <p>${college.location}</p>
                    <div class="college-actions">
                        <a href="${college.website}" target="_blank" class="btn btn-primary">Visit Website</a>
                    </div>
                </div>
            </div>
        `).join('');
    },

    showCollegeDetails(college) {
        const modal = document.getElementById('college-modal');
        modal.innerHTML = `
            <div class="college-modal-content">
                <button class="close-btn" onclick="app.closeCollegeModal()" title="Close">&times;</button>
                <h2>${college.name}</h2>
                <div class="college-detail-row">📚 <b>NAAC:</b> ${college.naacGrade ? college.naacGrade : 'N/A'}</div>
                <div class="college-detail-row">💰 <b>Fees:</b> ${college.feeRange && college.feeRange.min ? '₹' + college.feeRange.min.toLocaleString() : 'N/A'}</div>
                <div class="college-detail-row">✅ <b>NBA Accredited:</b> ${college.nbaAccredited ? 'Yes' : 'No'}</div>
                <div class="college-detail-row"><a href="${college.website}" target="_blank">Visit Website</a></div>
            </div>
        `;
        modal.classList.add('active');
    },

    closeCollegeModal() {
        const modal = document.getElementById('college-modal');
        modal.classList.remove('active');
        modal.innerHTML = '';
    },

    // Show login modal
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        modal.classList.add('active');
        document.getElementById('login-email').focus();
    },

    // Show signup modal
    showSignupModal() {
        const modal = document.getElementById('signup-modal');
        modal.classList.add('active');
        document.getElementById('signup-name').focus();
    },

    // Handle login form submission
    handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember').checked;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, remember });
        
        // For demo purposes, show success message
        this.addNotification('Successfully logged in!', 'success');
        this.closeModal('login-modal');
    },

    // Handle signup form submission
    handleSignup(event) {
        event.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const terms = document.getElementById('terms').checked;

        if (password !== confirmPassword) {
            this.addNotification('Passwords do not match!', 'error');
            return;
        }

        if (!terms) {
            this.addNotification('Please accept the terms and conditions', 'error');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Signup attempt:', { name, email, password, terms });
        
        // For demo purposes, show success message
        this.addNotification('Account created successfully!', 'success');
        this.closeModal('signup-modal');
    },

    // Setup authentication event listeners
    setupAuthListeners() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Add click handlers for social login buttons
        document.querySelectorAll('.btn-social').forEach(btn => {
            btn.addEventListener('click', () => {
                const provider = btn.classList.contains('btn-google') ? 'Google' : 'Facebook';
                this.addNotification(`${provider} login coming soon!`, 'info');
            });
        });
    }
};

function renderScholarshipSection(containerId, scholarships, icons) {
    const container = document.getElementById(containerId);
    if (!scholarships || scholarships.length === 0) {
        container.innerHTML = '<p style="color:#888;">No scholarships available in this category.</p>';
        return;
    }
    container.innerHTML = scholarships.map((sch, idx) => `
        <div class="scholarship-card" onclick="app.showScholarshipDetails(${sch.id})">
            <div class="scholarship-icon">
                <i class="fas ${icons[idx % icons.length]}"></i>
            </div>
            <div class="scholarship-content">
                <h3 class="scholarship-title">${sch.name}</h3>
                <p class="scholarship-category">${sch.category || 'General'}</p>
                <div class="scholarship-preview">
                    <p>${sch.eligibility && sch.eligibility.description ? sch.eligibility.description.substring(0, 100) + '...' : 'Click to view details'}</p>
                </div>
            </div>
            <div class="scholarship-arrow">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    `).join('');
}

// Autocomplete for college and exam search
function setupAutocomplete() {
    const input = document.getElementById('college-search');
    const list = document.getElementById('autocomplete-list');
    const colleges = window.appData.colleges || [];
    const exams = topExams || [];

    input.addEventListener('input', function() {
        const val = this.value.trim().toLowerCase();
        list.innerHTML = '';
        if (!val) {
            list.style.display = 'none';
            return;
        }

        // Search in colleges
        const collegeMatches = colleges.filter(col => col.name.toLowerCase().includes(val));
        // Search in exams
        const examMatches = exams.filter(exam => exam.name.toLowerCase().includes(val));

        if (collegeMatches.length === 0 && examMatches.length === 0) {
            list.style.display = 'none';
            return;
        }

        let html = '';

        // Add exam results first
        if (examMatches.length > 0) {
            html += '<div class="autocomplete-section">Exams</div>';
            html += examMatches.map(exam => `
                <div class="autocomplete-item exam-item">
                    <div class="autocomplete-content">
                        <span class="exam-autocomplete-name" data-id="${exam.name}">${exam.name}</span>
                        <span class="exam-autocomplete-mode">${exam.mode}</span>
                    </div>
                    <div class="autocomplete-actions">
                        <span class="exam-autocomplete-purpose">${exam.purpose}</span>
                        <a href="${exam.website}" target="_blank" class="autocomplete-link" title="Visit Website">
                            <i class="fas fa-link"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        }

        // Add college results
        if (collegeMatches.length > 0) {
            html += '<div class="autocomplete-section">Colleges</div>';
            html += collegeMatches.map(col => `
                <div class="autocomplete-item college-item">
                    <div class="autocomplete-content">
                        <span class="college-autocomplete-name" data-id="${col.id || ''}">${col.name}</span>
                        <span class="college-autocomplete-location">${col.location}</span>
                    </div>
                    <div class="autocomplete-actions">
                        <span class="college-autocomplete-grade">${col.naacGrade || ''}</span>
                        <a href="${col.website}" target="_blank" class="autocomplete-link" title="Visit Website">
                            <i class="fas fa-link"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        }

        list.innerHTML = html;
        list.style.display = 'block';

        // Add click event for college items
        document.querySelectorAll('.college-autocomplete-name').forEach((item, idx) => {
            item.addEventListener('mousedown', function(e) {
                e.preventDefault();
                input.value = collegeMatches[idx].name;
                list.innerHTML = '';
                list.style.display = 'none';
                app.showCollegeDetails(collegeMatches[idx]);
            });
        });

        // Add click event for exam items
        document.querySelectorAll('.exam-autocomplete-name').forEach((item, idx) => {
            item.addEventListener('mousedown', function(e) {
                e.preventDefault();
                input.value = examMatches[idx].name;
                list.innerHTML = '';
                list.style.display = 'none';
                showExamDetails(examMatches[idx]);
            });
        });
    });

    // Hide list on blur
    input.addEventListener('blur', function() {
        setTimeout(() => {
            list.innerHTML = '';
            list.style.display = 'none';
        }, 150);
    });
}

// Function to show exam details
function showExamDetails(exam) {
    const modal = document.getElementById('exam-modal');
    if (!modal) {
        const newModal = document.createElement('div');
        newModal.id = 'exam-modal';
        newModal.className = 'modal';
        document.body.appendChild(newModal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="app.closeModal('exam-modal')" title="Close">&times;</button>
            <div class="exam-details">
                <div class="exam-header">
                    <img src="${exam.logo}" alt="${exam.name} logo" class="exam-logo" onerror="this.style.display='none'">
                    <h2>${exam.name}</h2>
                </div>
                <div class="exam-info">
                    <div class="info-row">
                        <span class="label">Mode:</span>
                        <span class="value">${exam.mode}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Purpose:</span>
                        <span class="value">${exam.purpose}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Conducted by:</span>
                        <span class="value">${exam.conductedBy}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Exam Date:</span>
                        <span class="value">${exam.examDate}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Subjects:</span>
                        <span class="value">${exam.subjects}</span>
                    </div>
                    ${exam.eligibility ? `
                        <div class="info-row">
                            <span class="label">Eligibility:</span>
                            <span class="value">${exam.eligibility}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="exam-actions">
                    <a href="${exam.website}" target="_blank" class="btn btn-primary">Visit Official Website</a>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// Top Engineering Entrance Exams Data
const topExams = [
    {
        name: 'JEE Main',
        logo: 'assets/exams/jee-main.png',
        mode: 'CBT',
        purpose: 'NITs, IIITs, CFTIs',
        conductedBy: 'National Testing Agency (NTA)',
        examDate: '2025',
        subjects: 'Physics, Chemistry, Maths',
        eligibility: '',
        website: 'https://jeemain.nta.nic.in',
    },
    {
        name: 'JEE Advanced',
        logo: 'assets/exams/jee-advanced.png',
        mode: 'CBT',
        purpose: 'IITs (via JEE Main top 2.5 lakh)',
        conductedBy: 'IIT Kanpur (2025)',
        examDate: '2025',
        subjects: 'Physics, Chemistry, Maths',
        eligibility: '',
        website: 'https://jeeadv.ac.in',
    },
    {
        name: 'BITSAT',
        logo: 'assets/exams/bitsat.png',
        mode: 'CBT',
        purpose: 'BITS Pilani, Goa, Hyderabad',
        conductedBy: 'Birla Institute of Technology and Science (BITS)',
        examDate: '2025',
        subjects: 'PCM, English, Reasoning',
        eligibility: '',
        website: 'https://www.bitsadmission.com',
    },
    {
        name: 'VITEEE',
        logo: 'assets/exams/viteee.png',
        mode: 'CBT',
        purpose: 'VIT Vellore, Chennai, Bhopal, AP',
        conductedBy: 'Vellore Institute of Technology (VIT)',
        examDate: '2025',
        subjects: 'PCM/Biology, English',
        eligibility: '',
        website: 'https://viteee.vit.ac.in',
    },
    {
        name: 'SRMJEEE',
        logo: 'assets/exams/srmjeee.png',
        mode: 'Remote',
        purpose: 'SRM campuses (Chennai, etc.)',
        conductedBy: 'SRMIST',
        examDate: '2025',
        subjects: 'PCM/Biology, Aptitude',
        eligibility: '',
        website: 'https://www.srmist.edu.in',
    },
    {
        name: 'COMEDK UGET',
        logo: 'assets/exams/comedk.png',
        mode: 'CBT',
        purpose: 'Karnataka Engineering Colleges',
        conductedBy: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka (COMEDK)',
        examDate: '2025',
        subjects: 'Physics, Chemistry, Maths',
        eligibility: '',
        website: 'https://www.comedk.org',
    },
    {
        name: 'WBJEE',
        logo: 'assets/exams/wbjee.png',
        mode: 'Offline',
        purpose: 'West Bengal Engineering Colleges',
        conductedBy: 'West Bengal Joint Entrance Examinations Board',
        examDate: '2025',
        subjects: 'Maths, Physics, Chemistry',
        eligibility: '',
        website: 'https://wbjeeb.nic.in',
    },
    {
        name: 'MHT CET',
        logo: 'assets/exams/mhtcet.png',
        mode: 'CBT',
        purpose: 'Maharashtra Engineering Colleges',
        conductedBy: 'State Common Entrance Test Cell, Maharashtra',
        examDate: '2025',
        subjects: 'Physics, Chemistry, Maths',
        eligibility: '',
        website: 'https://cetcell.mahacet.org',
    },
    {
        name: 'AP EAMCET',
        logo: 'assets/exams/apeamcet.png',
        mode: 'CBT',
        purpose: 'Andhra Pradesh Colleges',
        conductedBy: 'Jawaharlal Nehru Technological University (JNTU), Kakinada',
        examDate: '2025',
        subjects: 'Maths, Physics, Chemistry',
        eligibility: '',
        website: 'https://cets.apsche.ap.gov.in',
    },
    {
        name: 'TS EAMCET',
        logo: 'assets/exams/tseamcet.png',
        mode: 'CBT',
        purpose: 'Telangana Colleges',
        conductedBy: 'Jawaharlal Nehru Technological University (JNTU), Hyderabad',
        examDate: '2025',
        subjects: 'Maths, Physics, Chemistry',
        eligibility: '',
        website: 'https://eamcet.tsche.ac.in',
    },
    {
        name: 'KEAM',
        logo: 'assets/exams/keam.png',
        mode: 'OMR',
        purpose: 'Kerala Colleges',
        conductedBy: 'Commissioner for Entrance Examinations (CEE), Kerala',
        examDate: '2025',
        subjects: 'Maths, Physics, Chemistry',
        eligibility: '',
        website: 'https://cee.kerala.gov.in',
    },
    {
        name: 'AMUEEE',
        logo: 'assets/exams/amueee.png',
        mode: 'Offline',
        purpose: 'Aligarh Muslim University',
        conductedBy: 'Aligarh Muslim University (AMU)',
        examDate: '2025',
        subjects: 'Maths, Physics, Chemistry',
        eligibility: '',
        website: 'https://www.amucontrollerexams.com',
    },
    {
        name: 'IIST Admission',
        logo: 'assets/exams/iist.png',
        mode: 'JEE Adv Based',
        purpose: 'Indian Institute of Space Science & Tech',
        conductedBy: 'IIST',
        examDate: '2025',
        subjects: 'PCM',
        eligibility: '',
        website: 'https://www.iist.ac.in',
    },
    {
        name: 'ISI Admission',
        logo: 'assets/exams/isi.png',
        mode: 'Offline',
        purpose: 'Indian Statistical Institute',
        conductedBy: 'Indian Statistical Institute (ISI)',
        examDate: '2025',
        subjects: 'Maths, Reasoning',
        eligibility: '',
        website: 'https://www.isical.ac.in',
    }
];

function renderTopExams() {
    const grid = document.querySelector('.exams-grid');
    if (!grid) return;
    grid.innerHTML = topExams.map(exam => `
        <div class="exam-card">
            <div class="exam-logo">
                <img src="${exam.logo}" alt="${exam.name} logo" onerror="this.style.display='none'">
            </div>
            <span class="exam-mode">${exam.mode}</span>
            <div class="exam-title">${exam.name}</div>
            <div class="exam-section"><strong>Purpose:</strong> ${exam.purpose}</div>
            <div class="exam-section"><strong>Conducted by:</strong> ${exam.conductedBy}</div>
            <div class="exam-section"><strong>Exam Date:</strong> ${exam.examDate}</div>
            <div class="exam-section"><strong>Subjects:</strong> ${exam.subjects}</div>
            ${exam.eligibility ? `<div class="exam-section"><strong>Eligibility:</strong> ${exam.eligibility}</div>` : ''}
            <a href="${exam.website}" class="exam-link" target="_blank">Official Website <i class="fas fa-arrow-right"></i></a>
        </div>
    `).join('');
}

// Add profile dropdown functionality
function setupProfileDropdown() {
    const userProfile = document.querySelector('.user-profile');
    if (!userProfile) return;

    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.querySelector('.profile-dropdown');
        
        if (dropdown) {
            dropdown.remove();
        } else {
            const newDropdown = document.createElement('div');
            newDropdown.className = 'profile-dropdown';
            newDropdown.innerHTML = `
                <a href="#" class="profile-link">
                    <i class="fas fa-user"></i> Profile
                </a>
                <a href="#" class="profile-link">
                    <i class="fas fa-cog"></i> Settings
                </a>
                <a href="#" class="profile-link" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            `;
            userProfile.appendChild(newDropdown);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        const dropdown = document.querySelector('.profile-dropdown');
        if (dropdown) {
            dropdown.remove();
        }
    });
}

// Update user profile display
function updateUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    const authButtons = document.querySelector('.auth-buttons');
    const username = document.getElementById('username');
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
        userProfile.classList.remove('hidden');
        authButtons.classList.add('hidden');
        username.textContent = localStorage.getItem('userName') || 'User';
    } else {
        userProfile.classList.add('hidden');
        authButtons.classList.remove('hidden');
    }
}

// Add logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}

function setupCutoffCalculator() {
    const form = document.getElementById('cutoff-form');
    const resultDiv = document.getElementById('cutoff-result');
    const clearBtn = document.getElementById('clear-cutoff');
    if (!form) return;

    // Define cutoff ranges and colleges
    const cutoffRanges = [
        {
            min: 190, max: 200, colleges: [
                "College of Engineering, Guindy (CEG), Anna University, Chennai",
                "PSG College of Technology, Coimbatore",
                "SSN College of Engineering, Kalavakkam",
                "Thiagarajar College of Engineering (TCE), Madurai",
                "Coimbatore Institute of Technology (CIT), Coimbatore"
            ]
        },
        {
            min: 170, max: 189, colleges: [
                "Kumaraguru College of Technology, Coimbatore",
                "Sri Sivasubramaniya Nadar (SSN) College – Non-CSE branches",
                "Velammal Engineering College, Chennai",
                "Government College of Technology (GCT), Coimbatore",
                "Sri Venkateswara College of Engineering (SVCE), Sriperumbudur"
            ]
        },
        {
            min: 150, max: 169, colleges: [
                "Meenakshi Sundararajan Engineering College, Chennai",
                "Rajalakshmi Engineering College, Chennai",
                "Panimalar Engineering College, Chennai",
                "Kongu Engineering College, Erode",
                "St. Joseph's College of Engineering, Chennai"
            ]
        },
        {
            min: 130, max: 149, colleges: [
                "Sri Krishna College of Engineering & Technology, Coimbatore",
                "Dr. Mahalingam College of Engineering, Pollachi",
                "K.L.N. College of Engineering, Sivagangai",
                "Sona College of Technology, Salem",
                "Adhiyamaan College of Engineering, Hosur"
            ]
        },
        {
            min: 100, max: 129, colleges: [
                "Karpagam College of Engineering, Coimbatore",
                "Bannari Amman Institute of Technology, Erode",
                "Sri Ramakrishna Engineering College, Coimbatore",
                "Jansons Institute of Technology, Coimbatore",
                "SNS College of Technology, Coimbatore"
            ]
        }
    ];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const physics = parseFloat(document.getElementById('physics-mark').value) || 0;
        const chemistry = parseFloat(document.getElementById('chemistry-mark').value) || 0;
        const maths = parseFloat(document.getElementById('maths-mark').value) || 0;

        if (
            physics < 0 || physics > 100 ||
            chemistry < 0 || chemistry > 100 ||
            maths < 0 || maths > 100
        ) {
            resultDiv.innerHTML = '<span style="color:red;">Please enter valid marks (0-100) for all subjects.</span>';
            return;
        }

        const cutoff = maths + (physics / 2) + (chemistry / 2);

        // Find the matching range
        const range = cutoffRanges.find(r => cutoff >= r.min && cutoff <= r.max);

        let eligibleHtml = '';
        if (range) {
            eligibleHtml = `
                <h4>🎓 Eligible Colleges for Cutoff ${range.min} – ${range.max}:</h4>
                <ul class="eligible-colleges-list">
                    ${range.colleges.map(college => `<li>${college}</li>`).join('')}
                </ul>
            `;
        } else {
            eligibleHtml = `<p style="color:#e74c3c;">No colleges matched your cutoff. Try private/self-financing colleges or management quota.</p>`;
        }

        resultDiv.innerHTML = `
            <div class="cutoff-output">
                <h3>🎯 Your Cutoff: <span>${cutoff.toFixed(2)} / 200</span></h3>
                ${eligibleHtml}
            </div>
        `;
    });

    // Add clear button logic
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('physics-mark').value = '';
            document.getElementById('chemistry-mark').value = '';
            document.getElementById('maths-mark').value = '';
            resultDiv.innerHTML = '';
        });
    }
}

function setupCollegeComparison() {
    const colleges = window.appData.colleges || [];
    const select1 = document.getElementById('college-select-1');
    const select2 = document.getElementById('college-select-2');
    const tableDiv = document.getElementById('college-comparison-table');
    const clearBtn = document.getElementById('clear-compare');

    // Populate dropdowns
    function populateDropdowns() {
        [select1, select2].forEach(select => {
            select.innerHTML = '<option value="">Select College</option>' +
                colleges.map(col => `<option value="${col.id}">${col.name}</option>`).join('');
        });
    }

    // Render comparison table
    function renderComparison() {
        const id1 = select1.value;
        const id2 = select2.value;
        if (!id1 || !id2 || id1 === id2) {
            tableDiv.innerHTML = '<p style="color:#888;">Select two different colleges to compare.</p>';
            return;
        }
        const col1 = colleges.find(c => c.id == id1);
        const col2 = colleges.find(c => c.id == id2);
        if (!col1 || !col2) return;

        tableDiv.innerHTML = `
            <table class="comparison-table">
                <tr>
                    <th>Feature</th>
                    <th>${col1.name}</th>
                    <th>${col2.name}</th>
                </tr>
                <tr>
                    <td>NBA Accredited</td>
                    <td>${col1.nbaAccredited ? '✅' : '❌'}</td>
                    <td>${col2.nbaAccredited ? '✅' : '❌'}</td>
                </tr>
                <tr>
                    <td>NAAC Grade</td>
                    <td>${col1.naacGrade || '-'}</td>
                    <td>${col2.naacGrade || '-'}</td>
                </tr>
                <tr>
                    <td>Fee Range</td>
                    <td>₹${col1.feeRange ? `${col1.feeRange.min} - ${col1.feeRange.max}` : '-'}</td>
                    <td>₹${col2.feeRange ? `${col2.feeRange.min} - ${col2.feeRange.max}` : '-'}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>${col1.location || '-'}</td>
                    <td>${col2.location || '-'}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td><a href="${col1.website}" target="_blank">Visit</a></td>
                    <td><a href="${col2.website}" target="_blank">Visit</a></td>
                </tr>
            </table>
        `;
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            select1.value = '';
            select2.value = '';
            tableDiv.innerHTML = '<p style="color:#888;">Select two different colleges to compare.</p>';
        });
    }

    select1.addEventListener('change', renderComparison);
    select2.addEventListener('change', renderComparison);

    populateDropdowns();
}

// Profile picture upload logic
function setupProfilePictureUpload() {
    const fileInput = document.getElementById('profile-pic-upload');
    const profilePic = document.getElementById('profile-pic');
    if (!fileInput || !profilePic) return;

    // Load from localStorage if available
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        profilePic.src = savedPic;
    }

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

// Initialize application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    setupAutocomplete();
    updateUserProfile();
    setupProfileDropdown();
    renderTopExams();
    setupCutoffCalculator();
    setupCollegeComparison();
    setupProfilePictureUpload();
}); 