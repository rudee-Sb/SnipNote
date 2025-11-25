export function getSnippets(cb) {
    chrome.storage.local.get(["snippets"], res => cb(res.snippets || []));
}

export function saveSnippets(list) {
    chrome.storage.local.set({ snippets: list });
}

export function deleteSnippets(id, cb) {
    getSnippets(list => {
        const updated = liat.filter(item => item.timestamp !== id);
        saveSnippets(updated);
        cb(updated);
    });
}