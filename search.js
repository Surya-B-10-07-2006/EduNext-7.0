import { colleges } from './data.js';

class SearchManager {
    constructor() {
        this.colleges = colleges;
        this.searchInput = document.getElementById('college-search');
        this.locationFilter = document.getElementById('location-filter');
        this.naacFilter = document.getElementById('naac-filter');
        this.nbaFilter = document.getElementById('nba-filter');
        this.minFee = document.getElementById('min-fee');
        this.maxFee = document.getElementById('max-fee');
        this.collegesContainer = document.getElementById('colleges-container');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.searchInput.addEventListener('input', () => this.performSearch());
        this.locationFilter.addEventListener('change', () => this.performSearch());
        this.naacFilter.addEventListener('change', () => this.performSearch());
        this.nbaFilter.addEventListener('change', () => this.performSearch());
        this.minFee.addEventListener('input', () => this.performSearch());
        this.maxFee.addEventListener('input', () => this.performSearch());
    }

    performSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const location = this.locationFilter.value.toLowerCase();
        const naacGrade = this.naacFilter.value;
        const nbaAccredited = this.nbaFilter.value;
        const minFee = this.minFee.value ? parseInt(this.minFee.value) : 0;
        const maxFee = this.maxFee.value ? parseInt(this.maxFee.value) : Infinity;

        const filteredColleges = this.colleges.filter(college => {
            const matchesSearch = college.name.toLowerCase().includes(searchTerm) ||
                                college.location.toLowerCase().includes(searchTerm) ||
                                college.courses.some(course => course.toLowerCase().includes(searchTerm)) ||
                                college.description.toLowerCase().includes(searchTerm);

            const matchesLocation = !location || college.location.toLowerCase() === location;
            const matchesNaac = !naacGrade || college.naacGrade === naacGrade;
            const matchesNba = !nbaAccredited || 
                             (nbaAccredited === 'yes' && college.nbaAccredited) ||
                             (nbaAccredited === 'no' && !college.nbaAccredited);
            const matchesFee = college.feeRange.min >= minFee && college.feeRange.max <= maxFee;

            return matchesSearch && matchesLocation && matchesNaac && matchesNba && matchesFee;
        });

        this.renderColleges(filteredColleges);
    }

    renderColleges(colleges) {
        this.collegesContainer.innerHTML = '';

        if (colleges.length === 0) {
            this.collegesContainer.innerHTML = `
                <div class="no-results">
                    <h3>No colleges found matching your criteria</h3>
                    <p>Try adjusting your search filters</p>
                </div>
            `;
            return;
        }

        colleges.forEach(college => {
            const collegeCard = this.createCollegeCard(college);
            this.collegesContainer.appendChild(collegeCard);
        });
    }

    createCollegeCard(college) {
        const card = document.createElement('div');
        card.className = 'college-card';
        card.innerHTML = `
            <div class="college-image">
                <img src="${college.image}" alt="${college.name}" onerror="this.src='assets/images/default-college.jpg'">
                <div class="college-badge ${college.nbaAccredited ? 'nba-accredited' : ''}">
                    ${college.nbaAccredited ? 'NBA Accredited' : ''}
                </div>
            </div>
            <div class="college-info">
                <h3>${college.name}</h3>
                <div class="college-meta">
                    <span class="location"><i class="fas fa-map-marker-alt"></i> ${college.location}</span>
                    <span class="naac-grade"><i class="fas fa-award"></i> NAAC ${college.naacGrade}</span>
                </div>
                <div class="college-courses">
                    <h4>Courses Offered:</h4>
                    <ul>
                        ${college.courses.map(course => `<li>${course}</li>`).join('')}
                    </ul>
                </div>
                <div class="college-fees">
                    <h4>Fee Range:</h4>
                    <p>₹${college.feeRange.min.toLocaleString()} - ₹${college.feeRange.max.toLocaleString()}</p>
                </div>
                <div class="college-placement">
                    <h4>Placement Statistics:</h4>
                    <p>Average: ₹${college.placement.average} LPA</p>
                    <p>Highest: ₹${college.placement.highest} LPA</p>
                </div>
                <div class="college-actions">
                    <a href="${college.website}" target="_blank" class="btn btn-primary">Visit Website</a>
                    <button class="btn btn-secondary save-college" data-college-id="${college.id}">
                        <i class="fas fa-bookmark"></i> Save
                    </button>
                </div>
            </div>
        `;

        // Add event listener for save button
        const saveButton = card.querySelector('.save-college');
        saveButton.addEventListener('click', () => this.handleSaveCollege(college.id));

        return card;
    }

    handleSaveCollege(collegeId) {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to save colleges');
            return;
        }

        // Get saved colleges from localStorage
        let savedColleges = JSON.parse(localStorage.getItem('savedColleges')) || [];
        
        // Check if college is already saved
        if (savedColleges.includes(collegeId)) {
            savedColleges = savedColleges.filter(id => id !== collegeId);
            alert('College removed from saved list');
        } else {
            savedColleges.push(collegeId);
            alert('College saved successfully');
        }

        // Update localStorage
        localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
        
        // Update save button state
        const saveButton = document.querySelector(`.save-college[data-college-id="${collegeId}"]`);
        if (saveButton) {
            saveButton.classList.toggle('saved');
        }
    }
}

// Initialize search manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchManager();
}); 