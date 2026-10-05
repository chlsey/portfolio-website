import { useState } from "react";

type StickyNoteProps = {
    defaultText?: string;
};

function StickyNote({ defaultText = "" }: StickyNoteProps) {
    const [text, setText] = useState(defaultText);

    return (
        <div className="sticky-note">
            <textarea
                className="sticky-note-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a note…"
                aria-label="Sticky note"
            />
        </div>
    );
}

export default StickyNote;
