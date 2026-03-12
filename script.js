// Valentine Countdown
const timer = document.getElementById("timer");
const valentineDate = new Date("Feb 14, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = valentineDate - now;

  if (diff < 0) {
    timer.innerHTML = "Offer Ended 💔";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  timer.innerHTML = `${d} Days : ${h} Hours : ${m} Minutes`;
}, 1000);
