function DropDown(dropDown) {
  const [toggler, menu] = dropDown.children;

  const handleClickOut = (e) => {
    if (!dropDown) {
      return document.removeEventListener("click", handleClickOut);
    }

    if (!dropDown.contains(e.target)) {
      this.toggle(false);
    }
  };

  const setValue = (item) => {
    const val = item.textContent;
    toggler.textContent = val;
    this.value = val;
    this.toggle(false);
    dropDown.dispatchEvent(new Event("change"));
    toggler.focus();
  };

  const handleItemKeyDown = (e) => {
    if (e.keyCode === 9) {
      return;
    }

    e.preventDefault();

    if (e.keyCode === 38 && e.target.previousElementSibling) {
      // up
      e.target.previousElementSibling.focus();
    } else if (e.keyCode === 40 && e.target.nextElementSibling) {
      // down
      e.target.nextElementSibling.focus();
    } else if (e.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      setValue(e.target);
    }
  };

  const handleToggleKeyPress = (e) => {
    if (e.keyCode === 9) {
      return;
    }

    e.preventDefault();

    if (menu.getAttribute("aria-expanded") === "true") {
      const items = [...menu.children];
      const focusedIndex = items.findIndex(
        (item) => item === document.activeElement
      );
      if (e.keyCode === 9) {
        // tab key
        if (e.shiftKey && focusedIndex === 0) {
          this.toggle(false);
        } else if (!e.shiftKey && focusedIndex === items.length - 1) {
          this.toggle(false);
        } else {
          const nextIndex = e.shiftKey ? focusedIndex - 1 : focusedIndex + 1;
          items[nextIndex].focus();
        }
      }
    } else {
      if (e.keyCode === 27) {
        // escape key
        this.toggle(false);
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        // enter or spacebar key
        this.toggle(true);
      }
    }
  };

  toggler.addEventListener("keydown", handleToggleKeyPress);
  toggler.addEventListener("click", () => this.toggle());
  [...menu.children].forEach((item, index, items) => {
    item.addEventListener("keydown", handleItemKeyDown);
    item.addEventListener("click", () => setValue(item));
    item.addEventListener("mouseenter", () => {
      const focusedItem = menu.querySelector(":focus");
      if (focusedItem && focusedItem !== item) {
        focusedItem.blur();
      }
    });
    if (index === items.length - 1) {
      item.addEventListener("keydown", (e) => {
        if (e.keyCode === 9) {
          // tab key
          this.toggle(false);
          const nextButton =
            dropDown.nextElementSibling.querySelector("button");
          nextButton.focus();
        }
      });
    }
  });

  this.element = dropDown;

  this.value = toggler.textContent;

  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;

    menu.setAttribute("aria-expanded", expand);

    if (expand) {
      toggler.classList.add("active");
      menu.children[0].focus();
      document.addEventListener("click", handleClickOut);
      dropDown.dispatchEvent(new Event("opened"));
    } else {
      toggler.classList.remove("active");
      dropDown.dispatchEvent(new Event("closed"));
      document.removeEventListener("click", handleClickOut);
    }
  };
}

const dropdowns = document.querySelectorAll(".dropdown");
const dropdownInstances = Array.from(dropdowns).map(
  (dropdown) => new DropDown(dropdown)
);

dropdownInstances.forEach((dropDown) => {
  dropDown.element.addEventListener("change", (e) => {});

  dropDown.element.addEventListener("opened", (e) => {});

  dropDown.element.addEventListener("closed", (e) => {});
});
