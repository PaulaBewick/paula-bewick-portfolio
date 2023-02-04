// apitest.html js

// Constant URL value for JAAS API
const API_URL = "https://fakerapi.it/api/v1/";

const apiForm = document.querySelector("#api-form");
// console.log(musicForm);
apiForm.addEventListener("submit", getSpacePhoto);
console.log("loaded");
function getSpacePhoto(event) {
  event.preventDefault();
  console.log("here");
  let formData = new FormData(apiForm);
  console.log(formData);
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=gM26T2mHGZnfJauqVf3DIGnVp1N327ULC23ChufV`
  ).then((response) => {
    console.log(response);
  });
}

// https://fakerapi.it/api/v1/images?_quantity=1&_type=kittens&_height=300
