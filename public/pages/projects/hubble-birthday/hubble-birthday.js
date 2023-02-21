var day30 = document.getElementById("day30");
var day31 = document.getElementById("day31");

var month = document.getElementById("month");
var day = document.getElementById("day");

const months = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

const daysInMonths = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

function populateDays(month) {
  if (month == "February") {
    day30.hidden = true;
    day31.hidden = true;
  } else if (daysInMonths[month] == 30) {
    day30.hidden = false;
    day31.hidden = true;
  } else {
    day30.hidden = false;
    day31.hidden = false;
  }
}

let currentBirthday = "";

function updateBirthday() {
  let year = Math.floor(Math.random() * (2022 - 1996 + 1)) + 1996;
  let yourMonth = months[month.options[month.selectedIndex].value];
  // console.log(yourMonth);
  let yourDay = ("0" + day.options[day.selectedIndex].value).slice(-2);
  // console.log(yourDay);

  if (yourMonth == "02" || yourDay == 29) {
    year = 2008;
  }
  let birthday = `${year}-${yourMonth}-${yourDay}`;
  return birthday;
}

function checkBirthday() {
  if (!month.value || !day.value) {
    return;
  }
  let updatedBirthday = updateBirthday();
  if (currentBirthday !== updatedBirthday) {
    currentBirthday = updatedBirthday;
    getSpacePhoto();
  }
}

month.addEventListener("change", (e) => {
  e.preventDefault();
  yourDay = day.options.selectedIndex = "0";
  populateDays(e.target.value);
  checkBirthday();
});

day.addEventListener("change", (e) => {
  e.preventDefault();
  checkBirthday();
});

const nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=";
const apiKey = "gM26T2mHGZnfJauqVf3DIGnVp1N327ULC23ChufV";
const request = new XMLHttpRequest();
request.open("GET", nasaUrl + apiKey);
request.send();

function getSpacePhoto() {
  const title = document.querySelector("#title");
  const copyright = document.querySelector("#copyright");
  const mediaResult = document.querySelector("#media-result");
  const information = document.querySelector("#description");

  const imageSection = `<a id="hdimg" href="" target="-blank">
  <div class="image-div">
  <img id="image_of_the_day" src="" alt="image-by-nasa">
  </div>
 </a>`;

  const videoSection = `<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`;

  let newDate = "&date=" + updateBirthday() + "&";

  function fetchData() {
    try {
      fetch(nasaUrl + apiKey + newDate)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          diplaydata(json);
        });
    } catch (error) {
      console.log(error);
      title.innerHTML = "";
      copyright.innerHTML = "";
      mediaResult.innerHTML = "";
      information.innerHTML = "";
    }
  }

  function diplaydata(data) {
    // remove appended credit from title when present
    let mediaTitle = data.title.split(/\r\n|\n\r|\n|\r/)[0];
    title.innerHTML = mediaTitle;

    if (data.hasOwnProperty("copyright")) {
      copyright.innerHTML = `© ${data.copyright}`;
    } else {
      copyright.innerHTML = "";
    }

    date.innerHTML = data.date;

    if (data.media_type == "video") {
      mediaResult.innerHTML = videoSection;
      document.getElementById("videoLink").src = data.url;
    } else {
      mediaResult.innerHTML = imageSection;
      document.getElementById("hdimg").href = data.hdurl;
      document.getElementById("image_of_the_day").src = data.url;
    }
    let explanationString = data.explanation.replace(/ {1,}/g, " ");
    let sentences = explanationString.split(
      /((?<=[.!?])(?<!ie\.|eg\.)(?<!U\.S\.A\.)\s+(?=[A-Z]))/
    );

    sentences = sentences.filter((element) => {
      return /\S/.test(element);
    });

    console.log(sentences);
    let firstTwoSentences = sentences.slice(0, 2);
    let firstThreeSentences = sentences.slice(0, 3);

    let wordCount = firstTwoSentences.join(" ").split(/\s+/).length;
    let wordCountThree = firstThreeSentences.join(" ").split(/\s+/).length;

    if (sentences.length >= 3 && wordCountThree <= 45) {
      information.innerHTML = firstThreeSentences.join(" ") + " ";
    } else if (sentences.length >= 2 && wordCount <= 45) {
      information.innerHTML = firstTwoSentences.join(" ") + " ";
    } else {
      information.innerHTML = sentences[0] + " ";
    }
  }
  fetchData();
}

window.onload = function () {
  document.getElementById("birthday-form").reset();
};
