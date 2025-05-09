// Authentication Module
const auth = {
    // User state
    currentUser: null,

    // Default avatar data URL
    defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRINGE0IDQgMCAwIDAtNCA0djIiPjwvcGF0aD48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiPjwvY2lyY2xlPjwvc3ZnPg==',

    // Initialize authentication
    init() {
        this.loadUserFromStorage();
        this.setupEventListeners();
        this.updateUI();
    },

    // Load user from localStorage
    loadUserFromStorage() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    },

    // Save user to localStorage
    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('user');
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => {
            this.showLoginModal();
        });

        // Signup button
        document.getElementById('signup-btn').addEventListener('click', () => {
            this.showSignupModal();
        });

        // Login form submission
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e.target);
        });

        // Signup form submission
        document.getElementById('signup-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(e.target);
        });

        // Profile picture upload
        document.getElementById('profile-pic-upload')?.addEventListener('change', (e) => {
            this.handleProfilePictureUpload(e.target.files[0]);
        });
    },

    // Show login modal
    showLoginModal() {
        const modal = document.getElementById('login-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        `;
        modal.classList.add('active');
    },

    // Show signup modal
    showSignupModal() {
        const modal = document.getElementById('signup-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Sign Up</h2>
                <form id="signup-form">
                    <div class="form-group">
                        <label for="signup-name">Full Name</label>
                        <input type="text" id="signup-name" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-password">Password</label>
                        <input type="password" id="signup-password" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-confirm-password">Confirm Password</label>
                        <input type="password" id="signup-confirm-password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
            </div>
        `;
        modal.classList.add('active');
    },

    // Handle login
    async handleLogin(form) {
        const email = form.querySelector('#login-email').value;
        const password = form.querySelector('#login-password').value;

        try {
            // In a real application, this would be an API call
            // For demo purposes, we'll simulate a successful login
            this.currentUser = {
                id: 1,
                name: 'Demo User',
                email: email,
                profilePicture: this.defaultAvatar
            };

            this.saveUserToStorage();
            this.updateUI();
            this.closeModal('login-modal');
            this.showNotification('Successfully logged in!');
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        }
    },

    // Handle signup
    async handleSignup(form) {
        const name = form.querySelector('#signup-name').value;
        const email = form.querySelector('#signup-email').value;
        const password = form.querySelector('#signup-password').value;
        const confirmPassword = form.querySelector('#signup-confirm-password').value;

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }

        try {
            // In a real application, this would be an API call
            // For demo purposes, we'll simulate a successful signup
            this.currentUser = {
                id: 1,
                name: name,
                email: email,
                profilePicture: this.defaultAvatar
            };

            this.saveUserToStorage();
            this.updateUI();
            this.closeModal('signup-modal');
            this.showNotification('Successfully signed up!');
        } catch (error) {
            this.showNotification('Signup failed. Please try again.', 'error');
        }
    },

    // Handle profile picture upload
    handleProfilePictureUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentUser.profilePicture = e.target.result;
            this.saveUserToStorage();
            this.updateUI();
            this.showNotification('Profile picture updated!');
        };
        reader.readAsDataURL(file);
    },

    // Update UI based on authentication state
    updateUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userProfile = document.querySelector('.user-profile');
        const profilePic = document.getElementById('profile-pic');
        const username = document.getElementById('username');

        if (this.currentUser) {
            authButtons.classList.add('hidden');
            userProfile.classList.remove('hidden');
            profilePic.src = this.currentUser.profilePicture;
            username.textContent = this.currentUser.name;
        } else {
            authButtons.classList.remove('hidden');
            userProfile.classList.add('hidden');
        }
    },

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    },

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Logout
    logout() {
        this.currentUser = null;
        this.saveUserToStorage();
        this.updateUI();
        this.showNotification('Successfully logged out!');
    }
};

// Initialize authentication when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
}); 