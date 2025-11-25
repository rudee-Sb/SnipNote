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
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) return;

            chrome.tabs.sendMessage(
                tabs[0].id,
                { type: "REQUEST_SNIPPET" },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.log("No content script found:", chrome.runtime.lastError.message);
                        return;
                    }
                    console.log("Received:", response);
                }
            );
        });

    }
});

// save snippet to storage
function saveSnippet(snippet) {
    chrome.storage.local.get(["snippets"], (result) => {
        const existing = result.snippets || [];
        const updated = [snippet, ...existing];

        chrome.storage.local.set({ snippets: updated }, () => {
            console.log("Snippets saved", updated);
        });
    });
}

// listen for direct broadcast messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SNIPPET_CAPTURED") {
        saveSnippet(message.payload);
        console.log("Captured snippet from content script:", message.payload);
    }
});
