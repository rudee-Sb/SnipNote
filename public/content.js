document.addEventListener("mouseup", handleSelection);
document.addEventListener("keyup", handleSelection);

function handleSelection() {
    const selected = window.getSelection().toString.trim();
    if (!selected) return;

    const snippet = {
        text: selected,
        url: window.location.href,
        title: document.title,
        timestamp: Date.now()
    }

    chrome.runtime.sendMessage({
        type: "SNIPPET_CAPTURED",
        payload: snippet
    });
};
