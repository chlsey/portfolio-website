import { useState } from "react";
import { artworks } from "../data/art";

function Art() {
    const [index, setIndex] = useState(0);

    if (artworks.length === 0) {
        return <div className="slideshow-empty">No artworks yet — add some to src/data/art.ts.</div>;
    }

    const current = artworks[index];
    const goPrev = () => setIndex((i) => (i - 1 + artworks.length) % artworks.length);
    const goNext = () => setIndex((i) => (i + 1) % artworks.length);

    return (
        <div className="slideshow">
            <div
                className="slideshow-screen"
                style={{ backgroundImage: `url(${current.image})` }}
            >
                <div className="slideshow-caption">
                    <span className="slideshow-title">{current.title}</span>
                    {current.medium && <span className="slideshow-medium">{current.medium}</span>}
                </div>
            </div>

            <div className="slideshow-thumbs">
                {artworks.map((art, i) => (
                    <button
                        type="button"
                        key={art.id}
                        className={`slideshow-thumb${i === index ? " active" : ""}`}
                        style={{ backgroundImage: `url(${art.image})` }}
                        onClick={() => setIndex(i)}
                        aria-label={`View ${art.title}`}
                    />
                ))}
            </div>

            <div className="slideshow-controls">
                <button type="button" className="slideshow-nav" onClick={goPrev} aria-label="Previous artwork">
                    ◀
                </button>
                <span className="slideshow-counter">{index + 1} / {artworks.length}</span>
                <button type="button" className="slideshow-nav" onClick={goNext} aria-label="Next artwork">
                    ▶
                </button>
            </div>
        </div>
    );
}

export default Art;
