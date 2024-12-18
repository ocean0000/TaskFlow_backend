

// Hàm định dạng ngày thành dd/mm/yyyy
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Tính tuần của năm
function getWeekNumber(date) {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
}

// Hàm lọc và hiển thị thông báo
function filterEvents() {
    const dateInput = document.getElementById("date").value;
    const timeFilter = document.getElementById("time").value;
    const selectedDate = new Date(dateInput);


    const results = [];
    console.log(event_date);
    event_date.forEach(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        
        // Kiểm tra cho tuần, tháng, năm
        if (timeFilter === "week") {

            const selectedWeek = getWeekNumber(selectedDate);
            
            if (selectedWeek === getWeekNumber(eventStart)) {
                results.push({ name: event.name, level: event.level, date: event.start, status: "Bắt đầu" });
            }
            if (selectedWeek === getWeekNumber(eventEnd)) {
                results.push({ name: event.name, level: event.level, date: event.end, status: "Kết thúc" });
            }
        }
        else if (timeFilter === "month") {
            if (selectedDate.getFullYear() === eventStart.getFullYear() && selectedDate.getMonth() === eventStart.getMonth()) {
                results.push({ name: event.name, level: event.level, date: event.start, status: "Bắt đầu" });
            }
            if (selectedDate.getFullYear() === eventEnd.getFullYear() && selectedDate.getMonth() === eventEnd.getMonth()) {
                results.push({ name: event.name, level: event.level, date: event.end, status: "Kết thúc" });
            }
        }
        else if (timeFilter === "year") {
            if (selectedDate.getFullYear() === eventStart.getFullYear()) {
                results.push({ name: event.name, level: event.level, date: event.start, status: "Bắt đầu" });
            }
            if (selectedDate.getFullYear() === eventEnd.getFullYear()) {
                results.push({ name: event.name, level: event.level, date: event.end, status: "Kết thúc" });
            }
        }
        else if (timeFilter === "all_time") {
            results.push({ name: event.name, level: event.level, date: event.start, status: "Bắt đầu" });
            results.push({ name: event.name, level: event.level, date: event.end, status: "Kết thúc" });
        }
        else 
        {
            
        }


    });
    console.log(results);
    displayNotifications(results);
}

// Hiển thị các thông báo
function displayNotifications(events) {
    const notificationList = document.querySelector(".notification_list");
    notificationList.innerHTML = "";

    events.forEach(event => {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.classList.add(`${event.level}`) // Thêm class cho notification


        const eventHTML = `
           <p>
               <strong>Sự kiện:</strong> ${event.name} <br>
               <strong>${event.status} vào ngày:</strong> ${formatDate(event.date)}
           </p>
       `;
        notification.innerHTML = eventHTML;

        // Thêm checkbox "Markdone"
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("markdone");

        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                notification.style.opacity = "0.6";
            } else {
                notification.style.opacity = "1";
            }
        });

        notification.appendChild(checkbox);
        notificationList.appendChild(notification);
    });
}

// Gắn sự kiện cho nút Filter
document.addEventListener("DOMContentLoaded", async() => {

    await getEvents();
    document.getElementById("filter_button").addEventListener("click", filterEvents);
    // Set today's date
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Set the default time filter to "week"

    document.getElementById('time').value = 'week';

    // Click the filter button
    filterEvents();



});
