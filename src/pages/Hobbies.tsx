import { useState } from "react";
import { hobbies } from "../data/hobbies";

function Hobbies() {
    const [index, setIndex] = useState(0);

    if (hobbies.length === 0) {
        return <div className="slideshow-empty">No hobbies yet — add some to src/data/hobbies.ts.</div>;
    }

    const current = hobbies[index];
    const goPrev = () => setIndex((i) => (i - 1 + hobbies.length) % hobbies.length);
    const goNext = () => setIndex((i) => (i + 1) % hobbies.length);

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
                {hobbies.map((hobby, i) => (
                    <button
                        type="button"
                        key={hobby.id}
                        className={`slideshow-thumb${i === index ? " active" : ""}`}
                        style={{ backgroundImage: `url(${hobby.image})` }}
                        onClick={() => setIndex(i)}
                        aria-label={`View ${hobby.title}`}
                    />
                ))}
            </div>

            <div className="slideshow-controls">
                <button type="button" className="slideshow-nav" onClick={goPrev} aria-label="Previous artwork">
                    ◀
                </button>
                <span className="slideshow-counter">{index + 1} / {hobbies.length}</span>
                <button type="button" className="slideshow-nav" onClick={goNext} aria-label="Next artwork">
                    ▶
                </button>
            </div>
        </div>
    );
}

export default Hobbies;
