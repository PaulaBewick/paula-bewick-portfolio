// ready check function
const counterReady = (selector, callback) => {
  window.addEventListener("DOMContentLoaded", () => {
    const elems = [...document.querySelectorAll(selector)];
    elems.forEach(callback);
  });
};

counterReady(".counter-number", (stat) => {
  // pattern used to seperate input number from html into an array of numbers and non numbers
  const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
  const counterTime = 1500;
  let fresh = true;

  let result = [...patt.exec(stat.textContent)];
  result.shift();
  result = result.filter(Boolean);

  while (stat.firstChild) {
    stat.removeChild(stat.firstChild);
  }

  // creates the animated numbers
  result.forEach((res) => {
    if (isNaN(res)) {
      stat.insertAdjacentHTML("beforeend", `<span>${res}</span>`);
    } else {
      const digits = [...res];
      digits.forEach((digit) => {
        stat.insertAdjacentHTML(
          "beforeend",
          `<span data-value="${digit}">
            <span>&ndash;</span>
            ${Array(parseInt(digit) + 1)
              .fill()
              .map((_, j) => `<span>${j}</span>`)
              .join("")}
          </span>`
        );
      });
    }
  });

  let ticks = [...stat.querySelectorAll("span[data-value]")];

  // waits until element is scrolled into view to activate
  let activate = () => {
    let top = stat.getBoundingClientRect().top;
    let offset = (window.innerHeight * 3) / 4;

    setTimeout(() => {
      fresh = false;
    }, counterTime);

    if (top < offset) {
      setTimeout(
        () => {
          ticks.forEach((tick) => {
            const dist = parseInt(tick.getAttribute("data-value")) + 1;
            tick.style.transform = `translateY(-${dist * 100}%)`;
          });
        },
        fresh ? counterTime : 0
      );
      window.removeEventListener("scroll", activate);
    }
  };

  window.addEventListener("scroll", activate);
  activate();
});
