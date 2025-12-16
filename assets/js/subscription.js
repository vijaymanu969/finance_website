// IPO Subscription JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample detailed subscription data
    const subscriptionData = {
        'icici': {
            title: 'ICICI Prudential Asset Management Co',
            details: `
                <div class="subscription-details">
                    <div class="subscription-summary">
                        <h4>Subscription Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Total Subscription:</span>
                                <span class="value highlight">3.09x</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Issue Size:</span>
                                <span class="value">₹10,602.65 Cr</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Applications Received:</span>
                                <span class="value">2,45,678</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-breakdown">
                        <h4>Category-wise Subscription</h4>
                        <div class="breakdown-table">
                            <table>
                                <tr>
                                    <td>QIB (ex-Anchor)</td>
                                    <td>4.22x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 84%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (BNII)</td>
                                    <td>6.54x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (SNII)</td>
                                    <td>5.27x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Retail</td>
                                    <td>1.04x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 21%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Others</td>
                                    <td>3.86x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 77%"></div></div></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="subscription-timeline">
                        <h4>Day-wise Subscription Trend</h4>
                        <div class="timeline-chart">
                            <div class="chart-placeholder">
                                <p>📈 Day-wise subscription chart would be displayed here</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'nephrocare': {
            title: 'Nephrocare Health Services Ltd',
            details: `
                <div class="subscription-details">
                    <div class="subscription-summary">
                        <h4>Subscription Summary</h4>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="label">Total Subscription:</span>
                                <span class="value highlight">13.96x</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Issue Size:</span>
                                <span class="value">₹871.05 Cr</span>
                            </div>
                            <div class="summary-item">
                                <span class="label">Applications Received:</span>
                                <span class="value">4,56,789</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="category-breakdown">
                        <h4>Category-wise Subscription</h4>
                        <div class="breakdown-table">
                            <table>
                                <tr>
                                    <td>QIB (ex-Anchor)</td>
                                    <td>27.47x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (BNII)</td>
                                    <td>29.81x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>NII (SNII)</td>
                                    <td>13.18x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 100%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Retail</td>
                                    <td>2.31x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 46%"></div></div></td>
                                </tr>
                                <tr>
                                    <td>Employees</td>
                                    <td>2.67x</td>
                                    <td><div class="progress-bar"><div class="progress" style="width: 53%"></div></div></td>
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
        const rows = document.querySelectorAll('.subscription-table tbody tr');
        
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
    const subscriptionRows = document.querySelectorAll('.subscription-row');
    const modal = document.getElementById('subscriptionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    subscriptionRows.forEach(row => {
        row.addEventListener('click', function() {
            const company = this.dataset.company;
            const companyName = this.querySelector('.company-cell strong').textContent;
            
            if (subscriptionData[company]) {
                const data = subscriptionData[company];
                modalTitle.textContent = data.title + ' - Detailed Subscriptions';
                modalBody.innerHTML = data.details;
            } else {
                modalTitle.textContent = companyName + ' - Subscription Details';
                modalBody.innerHTML = `
                    <div class="subscription-details">
                        <div class="subscription-summary">
                            <h4>Subscription Summary</h4>
                            <p>Detailed subscription data for ${companyName} will be available once the IPO opens for subscription.</p>
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
        const tbody = document.querySelector('.subscription-table tbody');
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