// Mainboard GMP JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample GMP trend data
    const gmpTrendData = {
        'corona-remedies': {
            title: 'Corona Remedies Ltd',
            currentGMP: '₹342.5',
            percentage: '32.25%',
            trend: 'Bullish',
            details: `
                <div class="gmp-trend-details">
                    <div class="gmp-summary">
                        <h4>GMP Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Current GMP:</span>
                                <span class="value highlight positive">₹342.5 (32.25%)</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">IPO Price:</span>
                                <span class="value">₹1,062</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Expected Listing Price:</span>
                                <span class="value">₹1,404.5</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Trend:</span>
                                <span class="value positive">Bullish</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="gmp-history">
                        <h4>GMP History (Last 7 Days)</h4>
                        <div class="history-table">
                            <table>
                                <tr>
                                    <td>16 Dec 2025</td>
                                    <td>₹342.5</td>
                                    <td class="positive">+32.25%</td>
                                </tr>
                                <tr>
                                    <td>15 Dec 2025</td>
                                    <td>₹335.0</td>
                                    <td class="positive">+31.54%</td>
                                </tr>
                                <tr>
                                    <td>14 Dec 2025</td>
                                    <td>₹328.5</td>
                                    <td class="positive">+30.93%</td>
                                </tr>
                                <tr>
                                    <td>13 Dec 2025</td>
                                    <td>₹320.0</td>
                                    <td class="positive">+30.13%</td>
                                </tr>
                                <tr>
                                    <td>12 Dec 2025</td>
                                    <td>₹315.0</td>
                                    <td class="positive">+29.66%</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="gmp-analysis">
                        <h4>GMP Analysis</h4>
                        <p>Corona Remedies Ltd is showing strong GMP performance with consistent upward trend. The pharmaceutical sector outlook and company fundamentals are driving positive sentiment in the grey market.</p>
                        <div class="risk-note">
                            <strong>Note:</strong> GMP is indicative and actual listing price may vary based on market conditions.
                        </div>
                    </div>
                </div>
            `
        },
        'meesho': {
            title: 'Meesho Ltd',
            currentGMP: '₹42',
            percentage: '37.84%',
            trend: 'Very Bullish',
            details: `
                <div class="gmp-trend-details">
                    <div class="gmp-summary">
                        <h4>GMP Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Current GMP:</span>
                                <span class="value highlight positive">₹42 (37.84%)</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">IPO Price:</span>
                                <span class="value">₹111</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Expected Listing Price:</span>
                                <span class="value">₹153</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Trend:</span>
                                <span class="value positive">Very Bullish</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="gmp-history">
                        <h4>GMP History (Last 7 Days)</h4>
                        <div class="history-table">
                            <table>
                                <tr>
                                    <td>16 Dec 2025</td>
                                    <td>₹42</td>
                                    <td class="positive">+37.84%</td>
                                </tr>
                                <tr>
                                    <td>15 Dec 2025</td>
                                    <td>₹40</td>
                                    <td class="positive">+36.04%</td>
                                </tr>
                                <tr>
                                    <td>14 Dec 2025</td>
                                    <td>₹38</td>
                                    <td class="positive">+34.23%</td>
                                </tr>
                                <tr>
                                    <td>13 Dec 2025</td>
                                    <td>₹35</td>
                                    <td class="positive">+31.53%</td>
                                </tr>
                                <tr>
                                    <td>12 Dec 2025</td>
                                    <td>₹32</td>
                                    <td class="positive">+28.83%</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="gmp-analysis">
                        <h4>GMP Analysis</h4>
                        <p>Meesho Ltd is showing exceptional GMP performance with the highest premium in recent times. Strong e-commerce growth and market leadership position are key drivers.</p>
                        <div class="risk-note">
                            <strong>Note:</strong> High GMP indicates strong demand but also higher risk. Invest carefully.
                        </div>
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
        const rows = document.querySelectorAll('.gmp-table tbody tr');
        
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
    const gmpRows = document.querySelectorAll('.gmp-row');
    const modal = document.getElementById('gmpDetailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    gmpRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const companyName = this.querySelector('.company-cell strong').textContent;
            
            if (gmpTrendData[company]) {
                const data = gmpTrendData[company];
                modalTitle.textContent = data.title + ' - GMP Trend Analysis';
                modalBody.innerHTML = data.details;
            } else {
                modalTitle.textContent = companyName + ' - GMP Details';
                modalBody.innerHTML = `
                    <div class="gmp-trend-details">
                        <div class="gmp-summary">
                            <h4>GMP Information</h4>
                            <p>Detailed GMP trend analysis for ${companyName} will be available soon.</p>
                            <p>Current GMP data is displayed in the main table.</p>
                        </div>
                        <div class="risk-note">
                            <strong>Disclaimer:</strong> GMP rates are indicative and based on unofficial grey market trading. Actual listing prices may vary significantly.
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
            sortableHeaders.forEach(h => {
                const text = h.textContent.replace(' ↑', '').replace(' ↓', '');
                h.textContent = text + ' ↕';
            });
            const text = this.textContent.replace(' ↕', '');
            this.textContent = text + (direction === 'asc' ? ' ↑' : ' ↓');
        });
    });
    
    function sortTable(column, direction) {
        const tbody = document.querySelector('.gmp-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            switch(column) {
                case 'company':
                    aVal = a.querySelector('.company-cell strong').textContent;
                    bVal = b.querySelector('.company-cell strong').textContent;
                    break;
                case 'ipo-price':
                    aVal = parseFloat(a.cells[4].textContent.replace(',', ''));
                    bVal = parseFloat(b.cells[4].textContent.replace(',', ''));
                    break;
                case 'gmp':
                    aVal = parseFloat(a.querySelector('.gmp-value').textContent.replace('₹', '').replace(',', ''));
                    bVal = parseFloat(b.querySelector('.gmp-value').textContent.replace('₹', '').replace(',', ''));
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
        const headers = ['company', 'open', 'close', 'listing', 'ipo-price', 'gmp'];
        return headers.indexOf(column);
    }

    // Auto-refresh GMP data every 30 seconds (simulated)
    setInterval(() => {
        // In a real application, this would fetch fresh GMP data from an API
        console.log('Refreshing GMP data...');
        
        // Simulate small GMP changes
        const gmpCells = document.querySelectorAll('.gmp-value');
        gmpCells.forEach(cell => {
            if (!cell.textContent.includes('₹ 0')) {
                // Add a small visual indicator for data refresh
                cell.style.backgroundColor = '#f0fdf4';
                setTimeout(() => {
                    cell.style.backgroundColor = '';
                }, 1000);
            }
        });
    }, 30000);
});