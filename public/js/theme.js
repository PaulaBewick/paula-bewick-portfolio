// theme toggle
const toggleButton = document.querySelector(".toggle-button");
toggleButton.addEventListener("change", toggleTheme, false);

const theme = {
  system: {
    "--primary-color": "#004f6b",
    "--secondary-color": "#1a8199",
    "--font-color": "#1a1a1a",
    "--bg-color": "#e9e7ea",
    "--heading-color": "#1a8199",
  },
  light: {
    "--primary-color": "#004f6b",
    "--secondary-color": "#1a8199",
    "--font-color": "#1a1a1a",
    "--bg-color": "#fff",
    "--heading-color": "#1a8199",
  },
  dark: {
    "--primary-color": "#49c6e0",
    "--secondary-color": "#7edbed",
    "--font-color": "#e1e1ff",
    "--bg-color": "#1a1a1a",
    "--heading-color": "#7edbed",
  },
};

function toggleTheme(e) {
  if (e.target.checked) {
    useTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    useTheme("light");
    localStorage.setItem("theme", "light");
  }
}

function useTheme(themeChoice) {
  document.documentElement.style.setProperty(
    "--primary-color",
    theme[themeChoice]["--primary-color"]
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    theme[themeChoice]["--secondary-color"]
  );
  document.documentElement.style.setProperty(
    "--font-color",
    theme[themeChoice]["--font-color"]
  );
  document.documentElement.style.setProperty(
    "--bg-color",
    theme[themeChoice]["--bg-color"]
  );
  document.documentElement.style.setProperty(
    "--heading-color",
    theme[themeChoice]["--heading-color"]
  );
}

const preferredTheme = localStorage.getItem("theme");
if (preferredTheme === "dark") {
  useTheme("dark");
  toggleButton.checked = true;
} else if (preferredTheme === "light") {
  useTheme("light");
  toggleButton.checked = false;
} else {
  useTheme("system");
  // toggleButton.checked = false;
}
