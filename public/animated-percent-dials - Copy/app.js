// ready check function
function dialsReady(selector, callback) {
  window.addEventListener("DOMContentLoaded", function () {
    const elements = [...document.querySelectorAll(selector)];
    if (elements.length) {
      elements.forEach((element) => {
        // waits until element is scrolled into view to activate
        let activate = () => {
          let top = element.getBoundingClientRect().top;
          let offset = (window.innerHeight * 3) / 4;
          if (top < offset) {
            // execute the code inside callback
            callback(element);
            window.removeEventListener("scroll", activate);
          }
        };
        window.addEventListener("scroll", activate);
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

    // sets the dial colors based on utilization %
    // red for too high, yellow for too low, green for good
    function setColor(perc) {
      let percent = perc * 100;
      switch (true) {
        case percent < 75:
          color = "#a93928";
          break;
        case percent >= 75 && percent <= 90:
          color = "#86aa3f";
          break;
        case percent > 90:
          color = "#ddb027";
          break;
      }
      circle.setAttribute("stroke", color);
    }
  });
});
