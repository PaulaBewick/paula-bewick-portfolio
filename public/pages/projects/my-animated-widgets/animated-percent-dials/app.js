// ready check function
function dialsReady(selector, callback) {
  window.addEventListener("DOMContentLoaded", function () {
    const elements = [...document.querySelectorAll(selector)];
    // if dials are already in view, run the callback
    if (elements.length) {
      elements.forEach((element) => {
        let top = element.getBoundingClientRect().top;
        let offset = (window.innerHeight * 3) / 4;
        if (top < offset) {
          callback(element);
        } else {
          // if dials are not in view, wait until scrolled into view to run the callback
          let activate = () => {
            top = element.getBoundingClientRect().top;
            if (top < offset) {
              callback(element);
              window.removeEventListener("scroll", activate);
            }
          };
          window.addEventListener("scroll", activate);
        }
      });
    }
  });
}

dialsReady(".svg-dials", (elements) => {
  const svgs = [...document.querySelectorAll(".svg-dials")];

  // setting up the attributes for the svg circles
  svgs.forEach((mySvg) => {
    let w = mySvg.width.baseVal.value;
    let h = mySvg.height.baseVal.value;
    let cx = w / 2;
    let cy = h / 2;
    let radius = 100;
    let perimeter = 2 * Math.PI * radius;
    let color;

    // creates the circles
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", "0.4cm");
    circle.setAttribute("stroke-dasharray", "0 " + perimeter);
    circle.setAttribute("stroke-dashoffset", perimeter * 0.99);
    mySvg.appendChild(circle);

    // creates the text inside the dials
    let dialText = mySvg.parentNode.querySelector(".dial-percent-text");
    dialText.style.color = "inherit";

    let options = {
      percent: dialText.innerText || 0,
      // if there is no text entered, utilization % will display 0
    };

    let p = parseInt(options.percent);

    function updateDial(perc) {
      circle.setAttribute(
        "stroke-dasharray",
        perimeter * perc + " " + perimeter * (1 - perc)
      );
      dialText.innerHTML = Math.round(perc * 100) + "%";
      setColor(perc);
    }

    // animates the dial
    animateDial(0, p / 100);

    function animateDial(from, to) {
      let start = null;
      let progress = 0;
      let duration = 1500;

      function step(timestamp) {
        if (!start) start = timestamp;
        progress = (timestamp - start) / duration;
        let perc = from + (to - from) * progress;
        if (perc < to) {
          requestAnimationFrame(step);
          updateDial(perc);
        } else {
          updateDial(to);
        }
      }
      requestAnimationFrame(step);
    }
    function setColor(perc) {
      let percent = perc * 100;
      let gradientId = "gradient" + Math.round(percent);
      // create a gradient element
      let gradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "radialGradient"
      );
      gradient.setAttribute("id", gradientId);
      gradient.setAttribute("cx", "60%");
      gradient.setAttribute("cy", "140%");
      gradient.setAttribute("r", "170%");
      gradient.setAttribute("fx", "100%");
      gradient.setAttribute("fy", "100%");
      // add the gradient to the svg
      mySvg.appendChild(gradient);

      // create and append the gradient stops
      let stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("stop-color", "var(--color-main-bright)");
      gradient.appendChild(stop1);

      let stop3 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop3.setAttribute("offset", "60%");
      stop3.setAttribute("stop-color", "var(--color-light-pink)");
      gradient.appendChild(stop3);

      let stop4 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop4.setAttribute("offset", "100%");
      stop4.setAttribute("stop-color", "var(--color-main-tint)");
      gradient.appendChild(stop4);

      color = "url(#" + gradientId + ")";
      circle.setAttribute("stroke", color);
    }
  });
});
