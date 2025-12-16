// Mainboard IPO Comparison JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample IPO data for comparison
    const ipoData = {
        'ksh': {
            name: 'KSH International',
            sector: 'Manufacturing',
            ipoPrice: '₹365.00',
            lotSize: '39',
            listingDate: '23 Dec 2025',
            openDate: '16 Dec 2025',
            closeDate: '18 Dec 2025',
            marketCap: '₹25,47,84,15,798.00',
            totalSubscription: '0.15',
            anchor: '1',
            qibSubscription: '0',
            bnii: '0.03',
            snii: '0.12',
            retail: '0.27',
            employee: '-',
            pat: '₹22.68',
            patMargin: '3.51%',
            roe: '22.77%',
            roce: '16.60%',
            peRatio: '28.68 vs 45.48',
            salesGrowth: '-',
            evEbitda: '-'
        },
        'icici': {
            name: 'ICICI Prudential Asset Management Co',
            sector: 'Financial Services',
            ipoPrice: '₹2,061.00',
            lotSize: '6',
            listingDate: '19 Dec 2025',
            openDate: '12 Dec 2025',
            closeDate: '16 Dec 2025',
            marketCap: '₹10,44,36,82,52,760.00',
            totalSubscription: '0.72',
            anchor: '1',
            qibSubscription: '1.97',
            bnii: '0.32',
            snii: '0.48',
            retail: '0.21',
            employee: '-',
            pat: '₹1,617.74',
            patMargin: '-',
            roe: '82.80%',
            roce: '-',
            peRatio: '33.07 vs 32.1',
            salesGrowth: '-',
            evEbitda: '29.5 vs -'
        },
        'wakefit': {
            name: 'Wakefit Innovations Ltd',
            sector: 'Consumer Goods',
            ipoPrice: '₹195.00',
            lotSize: '76',
            listingDate: '15 Dec 2025',
            openDate: '08 Dec 2025',
            closeDate: '10 Dec 2025',
            marketCap: '₹1,288.89 Cr',
            totalSubscription: '2.52',
            anchor: '1',
            qibSubscription: '3.04',
            bnii: '1.05',
            snii: '1.41',
            retail: '3.17',
            employee: '-',
            pat: '₹45.32',
            patMargin: '8.2%',
            roe: '18.5%',
            roce: '22.1%',
            peRatio: '25.4 vs 28.7',
            salesGrowth: '35%',
            evEbitda: '15.2 vs 18.5'
        },
        'meesho': {
            name: 'Meesho Ltd',
            sector: 'E-commerce',
            ipoPrice: '₹111.00',
            lotSize: '135',
            listingDate: '10 Dec 2025',
            openDate: '03 Dec 2025',
            closeDate: '05 Dec 2025',
            marketCap: '₹5,421.2 Cr',
            totalSubscription: '8.45',
            anchor: '1',
            qibSubscription: '12.3',
            bnii: '6.8',
            snii: '4.2',
            retail: '9.1',
            employee: '-',
            pat: '₹-125.45',
            patMargin: '-15.2%',
            roe: '-8.5%',
            roce: '-12.3%',
            peRatio: 'N/A',
            salesGrowth: '125%',
            evEbitda: 'N/A'
        }
    };

    let selectedIPOs = ['ksh', 'icici']; // Default selected IPOs
    let currentView = 'table';

    // Initialize
    updateSelectedIPOs();
    updateComparisonTable();

    // View toggle functionality
    const viewBtns = document.querySelectorAll('.view-toggle-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.textContent.includes('Charts') ? 'charts' : 'table';
            
            if (currentView === 'charts') {
                showChartsView();
            } else {
                showTableView();
            }
        });
    });

    // Remove IPO functionality
    function updateSelectedIPOs() {
        const selectedContainer = document.querySelector('.selected-ipos-section');
        if (!selectedContainer) return;
        
        selectedContainer.innerHTML = '';
        
        selectedIPOs.forEach(ipoId => {
            const ipo = ipoData[ipoId];
            if (ipo) {
                const ipoElement = document.createElement('div');
                ipoElement.className = 'selected-ipo-tag';
                ipoElement.dataset.ipo = ipoId;
                ipoElement.innerHTML = `
                    <span>${ipo.name}</span>
                    <button class="remove-tag">×</button>
                `;
                selectedContainer.appendChild(ipoElement);
            }
        });
        
        // Update compare button
        const compareBtn = document.querySelector('.compare-button');
        if (compareBtn) {
            compareBtn.textContent = `Compare (${selectedIPOs.length})`;
        }
        
        // Add remove functionality
        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const ipoId = this.closest('.selected-ipo-tag').dataset.ipo;
                selectedIPOs = selectedIPOs.filter(id => id !== ipoId);
                updateSelectedIPOs();
                updateComparisonTable();
            });
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Simple search implementation - in real app would show dropdown with results
            console.log('Searching for:', searchTerm);
        });
    }

    function updateComparisonTable() {
        const tablesContainer = document.querySelector('.comparison-tables');
        if (!tablesContainer) return;
        
        if (selectedIPOs.length < 2) {
            tablesContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <h3>Select at least 2 IPOs to compare</h3>
                    <p>Use the search box above to add more IPOs for comparison</p>
                </div>
            `;
            return;
        }

        tablesContainer.innerHTML = generateComparisonHTML();
    }

    function generateComparisonHTML() {
        const ipos = selectedIPOs.map(id => ipoData[id]).filter(Boolean);
        
        return `
            <!-- Basic Information Section -->
            <div class="comparison-table-section">
                <div class="table-header">
                    <h3>BASIC INFORMATION</h3>
                </div>
                <div class="comparison-table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="metric-column">Metric</th>
                                ${ipos.map(ipo => `<th class="company-column">${ipo.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="metric-cell">Sector</td>
                                ${ipos.map(ipo => `<td>${ipo.sector}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">IPO Price (₹)</td>
                                ${ipos.map(ipo => `<td>${ipo.ipoPrice}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Lot Size</td>
                                ${ipos.map(ipo => `<td>${ipo.lotSize}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Listing Date</td>
                                ${ipos.map(ipo => `<td>${ipo.listingDate}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">IPO Open Date</td>
                                ${ipos.map(ipo => `<td>${ipo.openDate}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">IPO Close Date</td>
                                ${ipos.map(ipo => `<td>${ipo.closeDate}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Estimated Market Cap (₹)</td>
                                ${ipos.map(ipo => `<td>${ipo.marketCap}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Subscription Metrics Section -->
            <div class="comparison-table-section">
                <div class="table-header">
                    <h3>SUBSCRIPTION METRICS</h3>
                </div>
                <div class="comparison-table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="metric-column">Metric</th>
                                ${ipos.map(ipo => `<th class="company-column">${ipo.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="metric-cell">Total Subscription</td>
                                ${ipos.map(ipo => `<td>${ipo.totalSubscription}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Anchor Investor</td>
                                ${ipos.map(ipo => `<td>${ipo.anchor}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">QIB X-Anchor Subscription</td>
                                ${ipos.map(ipo => `<td>${ipo.qibSubscription}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">B-Nii</td>
                                ${ipos.map(ipo => `<td>${ipo.bnii}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">S-Nii</td>
                                ${ipos.map(ipo => `<td>${ipo.snii}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Retail Subscription</td>
                                ${ipos.map(ipo => `<td>${ipo.retail}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Employee Subscription</td>
                                ${ipos.map(ipo => `<td>${ipo.employee}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Performance Metrics Section -->
            <div class="comparison-table-section">
                <div class="table-header">
                    <h3>PERFORMANCE METRICS</h3>
                </div>
                <div class="comparison-table-wrapper">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th class="metric-column">Metric</th>
                                ${ipos.map(ipo => `<th class="company-column">${ipo.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="metric-cell">Profit After Tax (₹ Cr)</td>
                                ${ipos.map(ipo => `<td>${ipo.pat}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">PAT Margin (%)</td>
                                ${ipos.map(ipo => `<td>${ipo.patMargin}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">ROE (%)</td>
                                ${ipos.map(ipo => `<td>${ipo.roe}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">ROCE (%)</td>
                                ${ipos.map(ipo => `<td>${ipo.roce}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">P/E Ratio vs industry P/E</td>
                                ${ipos.map(ipo => `<td>${ipo.peRatio}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">Sales Growth(%)</td>
                                ${ipos.map(ipo => `<td>${ipo.salesGrowth}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="metric-cell">EV/EBITDA vs peer avg</td>
                                ${ipos.map(ipo => `<td>${ipo.evEbitda}</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function showChartsView() {
        const tablesContainer = document.querySelector('.comparison-tables');
        if (tablesContainer) {
            tablesContainer.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <h3>📊 Charts View</h3>
                    <p>Interactive charts and visualizations will be displayed here</p>
                    <p style="margin-top: 20px; font-size: 14px;">Feature coming soon with advanced data visualization</p>
                </div>
            `;
        }
    }

    function showTableView() {
        updateComparisonTable();
    }

    // Add IPO functionality (simplified)
    function addIPO(ipoId) {
        if (selectedIPOs.length < 4 && !selectedIPOs.includes(ipoId)) {
            selectedIPOs.push(ipoId);
            updateSelectedIPOs();
            updateComparisonTable();
        }
    }

    // Expose function for potential future use
    window.addMainboardIPO = addIPO;
});