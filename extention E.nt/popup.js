const bg = document.getElementById("bg");
const rounded = document.getElementById("rounded");
const bordercolor = document.getElementById("bordercolor");
const resetall = document.getElementById("resetall");

// LOAD bg
chrome.storage.local.get(["bg"], (result) => {
  bg.value = result.bg || "#121212";
});

chrome.storage.local.get(["bordercolor"], (result) => {
  bordercolor.value = result.bordercolor || "#b2b2b2";
});
// LOAD rounded
chrome.storage.local.get(["rounded"], (result) => {
  rounded.checked = result.rounded === "20px";
});
chrome.storage.local.get(["roundedtop"], (result) => {
  rounded.checked = result.roundedtop == "20px 20px 0px 0px";
});

// SAVE bg
bg.addEventListener("input", () => {
  chrome.storage.local.set({
    bg: bg.value
  });
});
bordercolor.addEventListener("input", () => {
  chrome.storage.local.set({
    bordercolor: bordercolor.value
  });
});
// SAVE rounded
rounded.addEventListener("change", () => {
  const value = rounded.checked ? "20px" : "0px";
  const value2 = rounded.checked ? "20px 20px 0px 0px" : "0px";
  chrome.storage.local.set({
    rounded: value,
    roundedtop: value2
  });
});

// reset everything

resetall.addEventListener("click", () => {
  chrome.storage.local.remove([
    "bg",
    "rounded",
    "roundedtop",
    "bordercolor"
  ], () => {
    location.reload();
  });
});

