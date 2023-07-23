import React, { useState } from 'react';
import './Calendar.css'; // Import the CSS file for styling

const Calendar = () => {

    // Array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the current date
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    // Function to get the number of days in a specific month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Generate the calendar grid
    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);

        // Array to store the calendar grid
        const calendarGrid = [];

        // Generate the grid cells
        for (let day = 1; day <= daysInMonth; day++) {
            calendarGrid.push(
                <div className="calendar-cell" key={day}>
                    {day}
                </div>
            );
        }

        return calendarGrid;
    };

    const goToPrevMonth = () => {
        setCurrentYear(prevYear => {
            const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            if (prevMonth === 11) {
                return prevYear - 1;
            } else {
                return prevYear;
            }
        });
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    };

    const goToNextMonth = () => {
        setCurrentYear(prevYear => {
            const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            if (nextMonth === 0) {
                return prevYear + 1;
            } else {
                return prevYear;
            }
        });
        setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="prev-btn" onClick={goToPrevMonth}>&lt;</button>
                <div className="month-year">
                    {months[currentMonth]} {currentYear}
                </div>
                <button className="next-btn" onClick={goToNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
                {generateCalendar()}
            </div>
        </div>
    );
}

export default Calendar;
