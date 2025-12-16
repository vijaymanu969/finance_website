// SME Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const smeCards = document.querySelectorAll('.sme-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter cards
            smeCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardStatus = card.dataset.status;
                    if (cardStatus === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
            
            // Update count
            updateFilterCounts();
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        smeCards.forEach(card => {
            const companyName = card.querySelector('h3').textContent.toLowerCase();
            const sector = card.querySelector('.sme-card-sector span').textContent.toLowerCase();
            
            if (companyName.includes(searchTerm) || sector.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            // Reset to show all cards or current filter
            const activeFilter = document.querySelector('.filter-tab.active').dataset.filter;
            smeCards.forEach(card => {
                if (activeFilter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardStatus = card.dataset.status;
                    card.style.display = cardStatus === activeFilter ? 'block' : 'none';
                }
            });
        }
    });
    
    // Update filter counts
    function updateFilterCounts() {
        const allCount = smeCards.length;
        const openCount = document.querySelectorAll('[data-status="open"]').length;
        const upcomingCount = document.querySelectorAll('[data-status="upcoming"]').length;
        const closedCount = document.querySelectorAll('[data-status="closed"]').length;
        const listedCount = document.querySelectorAll('[data-status="listed"]').length;
        
        // Update count displays (if you want to show counts)
        const allTab = document.querySelector('[data-filter="all"] .count');
        if (allTab) {
            allTab.textContent = allCount;
        }
    }
    
    // View Details button functionality
    const viewDetailsBtns = document.querySelectorAll('.sme-card-actions .btn-primary');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.sme-card');
            const companyName = card.querySelector('h3').textContent;
            const company = card.dataset.company;
            
            // Here you would typically navigate to a detailed page
            // For now, we'll show an alert
            alert(`Viewing details for ${companyName}\n\nThis would navigate to a detailed IPO page with:\n- Company information\n- Financial details\n- Subscription data\n- Documents\n- Analysis`);
            
            // In a real application, you might do:
            // window.location.href = `sme-details.html?company=${company}`;
        });
    });
    
    // Initialize counts
    updateFilterCounts();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all SME cards for animation
    smeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});