// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Simulate live market data updates
    function updateMarketData() {
        const indices = document.querySelectorAll('.index-item');
        indices.forEach(index => {
            const valueEl = index.querySelector('.index-value');
            const changeEl = index.querySelector('.index-change');
            
            if (valueEl && changeEl) {
                const currentValue = parseFloat(valueEl.textContent.replace(/,/g, ''));
                const change = (Math.random() - 0.5) * 20;
                const newValue = currentValue + change;
                const percentChange = (change / currentValue * 100).toFixed(2);
                
                valueEl.textContent = newValue.toLocaleString('en-IN', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
                
                const sign = change >= 0 ? '+' : '';
                changeEl.textContent = `${sign}${change.toFixed(2)} (${sign}${percentChange}%)`;
                
                index.classList.remove('up', 'down');
                index.classList.add(change >= 0 ? 'up' : 'down');
            }
        });
    }

    // Update market data every 5 seconds (simulated)
    setInterval(updateMarketData, 5000);

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .news-card, .widget').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Ad placeholder click handler (for demo)
document.querySelectorAll('.ad-placeholder').forEach(ad => {
    ad.style.cursor = 'pointer';
    ad.addEventListener('click', function() {
        alert('This is where your ad would link to. Replace with actual ad code (Google AdSense, etc.)');
    });
});
