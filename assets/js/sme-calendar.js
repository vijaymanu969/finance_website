// SME Calendar JavaScript
class SMECalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.currentView = 'month';
        
        // Sample SME IPO data
        this.smeIpoData = {
            '2025-12-01': [
                { name: 'TechStart SME Ltd', status: 'open', type: 'Open Date' },
                { name: 'AgriGrow SME', status: 'closed', type: 'Close Date' },
                { name: 'LogiMove SME', status: 'allotment', type: 'Allotment Date' }
            ],
            '2025-12-02': [
                { name: 'FinServe SME Ltd', status: 'open', type: 'Open Date' },
                { name: 'MedTech SME', status: 'closed', type: 'Close Date' },
                { name: 'EcoEnergy SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'DataSoft SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-03': [
                { name: 'BuildCorp SME', status: 'open', type: 'Open Date' },
                { name: 'FoodTech SME', status: 'closed', type: 'Close Date' },
                { name: 'AutoParts SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'GreenTech SME', status: 'refund', type: 'Refund Date' },
                { name: 'HealthCare SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-04': [
                { name: 'RetailPlus SME', status: 'open', type: 'Open Date' },
                { name: 'TechSolutions SME', status: 'closed', type: 'Close Date' },
                { name: 'ManufacturingCo SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'ServicePro SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-05': [
                { name: 'InnovateTech SME', status: 'open', type: 'Open Date' },
                { name: 'AgriSupply SME', status: 'closed', type: 'Close Date' },
                { name: 'LogisticsPro SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'FinanceHub SME', status: 'refund', type: 'Refund Date' },
                { name: 'MedDevice SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-06': [
                { name: 'SmartSolutions SME', status: 'open', type: 'Open Date' }
            ],
            '2025-12-07': [
                { name: 'EcoFriendly SME', status: 'open', type: 'Open Date' }
            ],
            '2025-12-08': [
                { name: 'TechAdvance SME', status: 'open', type: 'Open Date' },
                { name: 'AgriTech SME', status: 'closed', type: 'Close Date' },
                { name: 'LogiSmart SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'FinTech SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-09': [
                { name: 'BuildSmart SME', status: 'open', type: 'Open Date' },
                { name: 'FoodSafe SME', status: 'closed', type: 'Close Date' },
                { name: 'AutoTech SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'GreenEnergy SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-10': [
                { name: 'HealthTech SME', status: 'open', type: 'Open Date' },
                { name: 'RetailTech SME', status: 'closed', type: 'Close Date' },
                { name: 'TechInnovate SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'ManufacturePlus SME', status: 'refund', type: 'Refund Date' },
                { name: 'ServiceTech SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-11': [
                { name: 'InnovateHub SME', status: 'open', type: 'Open Date' },
                { name: 'AgriSmart SME', status: 'closed', type: 'Close Date' },
                { name: 'LogiTech SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'FinSmart SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-12': [
                { name: 'MedSmart SME', status: 'open', type: 'Open Date' },
                { name: 'EcoSmart SME', status: 'closed', type: 'Close Date' },
                { name: 'TechSmart SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'BuildTech SME', status: 'refund', type: 'Refund Date' },
                { name: 'FoodTech SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-13': [
                { name: 'AutoSmart SME', status: 'open', type: 'Open Date' }
            ],
            '2025-12-14': [
                { name: 'GreenSmart SME', status: 'open', type: 'Open Date' }
            ],
            '2025-12-15': [
                { name: 'HealthSmart SME', status: 'open', type: 'Open Date' },
                { name: 'RetailSmart SME', status: 'closed', type: 'Close Date' },
                { name: 'TechPlus SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'ManufactureSmart SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-16': [
                { name: 'ServiceSmart SME', status: 'open', type: 'Open Date' },
                { name: 'InnovatePlus SME', status: 'closed', type: 'Close Date' },
                { name: 'AgriPlus SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'LogiPlus SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-17': [
                { name: 'FinPlus SME', status: 'open', type: 'Open Date' },
                { name: 'MedPlus SME', status: 'closed', type: 'Close Date' },
                { name: 'EcoPlus SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'TechMax SME', status: 'refund', type: 'Refund Date' },
                { name: 'BuildMax SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-18': [
                { name: 'FoodMax SME', status: 'open', type: 'Open Date' },
                { name: 'AutoMax SME', status: 'closed', type: 'Close Date' },
                { name: 'GreenMax SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'HealthMax SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-19': [
                { name: 'RetailMax SME', status: 'open', type: 'Open Date' },
                { name: 'TechPro SME', status: 'closed', type: 'Close Date' },
                { name: 'ManufacturePro SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'ServicePro SME', status: 'refund', type: 'Refund Date' },
                { name: 'InnovatePro SME', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-20': [
                { name: 'AgriPro SME', status: 'open', type: 'Open Date' }
            ],
            '2025-12-22': [
                { name: 'LogiPro SME', status: 'allotment', type: 'Allotment Date' },
                { name: 'FinPro SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-23': [
                { name: 'MedPro SME', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-24': [
                { name: 'EcoPro SME', status: 'listed', type: 'Listing Date' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCalendar();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
        
        // View toggle buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.renderCalendar();
            });
        });
        
        // Close panel
        document.getElementById('closePanel').addEventListener('click', () => {
            document.getElementById('smeIpoDetailsPanel').classList.remove('active');
        });
        
        // Close panel on outside click
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('smeIpoDetailsPanel');
            if (e.target === panel) {
                panel.classList.remove('active');
            }
        });
    }
    
    renderCalendar() {
        const title = document.getElementById('calendarTitle');
        const daysContainer = document.getElementById('smeCalendarDays');
        
        // Update title
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        title.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // Clear previous days
        daysContainer.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Generate calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(date, firstDay.getMonth());
            daysContainer.appendChild(dayElement);
        }
    }
    
    createDayElement(date, currentMonth) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'sme-calendar-day';
        
        // Add classes for styling
        if (date.getMonth() !== currentMonth) {
            dayDiv.classList.add('other-month');
        }
        
        if (this.isToday(date)) {
            dayDiv.classList.add('today');
        }
        
        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'sme-day-number';
        dayNumber.textContent = date.getDate();
        dayDiv.appendChild(dayNumber);
        
        // SME IPO events
        const dateStr = this.formatDate(date);
        const events = this.smeIpoData[dateStr] || [];
        
        if (events.length > 0) {
            const eventsDiv = document.createElement('div');
            eventsDiv.className = 'sme-day-events';
            
            events.forEach(event => {
                const eventDot = document.createElement('div');
                eventDot.className = `sme-event-dot ${event.status}`;
                eventsDiv.appendChild(eventDot);
            });
            
            dayDiv.appendChild(eventsDiv);
        }
        
        // Click handler
        dayDiv.addEventListener('click', () => {
            this.selectDate(date, events);
        });
        
        return dayDiv;
    }
    
    selectDate(date, events) {
        // Remove previous selection
        document.querySelectorAll('.sme-calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selection to clicked day
        event.currentTarget.classList.add('selected');
        
        this.selectedDate = date;
        this.showSMEIpoDetails(date, events);
    }
    
    showSMEIpoDetails(date, events) {
        const panel = document.getElementById('smeIpoDetailsPanel');
        const content = document.getElementById('panelContent');
        
        if (events.length === 0) {
            content.innerHTML = `
                <div style="text-align: center; color: var(--gray);">
                    <p>No SME IPO events on ${this.formatDisplayDate(date)}</p>
                </div>
            `;
        } else {
            content.innerHTML = `
                <h4 style="margin-bottom: 16px;">${this.formatDisplayDate(date)}</h4>
                ${events.map(event => `
                    <div style="padding: 12px; background: var(--light-gray); border-radius: 8px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong>${event.name}</strong>
                            <span class="sme-event-dot ${event.status}" style="width: 8px; height: 8px;"></span>
                        </div>
                        <div style="font-size: 14px; color: var(--gray);">
                            ${event.type}
                        </div>
                    </div>
                `).join('')}
            `;
        }
        
        panel.classList.add('active');
    }
    
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    formatDisplayDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }
}

// Initialize SME calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SMECalendar();
});