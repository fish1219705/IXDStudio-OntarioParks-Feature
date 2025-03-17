document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const arrivalDateDisplay = document.getElementById("arrival-date");
    const departureDateDisplay = document.getElementById("departure-date");
    const checkAvailabilityBtn = document.getElementById("check-availability");
    const popup = document.createElement("div");
    popup.id = "availability-popup";
    document.body.appendChild(popup);
    let selectedArrival = null;
    let selectedDeparture = null;
    
    // Simulated unavailable dates
    const unavailableDates = ["2025-03-01", "2025-03-02", "2025-03-03"];
    const availableDates = ["2025-03-05", "2025-03-06", "2025-03-07"];
    
    function generateCalendar() {
        calendar.innerHTML = "";
        for (let day = 1; day <= 30; day++) {
            const date = `2025-03-${day.toString().padStart(2, '0')}`;
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.classList.add("calendar-day");
            
            if (unavailableDates.includes(date)) {
                dayElement.classList.add("unavailable");
            } else if (availableDates.includes(date)) {
                dayElement.classList.add("available");
            }
            
            dayElement.addEventListener("click", function () {
                if (!selectedArrival) {
                    selectedArrival = date;
                    arrivalDateDisplay.textContent = day;
                    dayElement.classList.add("selected"); // Mark the selected date as arrival
                } else if (!selectedDeparture && date > selectedArrival) {
                    selectedDeparture = date;
                    departureDateDisplay.textContent = day;
            
                    // Apply 'selected' class to all days between arrival and departure
                    const arrivalDateObj = new Date(selectedArrival);
                    const departureDateObj = new Date(selectedDeparture);
                    
                    // Loop through all the days between arrival and departure
                    const allDays = document.querySelectorAll('.calendar-day');
                    allDays.forEach(day => {
                        const currentDay = new Date(`2025-03-${day.textContent.padStart(2, '0')}`);
                        if (currentDay >= arrivalDateObj && currentDay <= departureDateObj) {
                            day.classList.add("selected");
                        }
                    });
                } else {
                    // Reset the selection if clicking the arrival date again or a previous departure
                    selectedArrival = date;
                    selectedDeparture = null;
                    arrivalDateDisplay.textContent = day;
                    departureDateDisplay.textContent = "-";
            
                    // Remove the 'selected' class from all days first
                    const allDays = document.querySelectorAll('.calendar-day');
                    allDays.forEach(day => day.classList.remove("selected"));
            
                    // Reapply 'selected' class to the newly selected arrival date
                    dayElement.classList.add("selected");
                }
            });
            
            calendar.appendChild(dayElement);
        }
    }
    
    checkAvailabilityBtn.addEventListener("click", function () {
        if (!selectedArrival || !selectedDeparture) {
            alert("Please select both arrival and departure dates.");
            return;
        }
        
        const isAvailable = availableDates.includes(selectedArrival) && availableDates.includes(selectedDeparture);
        
        if (isAvailable) {
            popup.innerHTML = `
                <div class='popup-content'>
                    <h3>Sound Good! 😊</h3>
                    <p><strong>Available For the Selected Dates</strong></p>
                    <button id='book-now'>Book Now</button>
                </div>`;
        } else {
            popup.innerHTML = `
                <div class='popup-content'>
                    <h3>Not Available</h3>
                    <p>Sorry, the selected dates are unavailable.</p>
                    <button id='try-again'>Try Another Date</button>
                </div>`;
        }
        
        popup.style.display = "block";
        document.getElementById("try-again")?.addEventListener("click", () => popup.style.display = "none");
        document.getElementById("book-now")?.addEventListener("click", () => alert("Booking process starts!"));
    });
    
    generateCalendar();
});



