let submitBtn = false;

const color = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendar = document.getElementById("calendar");

let today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectDate = document.getElementById("selectDate");
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

function load(date, month, year) {
  document.getElementById(
    "monthDisplay"
  ).innerText = `${months[month]} ${year}`;
  const daysMonth = new Date(year, month + 1, 0).getDate();

  selectDate.setAttribute("max", "daysMonth");
  const day = today.getDate();
  const firstDay = new Date(year, month, 1);
  const dateStr = firstDay.toLocaleDateString("en-in", {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const padDys = weekdays.indexOf(dateStr.split(", ")[0]);
  calendar.innerHTML = "";

  for (let i = 1; i <= padDys + daysMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    if (i > padDys) {
      daySquare.innerText = i - padDys;
      if (i % 7 == 1 || i % 7 == 0) {
        daySquare.style.color = "red";
      }
      daySquare.addEventListener("click", () => {
        if (color[i] == 1) {
          color[i] = 0;
          daySquare.classList.remove("active");
        } else {
          color[i] = 1;
          daySquare.classList.add("active");
        }
      });
    } else {
      daySquare.classList.add("padding");
    }

    if (submitBtn && day + padDys === i) {
      if (color[i] == 1) {
        color[i] = 0;
      } else {
        color[i] = 1;
      }
    }
    if (color[i] == 1) {
      daySquare.classList.add("active");
    }

    calendar.appendChild(daySquare);
  }
}

function jumpMonth() {
  currentMonth = parseInt(selectMonth.value);
  currentYear = parseInt(selectYear.value);
  color = color.map((color) => 0);
  load(today, currentMonth, currentYear);
}

function jump() {
  submitBtn = true;
  currentDate = parseInt(selectDate.value);
  currentDate =
    currentDate % new Date(currentYear, currentMonth + 1, 0).getDate();
  today.setDate(currentDate);
  load(today, currentMonth, currentYear);
}

load(today, currentMonth, currentYear);
