chrome.storage.local.get(["bg", "text", "bordercolor", "rounded", "roundedtop"], (result) => {

    document.documentElement.style.setProperty(
        "--total-background-color",
        result.bg || "#121212"
    );

    document.documentElement.style.setProperty(
        "--text",
        result.text || "#ffffff"
    );

    document.documentElement.style.setProperty(
        "--bordercolor",
        result.bordercolor || "#b2b2b2"
    );

    document.documentElement.style.setProperty(
        "--border-radius",
        result.rounded || "0px"
    );

    document.documentElement.style.setProperty(
        "--border-radius-top",
        result.roundedtop || "0px"
    );

});
