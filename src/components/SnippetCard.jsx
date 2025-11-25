import { useState } from "react";

export default function SnippetCard({ snippet, onDelete }) {
    return (
        <>
            <div>
                <p>{snippet.text}</p>
                <small>{snippet.url}</small>
                <br />
                <button onClick={() => onDelete(snippet.timestamp)}>Delete</button>
            </div>
        </>
    )
}