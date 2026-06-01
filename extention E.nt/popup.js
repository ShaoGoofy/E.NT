const bg = document.getElementById("bg");
const panelbg = document.getElementById("panelbg");
const sidebarbg = document.getElementById("sidebarbg")
const rounded = document.getElementById("rounded");
const bordercolor = document.getElementById("bordercolor");
const resetall = document.getElementById("resetall");
const animated = document.getElementById("animated");

// load bg
chrome.storage.local.get(["bg"], (result) => {
  bg.value = result.bg || "#121212";
});
// load panelbg
chrome.storage.local.get(["panelbg"], (result) => {
  panelbg.value = result.panelbg || "#121212";
});
// load sidebarbg
chrome.storage.local.get(["sidebarbg"], (result) => {
  sidebarbg.value = result.sidebarbg || "#0c0c0c"
});
// load bordercolor
chrome.storage.local.get(["bordercolor"], (result) => {
  bordercolor.value = result.bordercolor || "#b2b2b2";
});
// load rounded
chrome.storage.local.get(["rounded"], (result) => {
  rounded.checked = result.rounded === "20px";
});
chrome.storage.local.get(["roundedtop"], (result) => {
  rounded.checked = result.roundedtop == "20px 20px 0px 0px";
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
// save sidebarbg
sidebarbg.addEventListener("input", () => {
  chrome.storage.local.set({
    sidebarbg: sidebarbg.value
  });
});
//save panelbg
panelbg.addEventListener("input", () => {
  chrome.storage.local.set({
    panelbg: panelbg.value
  });
});
//save bordercolor
bordercolor.addEventListener("input", () => {
  chrome.storage.local.set({
    bordercolor: bordercolor.value
  });
});
// save rounded
rounded.addEventListener("change", () => {
  const value = rounded.checked ? "20px" : "0px";
  const value2 = rounded.checked ? "20px 20px 0px 0px" : "0px";
  chrome.storage.local.set({
    rounded: value,
    roundedtop: value2
  });
});
//save animated
animated.addEventListener("change", () => {
  const value = animated.checked ? "0.2s" : "0s";
  chrome.storage.local.set({
    animated: value
  });
});

// reset everything

resetall.addEventListener("click", () => {
  const defaults = {
    bg: "#121212",
    sidebarbg: "#0c0c0c",
    panelbg: "#242424",
    text: "#ffffff",
    bordercolor: "#b2b2b2",
    rounded: "20px",
    roundedtop: "20px 20px 0px 0px",
    animated: "0.2s"
  };
  chrome.storage.local.set(defaults);
  // update color pickers (ONLY color inputs)
  for (const key of ["bg", "sidebarbg", "panelbg", "text", "bordercolor"]) {
    const el = document.getElementById(key);
    if (el) {
      el.value = defaults[key];
    }
  }
  for (const key of ["rounded", "animated"]) {
    const el = document.getElementById(key);
    if (el) el.checked = defaults[key];
  }
});

