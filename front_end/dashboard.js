const currentMonthEl = document.querySelector('.current-month');
const calendarDaysEl = document.querySelector('.calendar-days');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const todayBtn = document.querySelector('.today');
const prevYearBtn = document.querySelector('.prev-year');
const nextYearBtn = document.querySelector('.next-year');

let date = new Date();

const renderCalendar = () => {
   calendarDaysEl.innerHTML = '';
   const month = date.getMonth();
   const year = date.getFullYear();
 
   // Điều chỉnh để Thứ Hai là ngày đầu tuần
   const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Điều chỉnh offset
 
   const lastDate = new Date(year, month + 1, 0).getDate();
 
   currentMonthEl.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
 
   for (let i = 0; i < firstDay; i++) {
     const paddingDay = document.createElement('div');
     paddingDay.classList.add('padding-day');
     calendarDaysEl.appendChild(paddingDay);
   }
 
   for (let i = 1; i <= lastDate; i++) {
     const day = document.createElement('div');
     day.classList.add('month-day');
     if (
       i === new Date().getDate() &&
       month === new Date().getMonth() &&
       year === new Date().getFullYear()
     ) {
       day.classList.add('current-day');
     }
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

renderCalendar();