// SME GMP JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample SME GMP trend data
    const smeGmpTrendData = {
        'luxury-time': {
            title: 'Luxury Time Ltd',
            currentGMP: '₹99',
            percentage: '120.73%',
            trend: 'Extremely Bullish',
            details: `
                <div class="sme-gmp-trend-details">
                    <div class="sme-gmp-summary">
                        <h4>SME GMP Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Current GMP:</span>
                                <span class="value highlight positive">₹99 (120.73%)</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">IPO Price:</span>
                                <span class="value">₹82</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Expected Listing Price:</span>
                                <span class="value">₹181</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Trend:</span>
                                <span class="value positive">Extremely Bullish</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sme-gmp-history">
                        <h4>SME GMP History (Last 5 Days)</h4>
                        <div class="history-table">
                            <table>
                                <tr>
                                    <td>16 Dec 2025</td>
                                    <td>₹99</td>
                                    <td class="positive">+120.73%</td>
                                </tr>
                                <tr>
                                    <td>15 Dec 2025</td>
                                    <td>₹95</td>
                                    <td class="positive">+115.85%</td>
                                </tr>
                                <tr>
                                    <td>14 Dec 2025</td>
                                    <td>₹88</td>
                                    <td class="positive">+107.32%</td>
                                </tr>
                                <tr>
                                    <td>13 Dec 2025</td>
                                    <td>₹82</td>
                                    <td class="positive">+100.00%</td>
                                </tr>
                                <tr>
                                    <td>12 Dec 2025</td>
                                    <td>₹75</td>
                                    <td class="positive">+91.46%</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="sme-gmp-analysis">
                        <h4>SME GMP Analysis</h4>
                        <p>Luxury Time Ltd is showing exceptional SME GMP performance with over 120% premium. The luxury goods sector and strong brand positioning are driving unprecedented demand in the grey market.</p>
                        <div class="risk-note">
                            <strong>SME Risk Warning:</strong> Extremely high GMP indicates very high risk. SME IPOs are more volatile than mainboard IPOs.
                        </div>
                    </div>
                </div>
            `
        },
        'encompass-design': {
            title: 'Encompass Design India Ltd',
            currentGMP: '₹80',
            percentage: '74.77%',
            trend: 'Very Bullish',
            details: `
                <div class="sme-gmp-trend-details">
                    <div class="sme-gmp-summary">
                        <h4>SME GMP Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Current GMP:</span>
                                <span class="value highlight positive">₹80 (74.77%)</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">IPO Price:</span>
                                <span class="value">₹107</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Expected Listing Price:</span>
                                <span class="value">₹187</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Trend:</span>
                                <span class="value positive">Very Bullish</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sme-gmp-history">
                        <h4>SME GMP History (Last 5 Days)</h4>
                        <div class="history-table">
                            <table>
                                <tr>
                                    <td>16 Dec 2025</td>
                                    <td>₹80</td>
                                    <td class="positive">+74.77%</td>
                                </tr>
                                <tr>
                                    <td>15 Dec 2025</td>
                                    <td>₹75</td>
                                    <td class="positive">+70.09%</td>
                                </tr>
                                <tr>
                                    <td>14 Dec 2025</td>
                                    <td>₹70</td>
                                    <td class="positive">+65.42%</td>
                                </tr>
                                <tr>
                                    <td>13 Dec 2025</td>
                                    <td>₹65</td>
                                    <td class="positive">+60.75%</td>
                                </tr>
                                <tr>
                                    <td>12 Dec 2025</td>
                                    <td>₹60</td>
                                    <td class="positive">+56.07%</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="sme-gmp-analysis">
                        <h4>SME GMP Analysis</h4>
                        <p>Encompass Design India Ltd shows strong SME GMP performance with consistent upward trend. The design and engineering services sector outlook is positive.</p>
                        <div class="risk-note">
                            <strong>Note:</strong> SME GMP is more volatile than mainboard. Invest with caution.
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
        const rows = document.querySelectorAll('.sme-gmp-table tbody tr');
        
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
    const smeGmpRows = document.querySelectorAll('.sme-gmp-row');
    const modal = document.getElementById('smeGmpDetailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    smeGmpRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const companyName = this.querySelector('.company-cell strong').textContent;
            
            if (smeGmpTrendData[company]) {
                const data = smeGmpTrendData[company];
                modalTitle.textContent = data.title + ' - SME GMP Trend Analysis';
                modalBody.innerHTML = data.details;
            } else {
                modalTitle.textContent = companyName + ' - SME GMP Details';
                modalBody.innerHTML = `
                    <div class="sme-gmp-trend-details">
                        <div class="sme-gmp-summary">
                            <h4>SME GMP Information</h4>
                            <p>Detailed SME GMP trend analysis for ${companyName} will be available soon.</p>
                            <p>Current SME GMP data is displayed in the main table.</p>
                        </div>
                        <div class="risk-note">
                            <strong>SME Disclaimer:</strong> SME GMP rates are highly volatile and based on limited grey market trading. SME IPOs carry higher risks than mainboard IPOs.
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
        const tbody = document.querySelector('.sme-gmp-table tbody');
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
                    aVal = parseFloat(a.querySelector('.sme-gmp-value').textContent.replace('₹', '').replace(',', ''));
                    bVal = parseFloat(b.querySelector('.sme-gmp-value').textContent.replace('₹', '').replace(',', ''));
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

    // Auto-refresh SME GMP data every 45 seconds (simulated)
    setInterval(() => {
        console.log('Refreshing SME GMP data...');
        
        // Simulate small SME GMP changes
        const smeGmpCells = document.querySelectorAll('.sme-gmp-value');
        smeGmpCells.forEach(cell => {
            if (!cell.textContent.includes('₹ 0')) {
                // Add a small visual indicator for data refresh
                cell.style.backgroundColor = '#f0f4ff';
                setTimeout(() => {
                    cell.style.backgroundColor = '';
                }, 1000);
            }
        });
    }, 45000);
});