function isValidHex(value) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value.trim());
}
//color pickers
const bg = document.getElementById("bg");
const panelbg = document.getElementById("panelbg");
const sidebarbg = document.getElementById("sidebarbg")
const rounded = document.getElementById("rounded");
const bordercolor = document.getElementById("bordercolor");
const resetall = document.getElementById("resetall");
const animated = document.getElementById("animated");

//color text boxes

const bgtext = document.getElementById("bgtext");
const panelbgtext = document.getElementById("panelbgtext");
const bordercolortext = document.getElementById("bordercolortext")
const sidebarbgtext = document.getElementById("sidebarbgtext")

//load color pickers

// load bg
chrome.storage.local.get("bg").then((result) => {
  bg.value = result.bg || "#121212";
  bgtext.value = result.bg || "#121212";
});
// load panelbg
chrome.storage.local.get(["panelbg"], (result) => {
  panelbg.value = result.panelbg || "#242424";
  panelbgtext.value = result.panelbg || "#242424";
});
// load bordercolor
chrome.storage.local.get(["bordercolor"], (result) => {
  bordercolor.value = result.bordercolor || "#b2b2b2";
  bordercolortext.value = result.bordercolor || "#b2b2b2";
});
// load sidebarbg
chrome.storage.local.get(["sidebarbg"], (result) => {
  sidebarbg.value = result.sidebarbg || "#0c0c0c"
  sidebarbgtext.value = result.sidebarbg || "#0c0c0c"
});
// load rounded
chrome.storage.local.get(["rounded"], (result) => {
  rounded.value = result.rounded|| "0px";
});
//load animated
chrome.storage.local.get(["animated"], (result) => {
  animated.checked = result.animated === "0.2s";
});

// save bg
bg.addEventListener("input", () => {
  chrome.storage.local.set({
    bg: bg.value
  });
});
//save bordercolor
bordercolor.addEventListener("input", () => {
  chrome.storage.local.set({
    bordercolor: bordercolor.value
  });
});
//save panelbg
panelbg.addEventListener("input", () => {
  chrome.storage.local.set({
    panelbg: panelbg.value
  });
});
// save sidebarbg
sidebarbg.addEventListener("input", () => {
  chrome.storage.local.set({
    sidebarbg: sidebarbg.value
  });
});
// save rounded
rounded.addEventListener("change", () => {
  let value = rounded.value.trim();

  const num = parseInt(value, 10);

  // Check if it's a valid integer between 0 and 50
  if (!Number.isInteger(num) || num < 0 || num > 50) {
    rounded.value = "0px";

    chrome.storage.local.set({
      rounded: "0px",
    });

    return;
  }

  if (!value.endsWith("px") && !value.endsWith("rem")) {
    value += "px";
  }
  rounded.value = value;

  chrome.storage.local.set({
    rounded: value,
  });
});
//save animated
animated.addEventListener("change", () => {
  const value = animated.checked ? "0.2s" : "0s";
  chrome.storage.local.set({
    animated: value
  });
});
//save bgtext
bgtext.addEventListener("change", () => {
  let value = bgtext.value.trim();

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  if (!isValidHex(value)) {
    return;
  }

  bgtext.value = value;
  bg.value = value;
  chrome.storage.local.set({ bg: value });
});

//save panelbgtext
panelbgtext.addEventListener("change", () => {
  let value = panelbgtext.value.trim();

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  if (!isValidHex(value)) {
    return;
  }

  panelbgtext.value = value;
  panelbg.value = value;
  chrome.storage.local.set({ panelbg: value });
});

//save bordercolortext
bordercolortext.addEventListener("change", () => {
  let value = bordercolortext.value.trim();

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  if (!isValidHex(value)) {
    return;
  }

  bordercolortext.value = value;
  bordercolor.value = value;
  chrome.storage.local.set({ bordercolor: value });
});

//save sidebarbgtext
sidebarbgtext.addEventListener("change", () => {
  let value = sidebarbgtext.value.trim();

  if (!value.startsWith("#")) {
    value = "#" + value;
  }

  if (!isValidHex(value)) {
    return;
  }

  sidebarbgtext.value = value;
  sidebarbg.value = value;
  chrome.storage.local.set({ sidebarbg: value });
});
// reset everything

resetall.addEventListener("click", () => {
  const defaults = {
    bg: "#121212",
    bgtext: "#121212",
    panelbg: "#242424",
    panelbgtext: "#242424",
    bordercolor: "#b2b2b2",
    bordercolortext: "#b2b2b2",
    sidebarbg: "#0c0c0c",
    sidebarbgtext: "#0c0c0c",
    text: "#ffffff",
    rounded: "20px",
    animated: "0.2s"
  };
  chrome.storage.local.set(defaults);
  // update color pickers (ONLY color inputs)
  for (const key of ["bg", "bgtext", "panelbg", "panelbgtext", "bordercolor", "bordercolortext", "sidebarbg", "sidebarbgtext", "text", "rounded"]) {
    const el = document.getElementById(key);
    if (el) {
      el.value = defaults[key];
    }
  }
  for (const key of ["animated"]) {
    const el = document.getElementById(key);
    if (el) el.checked = defaults[key];
  }
});

