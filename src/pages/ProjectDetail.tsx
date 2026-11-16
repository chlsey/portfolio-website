import { useState } from "react";
import { useWindowManager } from "../context/WindowManager";
import type { Project } from "../data/projects";
import ImageViewer from "./ImageViewer";

type ProjectDetailProps = {
    project: Project;
};

const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const youtubeEmbed = (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

function VideoThumb({ videoId, title, thumb }: { videoId: string; title: string; thumb?: string }) {
    const [playing, setPlaying] = useState(false);
    if (playing) {
        return (
            <iframe
                className="project-gallery-video"
                src={youtubeEmbed(videoId)}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
            />
        );
    }
    return (
        <button
            type="button"
            className="project-gallery-video-thumb"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
        >
            <img className="project-gallery-image" src={thumb ?? youtubeThumb(videoId)} alt={title} />
            <span className="project-gallery-play" aria-hidden="true">▶</span>
        </button>
    );
}

function ProjectDetail({ project }: ProjectDetailProps) {
    const { openWindow } = useWindowManager();

    const openImage = (src: string, index: number, caption?: string) => {
        openWindow({
            id: `image:${project.id}:${index}`,
            title: caption ?? project.title,
            content: <ImageViewer src={src} alt={caption ?? project.title} caption={caption} />,
            width: 760,
            height: 580,
            center: true,
        });
    };

    return (
        <div className="project-detail">
            <h1>{project.title}</h1>
            {project.dateRange && <p className="project-detail-daterange">📅 {project.dateRange}</p>}
            {project.summary && <p className="project-detail-summary">{project.summary}</p>}

            {project.techStack.length > 0 && (
                <section className="project-detail-section">
                    <h2>Tech Stack</h2>
                    <ul className="tech-stack-list">
                        {project.techStack.map((tech) => (
                            <li key={tech} className="tech-pill">{tech}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="project-detail-section">
                <h2>About</h2>
                <p className="project-detail-about">{project.description}</p>
            </section>

            {project.images && project.images.length > 0 && (
                <section className="project-detail-section">
                    <h2>Gallery</h2>
                    <div className="project-gallery">
                        {project.images.map((image, index) => (
                            <figure
                                className={`project-gallery-item${image.videoId ? " is-video" : ""}`}
                                key={`${image.videoId ?? image.src}-${index}`}
                            >
                                {image.videoId !== undefined ? (
                                    <VideoThumb
                                        videoId={image.videoId}
                                        title={image.caption ?? project.title}
                                        thumb={image.src}
                                    />
                                ) : (
                                    <img
                                        className="project-gallery-image"
                                        src={image.src}
                                        alt={image.caption ?? project.title}
                                        onDoubleClick={() => openImage(image.src, index, image.caption)}
                                    />
                                )}
                                {image.caption && (
                                    <figcaption className="project-gallery-caption">
                                        {image.caption}
                                    </figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                </section>
            )}

            {project.links.length > 0 && (
                <section className="project-detail-section">
                    <h2>Links</h2>
                    <ul className="project-links-list">
                        {project.links.map((link) => (
                            <li key={link.url}>
                                <a href={link.url} target="_blank" rel="noreferrer noopener">
                                    {link.label} ↗
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default ProjectDetail;
