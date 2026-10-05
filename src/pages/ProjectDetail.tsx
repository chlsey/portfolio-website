import { useWindowManager } from "../context/WindowManager";
import type { Project } from "../data/projects";
import ImageViewer from "./ImageViewer";

type ProjectDetailProps = {
    project: Project;
};

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
                            <figure className="project-gallery-item" key={`${image.src}-${index}`}>
                                <img
                                    className="project-gallery-image"
                                    src={image.src}
                                    alt={image.caption ?? project.title}
                                    onDoubleClick={() => openImage(image.src, index, image.caption)}
                                />
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
