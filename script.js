// 1) Вставте сюди посилання на вашу Google Form (коли створите)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfIFkRJ2bzVSG3IP9MZE8GDYzKJWWNx_bFzJT1W7Ai5i4YSiw/viewform?embedded=true";

// 2) Дата події (Київський час)
const EVENT_ISO_KYIV = "2026-04-26T15:00:00";
/* Countdown (простий і надійний) */
const elDays = document.getElementById("cdDays");
const elHours = document.getElementById("cdHours");
const elMins = document.getElementById("cdMinutes");
const elSecs = document.getElementById("cdSeconds");

const eventDate = new Date(EVENT_ISO_KYIV); // "2026-04-26T15:00:00"

function pad2(n){ return String(n).padStart(2, "0"); }

function tick() {
  const now = Date.now();
  const eventMs = eventDate.getTime();

  if (Number.isNaN(eventMs)) return; // якщо дата зламалась

  let diff = Math.max(0, eventMs - now);
  const totalSec = Math.floor(diff / 1000);

  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (elDays) elDays.textContent = String(days);
  if (elHours) elHours.textContent = pad2(hours);
  if (elMins) elMins.textContent = pad2(mins);
  if (elSecs) elSecs.textContent = pad2(secs);
}

tick();
setInterval(tick, 1000);

/* =========================
   RSVP BUTTON LOGIC
========================= */

openFormBtn.addEventListener("click", () => {
  const iframe = formEmbed.querySelector("iframe");
  iframe.src = GOOGLE_FORM_URL;
  formEmbed.hidden = false;
});

/* ======================
   SCROLL ANIMATIONS
====================== */

const animatedElements = document.querySelectorAll(".animate-on-scroll");
const lines = document.querySelectorAll(".animate-line");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // анімація один раз
      }
    });
  },
  {
    threshold: 0.3
  }
);

animatedElements.forEach((el) => observer.observe(el));
lines.forEach((line) => observer.observe(line));


// Прибираємо хеш після завантаження
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState("", document.title, window.location.pathname);
    window.scrollTo(0, 0);
  }
});

const heart = document.querySelector(".heart-animate");

if (heart) {
  const heartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heart.classList.add("active");
          heartObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  heartObserver.observe(heart);
}


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".location-title, .location-card, .divider");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach((el) => observer.observe(el));
});
