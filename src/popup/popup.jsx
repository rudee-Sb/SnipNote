// fetches and rendrs snippets

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import SnippetCard from "../components/snippetCard";
import { getSnippets, deleteSnippets } from "../storage/storage";

function Popup() {

    const [snippets, setSnippets] = useState([]);

    const loadSnippets = () => {
        getSnippets((data) => setSnippets(data));
    }

    useEffect(() => {
        loadSnippets();
        chrome.storage.onChanged.addListener(loadSnippets);
    }, [])

    const handleDelete = (timestamp) => {
        deleteSnippets(timestamp, loadSnippets);
    };

    return (
        <>
            <div style={{ padding: "10px", width: "300px" }}>
                <h2 style={{ color: "#ccc" }}>SnipNote</h2>
                {snippets.length === 0 ?
                    (<p>No snippets yet. Highlight something and Save.</p>
                    ) : (
                        snippets.map((snippet) => (
                            <SnippetCard
                                key={snippet.timestamp}
                                snippet={snippet}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
            </div>
        </>
    )
}

const root = createRoot(document.getElementById("root"));
root.render(<Popup />);