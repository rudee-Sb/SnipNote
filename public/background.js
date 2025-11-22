// create context menu when installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "saveSnippet",
        title: "Save Snippet",
        contexts: ["selection"]
    });
});

// listen for context menu clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveSnippet") {
        chrome.tabs.sendMessage(tab.id, { type: "REQUEST_SNIPPET" }, (snippet) => {
            if (chrome.runtime.lastError) {
                console.log("Error sending request to content script:", chrome.runtime.lastError);
                return;
            }

            if (snippet && snippet.text) {
                saveSnippet(snippet);
                console.log("Snippet recieved & saved:", snippet);
            }
        });
    }
});

// save snippet to storage
function saveSnippet(snippet) {
    chrome.storage.local.get(["snippets"], (result) => {
        const existing = result.snippets || [];
        const updated = [snippet, ...existing];

        chrome.storage.local.set({ snippet: updated }, () => {
            console.log("Snippets saved", updated);
        });
    });
}

// listen from conten script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SNIPPET_CAPTURED") {
        saveSnippet(message.payload);
        console.log("Captured snippet from content script:", message.payload);
    }
});