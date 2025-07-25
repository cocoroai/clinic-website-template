// Sanitize function to prevent XSS attacks
function sanitize(str) {
    if (typeof str !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    const reg = /[&<>"'/`=]/ig;
    return str.replace(reg, (match) => (map[match]));
}

// Input validation functions
function validatePhone(phone) {
    // Japanese phone number format: XXX-XXXX-XXXX or XXXX-XX-XXXX
    const phoneRegex = /^0\d{1,4}-\d{1,4}-\d{4}$|^0\d{9,10}$/;
    return phoneRegex.test(phone.replace(/[^\d-]/g, ''));
}

function validateKatakana(str) {
    // Katakana characters and some common symbols
    const katakanaRegex = /^[ァ-ヶー\s]+$/;
    return katakanaRegex.test(str);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Reservation Calendar and Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    
    const monthNames = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    
    // Time slots for different departments
    const timeSlots = {
        morning: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'],
        afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
    };
    
    // Calendar elements
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarGridElement = document.getElementById('calendarGrid');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const timeSlotsElement = document.getElementById('timeSlots');
    const departmentSelect = document.getElementById('department');
    
    // Initialize calendar
    function initCalendar() {
        updateCalendar();
        generateTimeSlots();
    }
    
    // Update calendar display
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        currentMonthElement.textContent = `${year}年 ${monthNames[month]}`;
        
        // Clear previous calendar content
        calendarGridElement.innerHTML = '';
        
        // Add weekday headers
        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        weekdays.forEach(day => {
            const weekdayElement = document.createElement('div');
            weekdayElement.className = 'calendar-weekday';
            weekdayElement.textContent = day;
            calendarGridElement.appendChild(weekdayElement);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Get previous month info for displaying previous month dates
        const prevMonth = new Date(year, month - 1, 0);
        const prevMonthDays = prevMonth.getDate();
        
        // Add dates from previous month
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const prevDate = document.createElement('div');
            prevDate.className = 'calendar-date other-month disabled';
            prevDate.textContent = prevMonthDays - i;
            calendarGridElement.appendChild(prevDate);
        }
        
        // Add days of the current month
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = day;
            
            const currentDateObj = new Date(year, month, day);
            const dayOfWeek = currentDateObj.getDay();
            
            // Disable past dates
            if (currentDateObj < today) {
                dateElement.classList.add('disabled');
            } 
            // Disable Sundays (0) and Wednesdays (3) - clinic is closed
            else if (dayOfWeek === 0 || dayOfWeek === 3) {
                dateElement.classList.add('disabled');
                dateElement.title = '休診日';
            } 
            // Enable valid dates
            else {
                dateElement.addEventListener('click', () => selectDate(year, month, day, dateElement));
            }
            
            // Highlight today
            if (currentDateObj.getTime() === today.getTime()) {
                dateElement.classList.add('today');
            }
            
            calendarGridElement.appendChild(dateElement);
        }
        
        // Calculate remaining cells and add next month dates
        const totalCells = calendarGridElement.children.length - 7; // Subtract weekday headers
        const remainingCells = 35 - totalCells; // 5 weeks of dates (35 cells)
        
        for (let day = 1; day <= remainingCells; day++) {
            const nextDate = document.createElement('div');
            nextDate.className = 'calendar-date other-month disabled';
            nextDate.textContent = day;
            calendarGridElement.appendChild(nextDate);
        }
    }
    
    // Select a date
    function selectDate(year, month, day, element) {
        // Remove previous selection
        document.querySelectorAll('.calendar-date.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked date
        element.classList.add('selected');
        selectedDate = new Date(year, month, day);
        
        // Update time slots based on selected date
        updateTimeSlots();
    }
    
    // Generate time slots
    function generateTimeSlots() {
        timeSlotsElement.innerHTML = '';
        
        // Morning slots
        const morningTitle = document.createElement('div');
        morningTitle.textContent = '午前';
        morningTitle.style.gridColumn = '1 / -1';
        morningTitle.style.fontWeight = '600';
        morningTitle.style.marginBottom = '8px';
        morningTitle.style.color = 'var(--text-dark)';
        timeSlotsElement.appendChild(morningTitle);
        
        timeSlots.morning.forEach(time => {
            const slot = createTimeSlot(time);
            timeSlotsElement.appendChild(slot);
        });
        
        // Afternoon title
        const afternoonTitle = document.createElement('div');
        afternoonTitle.textContent = '午後';
        afternoonTitle.style.gridColumn = '1 / -1';
        afternoonTitle.style.fontWeight = '600';
        afternoonTitle.style.margin = '16px 0 8px 0';
        afternoonTitle.style.color = 'var(--text-dark)';
        timeSlotsElement.appendChild(afternoonTitle);
        
        timeSlots.afternoon.forEach(time => {
            const slot = createTimeSlot(time);
            timeSlotsElement.appendChild(slot);
        });
    }
    
    // Create time slot element
    function createTimeSlot(time) {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        slot.addEventListener('click', () => selectTime(time, slot));
        return slot;
    }
    
    // Update time slots based on selected date
    function updateTimeSlots() {
        if (!selectedDate) return;
        
        const dayOfWeek = selectedDate.getDay();
        const timeSlotElements = document.querySelectorAll('.time-slot');
        
        timeSlotElements.forEach(slot => {
            slot.classList.remove('disabled');
            const time = slot.textContent;
            
            // Disable Saturday afternoon slots after 17:00 (17:00 is available)
            if (dayOfWeek === 6) {
                const hour = parseInt(time.split(':')[0]);
                const minute = parseInt(time.split(':')[1]);
                if (hour > 17 || (hour === 17 && minute > 0)) {
                    slot.classList.add('disabled');
                }
            }
            
            // Add some random unavailable slots for demonstration
            if (Math.random() < 0.2) {
                slot.classList.add('disabled');
            }
        });
    }
    
    // Select time
    function selectTime(time, element) {
        if (element.classList.contains('disabled')) return;
        
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked time
        element.classList.add('selected');
        selectedTime = time;
    }
    
    // Navigation event listeners
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
        clearSelections();
    });
    
    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
        clearSelections();
    });
    
    // Clear date and time selections
    function clearSelections() {
        selectedDate = null;
        selectedTime = null;
        document.querySelectorAll('.calendar-date.selected, .time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }
    
    // Department change handler
    departmentSelect.addEventListener('change', function() {
        updateTimeSlots();
    });
    
    // Form submission
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate date and time selection
        if (!selectedDate) {
            alert('希望日を選択してください。');
            return;
        }
        
        if (!selectedTime) {
            alert('希望時間を選択してください。');
            return;
        }
        
        // Get form data
        const formData = new FormData(reservationForm);
        const reservationData = {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            lastNameKana: document.getElementById('lastNameKana').value,
            firstNameKana: document.getElementById('firstNameKana').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            department: document.getElementById('department').value,
            visitType: document.getElementById('visitType').value,
            symptoms: document.getElementById('symptoms').value,
            selectedDate: selectedDate.toLocaleDateString('ja-JP'),
            selectedTime: selectedTime,
            requests: document.getElementById('requests').value
        };
        
        // Validate required fields
        const requiredFields = ['lastName', 'firstName', 'lastNameKana', 'firstNameKana', 'phone', 'email', 'department', 'visitType'];
        const missingFields = requiredFields.filter(field => !reservationData[field]);
        
        if (missingFields.length > 0) {
            alert('必須項目をすべて入力してください。');
            return;
        }
        
        // Validate input formats
        if (!validateKatakana(reservationData.lastNameKana)) {
            alert('フリガナ（セイ）はカタカナで入力してください。');
            return;
        }
        
        if (!validateKatakana(reservationData.firstNameKana)) {
            alert('フリガナ（メイ）はカタカナで入力してください。');
            return;
        }
        
        if (!validatePhone(reservationData.phone)) {
            alert('電話番号の形式が正しくありません。\n例: 03-1234-5678');
            return;
        }
        
        if (!validateEmail(reservationData.email)) {
            alert('メールアドレスの形式が正しくありません。');
            return;
        }
        
        // Check agreement checkbox
        if (!document.getElementById('agreement').checked) {
            alert('個人情報の取り扱いに同意してください。');
            return;
        }
        
        // Show loading state
        const submitButton = document.querySelector('.form-submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert(`予約を受け付けました。\n\n【予約内容】\nお名前: ${sanitize(reservationData.lastName)} ${sanitize(reservationData.firstName)}様\n診療科: ${reservationData.department === 'dental' ? '歯科' : '皮膚科'}\n希望日時: ${reservationData.selectedDate} ${reservationData.selectedTime}\n\n後日、確認のお電話をさせていただきます。`);
            
            // Reset form
            reservationForm.reset();
            clearSelections();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value.length >= 10) {
            if (value.startsWith('0')) {
                if (value.length === 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                } else if (value.length === 11) {
                    value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
                }
            }
        }
        
        e.target.value = value;
    });
    
    // Initialize the calendar
    initCalendar();
});

// Add smooth scrolling for form navigation
document.addEventListener('DOMContentLoaded', function() {
    const formSections = document.querySelectorAll('.form-section');
    
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});