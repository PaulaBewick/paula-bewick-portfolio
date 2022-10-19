//////////////////////// CUSTOM TASK LIST ////////////////////////

//////////////////////// DECLARING VARIABLES ////////////////////////

// reference an element from the html and assign it to a JS variable

const darkModeArea = document.getElementById("dark-mode-area");
const headline = document.getElementById("headline");
const body = document.body;
const header = document.getElementsByTagName("header");
const wrapper = document.getElementsByTagName("wrapper");
const button = document.getElementsByTagName("button");
const div = document.getElementsByTagName("div");
const highlights = document.getElementsByClassName("highlight");
const listItems = document.getElementsByTagName("li");
const itemsOdd = document.querySelectorAll("li:nth-child(odd)");
const btnCreateTask = document.getElementById("btn-create-task");
const btnNameUpdate = document.getElementById("btn-add-name");
const btnRemove = document.querySelector(".btn-remove");
const allButtons = document.querySelectorAll(".all-buttons");
const btnToggleList = document.querySelector(".btn-toggle");
const inputCreateTask = document.getElementById("input-create-task");
const inputNameUpdate = document.getElementById("input-add-name");
let motivationSnippet = document.getElementsByClassName("motivation-snippet");

//add date to header
let date = new Date().toLocaleDateString();
headline.textContent = date;

//////////////////////// EVENT LISTENERS ////////////////////////

/*body.addEventListener("click", () => {
  // instructs the browser to "do something" when it is clicked
  body.innerHTML = "<h1>Hello, world!</h1>"; // tells the browser to manipulate the body element by changing the inner html for click event
});*/

btnRemove.addEventListener("click", () => {
  const lastItem = document.querySelector("li:last-child");
  lastItem.remove();
});

btnToggleList.addEventListener("click", () => {
  const listContainer = document.querySelector(".list-container");
  if (listContainer.style.display === "none") {
    listContainer.removeAttribute("style");
    btnToggleList.textContent = "Hide List";
  } else {
    listContainer.style.display = "none";
    btnToggleList.textContent = "Show List";
  }
});

btnCreateTask.addEventListener("click", () => {
  const inputCreateTask = document.querySelector(".input-create-task");
  const list = document.querySelector("ul");
  list.insertAdjacentHTML("afterbegin", `<li>${inputCreateTask.value}</li>`);

  // const item = document.createElement("li");
  // item.textContent = inputTask.value;
  // // append adds to end, prepend adds to beginning
  // list.prepend(item);
  inputCreateTask.value = ""; // this clears the input field
});

//////////////////////// Practicing Styling with JS ////////////////////////

// convert a nodeList to an array and then assign properties to items within the array
const spanLi = [...document.querySelectorAll("li")];
spanLi.forEach(
  (element) => (element.style.fontFamily = "Century Gothic, Arial, sans serif")
);

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].style.letterSpacing = "3px";
  // allButtons[i].style.fontVariant = "small-caps";
}

for (let i = 0; i < itemsOdd.length; i++) {
  itemsOdd[i].style.backgroundColor = "var(--color-ternary-accent)";
  // itemsOdd[i].style.borderRadius = "25px";
}

// 'for of' loop, like a for loop but more compact

for (let highlight of highlights) {
  // provide a variable that represents the current item being processed in the loop
  highlight.style.backgroundColor = "var(--color-secondary-accent)";
  highlight.style.color = "var(--color-contrast-text)";
}

//////////////////////// BONUS PRACTICE CODE ////////////////////////

// ALLOW USER TO ADD THEIR NAME

// this allows the user to add their name, which then stores the value and updates the motivation snippet with their name

let userName = ""; // creating a variable for the username so that I can assign its value and use it later
const nameInput = document.querySelector(".btn-add-name");

btnNameUpdate.addEventListener("click", () => {
  // headline.textContent = `${nameInput.value}'s Day —  ${date}`;
  // headline.className = "grow"; // use input.className to set the attribute of a input's class
  // Select the <input> element and assign its value to the variable userName.
  nameInput.value = ""; // this clears the input field
});

function myFunction() {
  var name = document.getElementById("input-add-name").value;
  document.getElementById("snippet").innerHTML = `Hi ${name}! ${newSnippet}`;
  localStorage.setItem("userName", name);
  // document.getElementById("storedName").innerHTML =
  //   localStorage.getItem("userName");
}

if (
  localStorage.getItem("userName") != undefined ||
  localStorage.getItem("userName") !== null
) {
  //To Do
}

// creating motivational snippet array

function getMotivationSnippet(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const randomSnippet = arr[randomIndex];
  return randomSnippet;
}

const array = [
  "You've got this!",
  "Good luck today!",
  "You're doing great!",
  "Keep going, keep focused!",
];

const newSnippet = getMotivationSnippet(array);

// CREATING A CUSTOM DARK MODE OPTION

// set theme based on user choice and save preference to local storage
const BtnLightMode = document.querySelector(".light-btn");
const BtnDarkMode = document.querySelector(".dark-btn");
const BtnAestheticMode = document.querySelector(".aesthetic-btn");

const setTheme = function (theme) {
  document.documentElement.className = theme;
  localStorage.setItem("theme", theme);
};

// load saved theme preference from local storage
const getTheme = () => {
  const theme = localStorage.getItem("theme");
  theme && setTheme(theme);
};

getTheme();

BtnDarkMode.addEventListener("click", () => {
  setTheme("dark");
});

BtnLightMode.addEventListener("click", () => {
  setTheme("light");
});

BtnAestheticMode.addEventListener("click", () => {
  setTheme("aesthetic");
});

// old dark mode implementation

// const BtnDarkMode = document.getElementById("btn-dark-mode");
// const theme = window.localStorage.getItem("theme");

// /* checks if the theme stored in local storage is dark
// if yes apply the dark theme to the body */
// if (theme === "dark") document.body.classList.add("dark");

// // event listener stops when the change theme button is clicked
// BtnDarkMode.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
//   if (theme === "dark") {
//     window.localStorage.setItem("theme", "light");
//   } else {
//     window.localStorage.setItem("theme", "dark");
// });

// // storing color theme on the user's machine
// localStorage.setItem("theme", "dark");

// //accessing the user's preferred color theme
// localStorage.getItem("theme");
// // dark

//////////////////////// NOTES ////////////////////////

// querySelector is a very flexible selector, it can select for classes, tag names, IDs and pretty much any css selector. They work specifically well with descendent and attribute selectors. The querySelector method returns the first element that matches the specified selector and querySelectorAll returns a collection of all elements or nodes matching the given selector. for querySelectors you need to specify the selector exactly as you'd write it in css.

/*
HTMLCollection is an array-like object that has a collection of document elements.
These two methods return the HTMLCollection object.
getElementByTagName() and
getElementsByClassName()

A NodeList object is a collection of document nodes (element nodes, attribute nodes, and text nodes).
Methods that return NodeList are:
getElementsByName()
querySelectorAll()

A NodeList and an HTMLCollection are very similar. They're both array-like collections of DOM nodes in the order they appear on the page. A NodeList is more flexible than an HTMLCollection. It can contain any type of DOM node. For example, a NodeList can contain element nodes and text nodes. You can also iterate through a NodeList in the same way you would an array, using a for loop, for of, and other array iteration methods, like map and forEach. However, an HTMLCollection can contain HTML elements only and you can't loop over it exactly as you would an array. 

The main difference to remember between an HTMLCollection and a NodeList is that HTML collection is a live data structure and NodeList is a static data structure. An HTMLCollection automatically updates each time it detects a change in the items retrieved by a method. A NodeList remains the same, no matter the changes that occur in your HTML. In other words, every time a new element gets appended to the DOM, with JavaScript for example, an HTMLCollection will recognize the new element, while a NodeList will not.*/
