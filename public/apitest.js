// Function to generate random year

// Function to generate random year

function getRandomYear() {
  return Math.floor(Math.random() * (2022 - 1996 + 1)) + 1996;
}

const randomYear = getRandomYear();

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

let currentBirthday = "";

function updateBirthday() {
  let yourMonth = months[month.options[month.selectedIndex].value];
  let yourDay = ("0" + day.options[day.selectedIndex].value).slice(-2);
  // fix this so that the checker for undefined works
  let birthday = `${randomYear}-${yourMonth}-${yourDay}`;
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
  checkBirthday();
});

day.addEventListener("change", (e) => {
  e.preventDefault();
  checkBirthday();
});

// console.log(updateBirthday());

const nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=";
const apiKey = "gM26T2mHGZnfJauqVf3DIGnVp1N327ULC23ChufV";
const request = new XMLHttpRequest();
request.open("GET", nasaUrl + apiKey);
request.send();

function getSpacePhoto() {
  const title = document.querySelector("#title");
  const copyright = document.querySelector("#copyright");
  const mediaSection = document.querySelector("#media-section");
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
    }
  }

  function diplaydata(data) {
    title.innerHTML = data.title;

    if (data.hasOwnProperty("copyright")) {
      copyright.innerHTML = data.copyright;
    } else {
      copyright.innerHTML = "";
    }

    date.innerHTML = data.date;

    if (data.media_type == "video") {
      mediaSection.innerHTML = videoSection;
      document.getElementById("videoLink").src = data.url;
    } else {
      mediaSection.innerHTML = imageSection;
      document.getElementById("hdimg").href = data.hdurl;
      document.getElementById("image_of_the_day").src = data.url;
    }
    information.innerHTML = data.explanation;
  }
  fetchData();
}

// request.addEventListener("load", function () {
//   if (request.status == 200 && request.readyState == 4) {
//     getSpacePhoto();
//   }
// });
