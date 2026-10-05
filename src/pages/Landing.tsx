import { useState } from "react";
import TypingTitle from "../components/TypingTitle";
import { currentlyReading, favoriteSong } from "../data/now";

const GITHUB_USERNAME = "chlsey";
const EMAIL = "chelseywang0219@gmail.com";
const AVATAR_SRC = `${import.meta.env.BASE_URL}profile/avatar.jpg`;
const SOCIAL_LINKS: { label: string; href: string; icon: string }[] = [
    { label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, icon: "🐙" },
    { label: "LinkedIn", href: 'https://www.linkedin.com/in/chelseyjuntingwang', icon: "💼" },
    { label: "Instagram (art)", href: 'https://www.instagram.com/peachbowlss', icon: "🎨" },
    { label: "Pinterest", href: 'https://ca.pinterest.com/chelsuauah/_created/', icon: "📌" },
    { label: "chelseywang0219 @gmail.com", href: `mailto:${EMAIL}`, icon: "✉️" },
];

function Landing() {
    const [avatarFailed, setAvatarFailed] = useState(false);

    return (
        <div className="profile-card">
            <aside className="profile-sidebar">
                <div className="profile-avatar" aria-hidden={avatarFailed}>
                    {avatarFailed ? (
                        <span aria-hidden="true">👤</span>
                    ) : (
                        <img
                            className="profile-avatar-image"
                            src={AVATAR_SRC}
                            alt="Profile"
                            onError={() => setAvatarFailed(true)}
                        />
                    )}
                </div>

                <p className="profile-handle">@chlsey</p>
                <div className="profile-status">
                    <span className="status-dot" />
                    <span>online</span>
                </div>

                <ul className="profile-socials">
                    {SOCIAL_LINKS.map((link) => {
                        const isMailto = link.href.startsWith("mailto:");
                        return (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    {...(!isMailto && { target: "_blank", rel: "noreferrer noopener" })}
                                >
                                    <span aria-hidden="true">{link.icon}</span> {link.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <div className="profile-main">
                <TypingTitle name="Chelsey" />
                <p className="profile-bio">
                    Hi! I'm a software developer specializing in backend and fullstack development. Welcome!!
                </p>
                <p className="profile-hint">
                    💡 Click on any of the icons to find out more about me :]
                </p>

                <section className="profile-now">
                    <h2>Right now</h2>
                    <ul className="now-list">
                        {currentlyReading.map((book) => (
                            <li key={book.title}>
                                📚 <strong>{book.title}</strong>
                                {book.author && ` — ${book.author}`}
                            </li>
                        ))}
                        <li>
                            🎵 <strong>{favoriteSong.title}</strong>
                            {favoriteSong.artist && ` — ${favoriteSong.artist}`}
                        </li>
                    </ul>
                </section>

                <section className="profile-github">
                    <h2>GitHub activity</h2>
                    <a
                        className="profile-github-link"
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img
                            className="profile-github-chart"
                            src={`https://ghchart.rshah.org/2a7fe0/${GITHUB_USERNAME}`}
                            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                        />
                    </a>
                </section>
            </div>
        </div>
    );
}

export default Landing;
