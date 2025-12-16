// SME IPO Comparison JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample SME IPO data for comparison
    const smeIpoData = {
        'neptune': {
            name: 'Neptune Logitek Ltd',
            sector: 'Logistics and Transportation',
            ipoPrice: '-',
            lotSize: '1000',
            listingDate: '22 Dec 2025',
            openDate: '19 Dec 2025',
            closeDate: '17 Dec 2025',
            marketCap: '-',
            totalSubscription: '1.03',
            anchor: '-',
            qibSubscription: '-',
            bnii: '-',
            snii: '-',
            retail: '1.73',
            employee: '-',
            pat: '₹4.02',
            patMargin: '3.56%',
            roe: '14.89%',
            roce: '21.25%',
            peRatio: '17.9 vs -',
            salesGrowth: '-',
            evEbitda: '-'
        },
        'stanbik': {
            name: 'Stanbik Agro Ltd',
            sector: 'Agriculture / Agri-Input',
            ipoPrice: '-',
            lotSize: '2000',
            listingDate: '19 Dec 2025',
            openDate: '12 Dec 2025',
            closeDate: '16 Dec 2025',
            marketCap: '-',
            totalSubscription: '0.05',
            anchor: '-',
            qibSubscription: '-',
            bnii: '-',
            snii: '-',
            retail: '0.11',
            employee: '-',
            pat: '₹2.22',
            patMargin: '7.12%',
            roe: '22.33%',
            roce: '27.02%',
            peRatio: '8.98 vs -',
            salesGrowth: '-',
            evEbitda: '-'
        },
        'greentech': {
            name: 'GreenTech Solutions Ltd',
            sector: 'Technology',
            ipoPrice: '₹85',
            lotSize: '1600',
            listingDate: '15 Dec 2025',
            openDate: '10 Dec 2025',
            closeDate: '12 Dec 2025',
            marketCap: '₹45.2 Cr',
            totalSubscription: '2.45',
            anchor: '-',
            qibSubscription: '-',
            bnii: '-',
            snii: '-',
            retail: '2.8',
            employee: '-',
            pat: '₹3.15',
            patMargin: '8.5%',
            roe: '18.2%',
            roce: '24.1%',
            peRatio: '12.5 vs -',
            salesGrowth: '45%',
            evEbitda: '8.2 vs -'
        },
        'microfinance': {
            name: 'Micro Finance India Ltd',
            sector: 'Financial Services',
            ipoPrice: '₹125',
            lotSize: '1200',
            listingDate: '08 Dec 2025',
            openDate: '03 Dec 2025',
            closeDate: '05 Dec 2025',
            marketCap: '₹78.5 Cr',
            totalSubscription: '0.85',
            anchor: '-',
            qibSubscription: '-',
            bnii: '-',
            snii: '-',
            retail: '0.92',
            employee: '-',
            pat: '₹5.8',
            patMargin: '12.3%',
            roe: '25.4%',
            roce: '19.8%',
            peRatio: '15.2 vs -',
            salesGrowth: '28%',
            evEbitda: '11.5 vs -'
        }
    };

    let selectedIPOs = ['neptune', 'stanbik']; // Default selected SME IPOs
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
            
            if (this.textContent.includes('Charts')) {
                currentView = 'charts';
                showChartsView();
            } else {
                currentView = 'table';
                showTableView();
            }
        });
    });

    // Remove IPO functionality
    function updateSelectedIPOs() {
        const selectedContainer = document.querySelector('.selected-ipos-section');
        selectedContainer.innerHTML = '';
        
        selectedIPOs.forEach(ipoId => {
            const ipo = smeIpoData[ipoId];
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
        compareBtn.textContent = `Compare (${selectedIPOs.length})`;
        
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
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // Simple search implementation - in real app would show dropdown with results
        console.log('Searching for:', searchTerm);
    });

    function updateComparisonTable() {
        if (selectedIPOs.length < 2) {
            document.querySelector('.comparison-tables').innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <h3>Select at least 2 SME IPOs to compare</h3>
                    <p>Use the search box above to add more SME IPOs for comparison</p>
                </div>
            `;
            return;
        }

        const content = document.querySelector('.comparison-tables');
        content.innerHTML = generateComparisonHTML();
    }

    function generateComparisonHTML() {
        const ipos = selectedIPOs.map(id => smeIpoData[id]);
        
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
        document.querySelector('.comparison-tables').innerHTML = `
            <div style="text-align: center; padding: 60px; color: #666;">
                <h3>📊 SME Charts View</h3>
                <p>Interactive charts and visualizations for SME IPOs will be displayed here</p>
                <p style="margin-top: 20px; font-size: 14px;">Feature coming soon with advanced SME data visualization</p>
            </div>
        `;
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
    window.addSMEIPO = addIPO;
});