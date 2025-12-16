// IPO Calendar JavaScript
class IPOCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.currentView = 'month';
        
        // Sample IPO data
        this.ipoData = {
            '2025-12-02': [
                { name: 'Bajaj Housing Finance', status: 'open', type: 'Open Date' }
            ],
            '2025-12-04': [
                { name: 'Bajaj Housing Finance', status: 'closed', type: 'Close Date' }
            ],
            '2025-12-05': [
                { name: 'NTPC Green Energy', status: 'open', type: 'Open Date' }
            ],
            '2025-12-07': [
                { name: 'NTPC Green Energy', status: 'closed', type: 'Close Date' }
            ],
            '2025-12-08': [
                { name: 'Bajaj Housing Finance', status: 'allotment', type: 'Allotment Date' }
            ],
            '2025-12-11': [
                { name: 'Vishal Mega Mart', status: 'open', type: 'Open Date' }
            ],
            '2025-12-12': [
                { name: 'NTPC Green Energy', status: 'allotment', type: 'Allotment Date' }
            ],
            '2025-12-13': [
                { name: 'Vishal Mega Mart', status: 'closed', type: 'Close Date' }
            ],
            '2025-12-15': [
                { name: 'Hyundai Motor India', status: 'open', type: 'Open Date' }
            ],
            '2025-12-16': [
                { name: 'Bajaj Housing Finance', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-17': [
                { name: 'Hyundai Motor India', status: 'closed', type: 'Close Date' }
            ],
            '2025-12-18': [
                { name: 'Vishal Mega Mart', status: 'allotment', type: 'Allotment Date' }
            ],
            '2025-12-19': [
                { name: 'Bajaj Housing Finance', status: 'listed', type: 'Listing Date' }
            ],
            '2025-12-22': [
                { name: 'NTPC Green Energy', status: 'refund', type: 'Refund Date' }
            ],
            '2025-12-23': [
                { name: 'NTPC Green Energy', status: 'listed', type: 'Listing Date' }
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
            document.getElementById('ipoDetailsPanel').classList.remove('active');
        });
        
        // Close panel on outside click
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('ipoDetailsPanel');
            if (e.target === panel) {
                panel.classList.remove('active');
            }
        });
    }
    
    renderCalendar() {
        const title = document.getElementById('calendarTitle');
        const daysContainer = document.getElementById('calendarDays');
        
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
        dayDiv.className = 'calendar-day';
        
        // Add classes for styling
        if (date.getMonth() !== currentMonth) {
            dayDiv.classList.add('other-month');
        }
        
        if (this.isToday(date)) {
            dayDiv.classList.add('today');
        }
        
        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayDiv.appendChild(dayNumber);
        
        // IPO events
        const dateStr = this.formatDate(date);
        const events = this.ipoData[dateStr] || [];
        
        if (events.length > 0) {
            const eventsDiv = document.createElement('div');
            eventsDiv.className = 'day-events';
            
            events.forEach(event => {
                const eventDot = document.createElement('div');
                eventDot.className = `event-dot ${event.status}`;
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
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selection to clicked day
        event.currentTarget.classList.add('selected');
        
        this.selectedDate = date;
        this.showIPODetails(date, events);
    }
    
    showIPODetails(date, events) {
        const panel = document.getElementById('ipoDetailsPanel');
        const content = document.getElementById('panelContent');
        
        if (events.length === 0) {
            content.innerHTML = `
                <div style="text-align: center; color: var(--gray);">
                    <p>No IPO events on ${this.formatDisplayDate(date)}</p>
                </div>
            `;
        } else {
            content.innerHTML = `
                <h4 style="margin-bottom: 16px;">${this.formatDisplayDate(date)}</h4>
                ${events.map(event => `
                    <div style="padding: 12px; background: var(--light-gray); border-radius: 8px; margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong>${event.name}</strong>
                            <span class="status-dot ${event.status}" style="width: 8px; height: 8px;"></span>
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

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IPOCalendar();
});