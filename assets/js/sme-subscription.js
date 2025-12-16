// SME Subscription JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample detailed SME subscription data
    const smeSubscriptionData = {
        'hrs-aluglaze': {
            title: 'HRS Aluglaze Ltd',
            details: `
                <div class="subscription-details">
                    <div class="subscription-summary">
                        <h4>SME Subscription Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Total Subscription:</span>
                                <span class="value highlight">44.83x</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Issue Size:</span>
                                <span class="value">₹50.92 Cr</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Applications Received:</span>
                                <span class="value">1,25,456</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-breakdown">
                        <h4>Category-wise SME Subscription</h4>
                        <div class="breakdown-table">
                            <table>
                                <tr>
                                    <td>QIB (ex-Anchor)</td>
                                    <td>19.48x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (BNII)</td>
                                    <td>98.16x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (SNII)</td>
                                    <td>50.07x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Retail</td>
                                    <td>49.54x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII Total</td>
                                    <td>82.13x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="subscription-timeline">
                        <h4>Day-wise SME Subscription Trend</h4>
                        <div class="timeline-chart">
                            <div class="chart-placeholder">
                                <p>📈 SME subscription trend chart would be displayed here</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'pajson-agro': {
            title: 'Pajson Agro India Ltd',
            details: `
                <div class="subscription-details">
                    <div class="subscription-summary">
                        <h4>SME Subscription Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Total Subscription:</span>
                                <span class="value highlight">6.5x</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Issue Size:</span>
                                <span class="value">₹74.45 Cr</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Applications Received:</span>
                                <span class="value">45,678</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-breakdown">
                        <h4>Category-wise SME Subscription</h4>
                        <div class="breakdown-table">
                            <table>
                                <tr>
                                    <td>QIB (ex-Anchor)</td>
                                    <td>10.92x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (BNII)</td>
                                    <td>7.73x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 77%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (SNII)</td>
                                    <td>5.14x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 51%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Retail</td>
                                    <td>3.85x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 38%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII Total</td>
                                    <td>6.86x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 69%"></div></div></td>
                                </tr>
                            </table>
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
        const rows = document.querySelectorAll('.sme-subscription-table tbody tr');
        
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
    const subscriptionRows = document.querySelectorAll('.sme-subscription-row');
    const modal = document.getElementById('smeSubscriptionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    subscriptionRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const companyName = this.querySelector('.company-cell strong').textContent;
            
            if (smeSubscriptionData[company]) {
                const data = smeSubscriptionData[company];
                modalTitle.textContent = data.title + ' - Detailed SME Subscriptions';
                modalBody.innerHTML = data.details;
            } else {
                modalTitle.textContent = companyName + ' - SME Subscription Details';
                modalBody.innerHTML = `
                    <div class="subscription-details">
                        <div class="subscription-summary">
                            <h4>SME Subscription Summary</h4>
                            <p>Detailed subscription data for ${companyName} will be available once the SME IPO opens for subscription.</p>
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
        const tbody = document.querySelector('.sme-subscription-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            switch(column) {
                case 'company':
                    aVal = a.querySelector('.company-cell strong').textContent;
                    bVal = b.querySelector('.company-cell strong').textContent;
                    break;
                case 'total':
                    aVal = parseFloat(a.querySelector('.total-subscription').textContent.replace('x', ''));
                    bVal = parseFloat(b.querySelector('.total-subscription').textContent.replace('x', ''));
                    break;
                case 'issue-size':
                    aVal = parseFloat(a.cells[3].textContent.replace(',', ''));
                    bVal = parseFloat(b.cells[3].textContent.replace(',', ''));
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
        const headers = ['company', 'open', 'close', 'issue-size', 'anchor', 'qib', 'nii', 'bnii', 'snii', 'retail', 'employees', 'others', 'total'];
        return headers.indexOf(column);
    }
});