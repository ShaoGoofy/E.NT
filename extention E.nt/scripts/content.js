chrome.storage.local.get(["bg", "sidebarbg", "panelbg", "text", "bordercolor", "rounded", "animated"], (result) => {

    document.documentElement.style.setProperty(
        "--bg",
        result.bg || "#121212"
    );

    document.documentElement.style.setProperty(
        "--sidebarbg",
        result.sidebarbg || "#0c0c0c"
    );

    document.documentElement.style.setProperty(
        "--panelbg",
        result.panelbg || "#242424"
    )

    document.documentElement.style.setProperty(
        "--text",
        result.text || "#ffffff"
    );

    document.documentElement.style.setProperty(
        "--bordercolor",
        result.bordercolor || "#b2b2b2"
    );

    document.documentElement.style.setProperty(
        "--rounded",
        result.rounded || "0px"
    );

    document.documentElement.style.setProperty(
        "--animated",
        result.animated || "0s"
   );

});
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;

    for (const [key, value] of Object.entries(changes)) {
        document.documentElement.style.setProperty(
            `--${key}`,
            value.newValue
        );
    }
});
