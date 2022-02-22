function getTime(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }
  ).format(date);
};

function getDay(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      weekday: 'long',
    }
  ).format(date);
};

function getDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }
  ).format(date);
};

function updateTime() {
  const d = new Date();

  const time = getTime(d);
  const day = getDay(d);
  const date = getDate(d);

  document.getElementById("time").innerText = time;
  document.getElementById("day").innerText = day;
  document.getElementById("date").innerText = date;

  setTimeout(() => {
    updateTime();
  }, 1000);
};

function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function setTextColor(color) {
  document.body.style.color = color;
}

window.onload=function(){
  updateTime();

  document.getElementById('background').addEventListener(
    'change',
    (event) => {
      setBackgroundColor(event.target.value);
    },
  );

  document.getElementById('text_color').addEventListener(
    'change',
    (event) => {
      setTextColor(event.target.value);
    },
  );

}
