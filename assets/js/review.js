// IPO Review JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample review data
    const reviewData = {
        'icici': {
            title: 'ICICI Prudential Asset Management Co',
            rating: '⭐⭐⭐⭐☆',
            recommendation: 'Subscribe',
            analysis: `
                <div class="review-content">
                    <div class="review-section">
                        <h4>Company Overview</h4>
                        <p>ICICI Prudential Asset Management Company is one of India's leading asset management companies with a strong track record in mutual fund management.</p>
                    </div>
                    <div class="review-section">
                        <h4>Financial Highlights</h4>
                        <ul>
                            <li>Strong AUM growth of 15% CAGR over last 3 years</li>
                            <li>Consistent profitability with ROE of 25%+</li>
                            <li>Diversified product portfolio across equity and debt</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>Valuation</h4>
                        <p>The IPO is priced at 18-20x FY25E earnings, which appears reasonable given the company's market position and growth prospects.</p>
                    </div>
                    <div class="review-section">
                        <h4>Risks</h4>
                        <ul>
                            <li>Market volatility affecting AUM</li>
                            <li>Regulatory changes in mutual fund industry</li>
                            <li>Intense competition from other AMCs</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>Recommendation</h4>
                        <p><strong>Subscribe:</strong> Strong fundamentals, reasonable valuation, and growth prospects make this a good investment opportunity.</p>
                    </div>
                </div>
            `
        },
        'corona': {
            title: 'Corona Remedies Ltd',
            rating: '⭐⭐⭐⭐⭐',
            recommendation: 'Strong Buy',
            analysis: `
                <div class="review-content">
                    <div class="review-section">
                        <h4>Company Overview</h4>
                        <p>Corona Remedies is a pharmaceutical company specializing in generic medicines and API manufacturing with strong export presence.</p>
                    </div>
                    <div class="review-section">
                        <h4>Key Strengths</h4>
                        <ul>
                            <li>Strong R&D capabilities with 50+ products in pipeline</li>
                            <li>FDA approved manufacturing facilities</li>
                            <li>Growing export business to regulated markets</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>Financial Performance</h4>
                        <p>Revenue growth of 25% CAGR, improving margins, and strong cash generation make this an attractive investment.</p>
                    </div>
                    <div class="review-section">
                        <h4>Recommendation</h4>
                        <p><strong>Strong Buy:</strong> Excellent fundamentals, reasonable pricing, and strong growth prospects.</p>
                    </div>
                </div>
            `
        }
    };

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.review-table tbody tr');
        
        rows.forEach(row => {
            const companyName = row.querySelector('.company-cell strong').textContent.toLowerCase();
            if (companyName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Row click handlers
    const reviewRows = document.querySelectorAll('.review-row');
    const modal = document.getElementById('reviewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    reviewRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const reviewBadge = this.querySelector('.review-badge');
            
            if (reviewBadge.classList.contains('not-available')) {
                modalTitle.textContent = 'Review Not Available';
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <p style="font-size: 16px; color: var(--gray);">Review for this IPO is not yet available.</p>
                        <p style="font-size: 14px; color: var(--gray);">Please check back later for detailed analysis.</p>
                    </div>
                `;
            } else if (reviewData[company]) {
                const review = reviewData[company];
                modalTitle.textContent = review.title + ' - IPO Review';
                modalBody.innerHTML = `
                    <div class="review-header-info">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div>
                                <div style="font-size: 18px; margin-bottom: 4px;">${review.rating}</div>
                                <div style="font-size: 16px; font-weight: 600; color: var(--success);">${review.recommendation}</div>
                            </div>
                        </div>
                    </div>
                    ${review.analysis}
                `;
            } else {
                modalTitle.textContent = 'IPO Review';
                modalBody.innerHTML = `
                    <div class="review-content">
                        <div class="review-section">
                            <h4>Review Coming Soon</h4>
                            <p>Detailed analysis and review for this IPO will be available shortly.</p>
                        </div>
                    </div>
                `;
            }
            
            modal.classList.add('active');
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Table sorting
    const sortableHeaders = document.querySelectorAll('.sortable');
    let currentSort = { column: null, direction: 'asc' };
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.dataset.sort;
            const direction = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
            
            sortTable(column, direction);
            currentSort = { column, direction };
            
            // Update header indicators
            sortableHeaders.forEach(h => h.textContent = h.textContent.replace(' ↑', '').replace(' ↓', '') + ' ↕');
            this.textContent = this.textContent.replace(' ↕', '') + (direction === 'asc' ? ' ↑' : ' ↓');
        });
    });
    
    function sortTable(column, direction) {
        const tbody = document.querySelector('.review-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            switch(column) {
                case 'company':
                    aVal = a.querySelector('.company-cell strong').textContent;
                    bVal = b.querySelector('.company-cell strong').textContent;
                    break;
                case 'issue-size':
                    aVal = parseFloat(a.cells[4].textContent.replace('₹', '').replace(' Cr', '').replace(',', ''));
                    bVal = parseFloat(b.cells[4].textContent.replace('₹', '').replace(' Cr', '').replace(',', ''));
                    break;
                default:
                    aVal = a.cells[getColumnIndex(column)].textContent;
                    bVal = b.cells[getColumnIndex(column)].textContent;
            }
            
            if (typeof aVal === 'string') {
                return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            } else {
                return direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
        });
        
        rows.forEach(row => tbody.appendChild(row));
    }
    
    function getColumnIndex(column) {
        const headers = ['company', 'open', 'close', 'listing', 'issue-size', 'status', 'review'];
        return headers.indexOf(column);
    }
});