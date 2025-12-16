// IPO Performance JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.perf-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically update the table data based on the selected tab
            console.log('Switched to:', this.dataset.tab);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.performance-table tbody tr');
        
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
        const tbody = document.querySelector('.performance-table tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            switch(column) {
                case 'company':
                    aVal = a.querySelector('.company-cell strong').textContent;
                    bVal = b.querySelector('.company-cell strong').textContent;
                    break;
                case 'performance':
                    aVal = parseFloat(a.querySelector('.perf-value').textContent.replace('%', '').replace('+', ''));
                    bVal = parseFloat(b.querySelector('.perf-value').textContent.replace('%', '').replace('+', ''));
                    break;
                case 'issue-size':
                    aVal = parseFloat(a.cells[4].textContent.replace(',', ''));
                    bVal = parseFloat(b.cells[4].textContent.replace(',', ''));
                    break;
                case 'current-price':
                    aVal = parseFloat(a.cells[7].textContent.replace('₹', '').replace(',', ''));
                    bVal = parseFloat(b.cells[7].textContent.replace('₹', '').replace(',', ''));
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
        const headers = ['company', 'open', 'close', 'listing', 'issue-size', 'issue-price', 'listed-price', 'current-price', 'performance'];
        return headers.indexOf(column);
    }

    // Filter functionality
    const timeFilter = document.querySelector('.time-filter');
    const sectorFilter = document.querySelector('.sector-filter');
    
    timeFilter.addEventListener('change', function() {
        console.log('Time filter changed to:', this.value);
        // Implement time-based filtering
    });
    
    sectorFilter.addEventListener('change', function() {
        console.log('Sector filter changed to:', this.value);
        // Implement sector-based filtering
    });
});