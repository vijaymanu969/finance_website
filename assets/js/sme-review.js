// SME Review JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample SME review data
    const smeReviewData = {
        'neptune-logitek': {
            title: 'Neptune Logitek Ltd',
            rating: '⭐⭐⭐⭐☆',
            recommendation: 'Subscribe',
            analysis: `
                <div class="review-content">
                    <div class="review-section">
                        <h4>Company Overview</h4>
                        <p>Neptune Logitek Ltd is a logistics and transportation company specializing in supply chain solutions for SME businesses.</p>
                    </div>
                    <div class="review-section">
                        <h4>Financial Highlights</h4>
                        <ul>
                            <li>Revenue growth of 35% CAGR over last 2 years</li>
                            <li>Strong client base in manufacturing sector</li>
                            <li>Expanding operations in tier-2 cities</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>SME Valuation</h4>
                        <p>The IPO is reasonably priced for an SME with good growth prospects and expanding market presence.</p>
                    </div>
                    <div class="review-section">
                        <h4>Risks</h4>
                        <ul>
                            <li>High dependence on fuel costs</li>
                            <li>Competition from larger logistics players</li>
                            <li>Regulatory changes in transportation sector</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>Recommendation</h4>
                        <p><strong>Subscribe:</strong> Good SME opportunity with reasonable valuation and growth potential.</p>
                    </div>
                </div>
            `
        },
        'exim-routes': {
            title: 'Exim Routes Ltd',
            rating: '⭐⭐⭐⭐⭐',
            recommendation: 'Strong Buy',
            analysis: `
                <div class="review-content">
                    <div class="review-section">
                        <h4>Company Overview</h4>
                        <p>Exim Routes Ltd is engaged in import-export facilitation services with strong presence in key trade corridors.</p>
                    </div>
                    <div class="review-section">
                        <h4>Key Strengths</h4>
                        <ul>
                            <li>Strong relationships with international traders</li>
                            <li>Digital platform for trade facilitation</li>
                            <li>Growing export business to emerging markets</li>
                        </ul>
                    </div>
                    <div class="review-section">
                        <h4>Financial Performance</h4>
                        <p>Consistent revenue growth with improving margins and strong cash flow generation.</p>
                    </div>
                    <div class="review-section">
                        <h4>Recommendation</h4>
                        <p><strong>Strong Buy:</strong> Excellent SME opportunity with strong fundamentals and growth prospects.</p>
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
        const rows = document.querySelectorAll('.sme-review-table tbody tr');
        
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
    const reviewRows = document.querySelectorAll('.sme-review-row');
    const modal = document.getElementById('smeReviewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    reviewRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const reviewBadge = this.querySelector('.review-badge');
            
            if (reviewBadge.classList.contains('not-available')) {
                modalTitle.textContent = 'SME Review Not Available';
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <p style="font-size: 16px; color: var(--gray);">Review for this SME IPO is not yet available.</p>
                        <p style="font-size: 14px; color: var(--gray);">Please check back later for detailed analysis.</p>
                    </div>
                `;
            } else if (smeReviewData[company]) {
                const review = smeReviewData[company];
                modalTitle.textContent = review.title + ' - SME IPO Review';
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
                modalTitle.textContent = 'SME IPO Review';
                modalBody.innerHTML = `
                    <div class="review-content">
                        <div class="review-section">
                            <h4>Review Coming Soon</h4>
                            <p>Detailed analysis and review for this SME IPO will be available shortly.</p>
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
        const tbody = document.querySelector('.sme-review-table tbody');
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