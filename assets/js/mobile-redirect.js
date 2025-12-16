// Mobile Detection and Redirect Script
(function() {
    // Simple mobile detection
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }
    
    // Get current page path
    function getCurrentPage() {
        return window.location.pathname;
    }
    
    // Redirect to mobile version if needed
    function redirectToMobile() {
        if (!isMobile()) return;
        
        const currentPage = getCurrentPage();
        const currentUrl = window.location.href;
        
        // Avoid infinite redirects
        if (currentUrl.includes('mobile-') || currentUrl.includes('simple-')) {
            return;
        }
        
        let mobileUrl = null;
        
        // SME pages redirects
        if (currentPage.includes('/sme/dashboard.html')) {
            mobileUrl = currentPage.replace('/sme/dashboard.html', '/sme/mobile-dashboard.html');
        }
        else if (currentPage.includes('/sme/')) {
            // For other SME pages, redirect to mobile dashboard
            mobileUrl = currentPage.replace(/\/sme\/.*\.html/, '/sme/mobile-dashboard.html');
        }
        // Comparison pages redirects
        else if (currentPage.includes('/comparison/mainboard-comparison.html') || 
                 currentPage.includes('/comparison/sme-comparison.html')) {
            mobileUrl = currentPage.replace(/\/comparison\/.*comparison\.html/, '/comparison/mobile-comparison.html');
        }
        
        // Perform redirect if mobile URL is determined
        if (mobileUrl && mobileUrl !== currentPage) {
            console.log('Redirecting to mobile version:', mobileUrl);
            window.location.href = mobileUrl;
        }
    }
    
    // Add mobile-friendly viewport if not present
    function ensureMobileViewport() {
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }
    }
    
    // Add mobile-friendly CSS for better compatibility
    function addMobileFallbackCSS() {
        if (isMobile()) {
            const style = document.createElement('style');
            style.textContent = `
                /* Mobile Fallback CSS */
                * {
                    box-sizing: border-box;
                }
                
                body {
                    font-size: 14px;
                    line-height: 1.5;
                    -webkit-text-size-adjust: 100%;
                }
                
                .container {
                    max-width: 100%;
                    padding-left: 16px;
                    padding-right: 16px;
                }
                
                table {
                    width: 100%;
                    overflow-x: auto;
                    display: block;
                    white-space: nowrap;
                }
                
                .nav {
                    display: none;
                }
                
                .mobile-menu-btn {
                    display: block !important;
                }
                
                /* Hide complex elements on mobile */
                .dropdown-menu {
                    position: static !important;
                    display: none !important;
                }
                
                /* Simplify comparison tables for mobile */
                .comparison-table {
                    font-size: 12px;
                }
                
                .comparison-table th,
                .comparison-table td {
                    padding: 8px 4px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize mobile optimizations
    function init() {
        ensureMobileViewport();
        addMobileFallbackCSS();
        
        // Small delay to ensure page is loaded
        setTimeout(redirectToMobile, 100);
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();