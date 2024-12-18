const currentMonthEl = document.querySelector('.current-month');
const calendarDaysEl = document.querySelector('.calendar-days');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const todayBtn = document.querySelector('.today');
const prevYearBtn = document.querySelector('.prev-year');
const nextYearBtn = document.querySelector('.next-year');

let date = new Date();

let event_date = [];

document.addEventListener('DOMContentLoaded', async function () {
  await getEvents();
  renderCalendar();
});



async function getEvents() {
  const username = localStorage.getItem('username'); // Lấy username từ localStorage

  try {
    const response = await fetch('https://back-end-ocean.up.railway.app/project/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.content) {
      event_date = [];
      data.content.Tasks.forEach(task => {

        const start = new Date(task.startDate);
        const end = new Date(task.endDate);
        event_date.push({ start, end, name: task.name, level: task.level });
      });

    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}




const renderCalendar = () => {
  calendarDaysEl.innerHTML = '';
  const month = date.getMonth();
  const year = date.getFullYear();

  // Điều chỉnh để Thứ Hai là ngày đầu tuần
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Điều chỉnh offset

  const lastDate = new Date(year + 2, month + 1, 0).getDate();

  currentMonthEl.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    const paddingDay = document.createElement('div');
    paddingDay.classList.add('padding-day');
    calendarDaysEl.appendChild(paddingDay);
  }

  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.classList.add('month-day');

    if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
      day.classList.add('current-day');
    }
    event_date.forEach((event) => {
      if (i === event.start.getDate() && month === event.start.getMonth() && year === event.start.getFullYear()) {
        day.classList.add('event-start-day');

        day.addEventListener('click', () => {
          const selectedDate = new Date(Date.UTC(year, month, i));
          document.getElementById('date').value = selectedDate.toISOString().split('T')[0]; // Chỉ lấy ngày, bỏ giờ phút giây
          document.getElementById('time').value = 'week';
          filterEvents();
          document.getElementById('dashboard_main').style.display = 'none';
          document.getElementById('notification_main').style.display = 'flex';
        });

      }
      if (i === event.end.getDate() && month === event.end.getMonth() && year === event.end.getFullYear()) {
        day.classList.add('event-end-day');

        day.addEventListener('click', () => {
          const selectedDate = new Date(Date.UTC(year, month, i));
          document.getElementById('date').value = selectedDate.toISOString().split('T')[0]; // Chỉ lấy ngày, bỏ giờ phút giây
          document.getElementById('time').value = 'week';
          filterEvents();
          document.getElementById('dashboard_main').style.display = 'none';
          document.getElementById('notification_main').style.display = 'flex';
        });

      }
      if (i === event.start.getDate() && month === event.start.getMonth() && year === event.start.getFullYear() && i === event.end.getDate() && month === event.end.getMonth() && year === event.end.getFullYear()) {
        day.classList.add('event-both-day');

        day.addEventListener('click', () => {
          const selectedDate = new Date(Date.UTC(year, month, i));
          document.getElementById('date').value = selectedDate.toISOString().split('T')[0]; // Chỉ lấy ngày, bỏ giờ phút giây
          document.getElementById('time').value = 'week';
          filterEvents();
          document.getElementById('dashboard_main').style.display = 'none';
          document.getElementById('notification_main').style.display = 'flex';
        });


      }









    });




    day.textContent = i;
    calendarDaysEl.appendChild(day);
  }
};


const navigateMonth = (direction) => {
  date.setMonth(date.getMonth() + direction);
  renderCalendar();
};

const navigateYear = (direction) => {
  date.setFullYear(date.getFullYear() + direction);
  renderCalendar();
};

prevBtn.addEventListener('click', () => navigateMonth(-1));
nextBtn.addEventListener('click', () => navigateMonth(1));
prevYearBtn.addEventListener('click', () => navigateYear(-1));
nextYearBtn.addEventListener('click', () => navigateYear(1));
todayBtn.addEventListener('click', () => {
  date = new Date();
  renderCalendar();
});



