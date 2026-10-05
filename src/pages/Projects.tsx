import { useEffect, useState } from "react";
import { useWindowManager } from "../context/WindowManager";
import { projects, type Project } from "../data/projects";
import FileIcon from "../components/FileIcon";
import ProjectDetail from "./ProjectDetail";

const WINDOW_ID: string = "projects";

function ProjectFileIcon({ project }: { project: Project }) {
    const previewSrc = project.icon ?? project.images?.[0]?.src;
    if (previewSrc) {
        return <img className="file-icon-preview" src={previewSrc} alt="" />;
    }
    return <FileIcon />;
}

function Projects() {
    const { setTitle, setBackHandler } = useWindowManager();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = selectedId ? projects.find((p) => p.id === selectedId) ?? null : null;

    // Swap the window's own titlebar title and back-button between the
    // file list and a selected project's detail view.
    useEffect(() => {
        if (selected) {
            setTitle(WINDOW_ID, selected.title);
            setBackHandler(WINDOW_ID, () => setSelectedId(null));
        } else {
            setTitle(WINDOW_ID, "Projects");
            setBackHandler(WINDOW_ID, null);
        }
        return () => setBackHandler(WINDOW_ID, null);
    }, [selected, setTitle, setBackHandler]);

    if (selected) {
        return <ProjectDetail project={selected} />;
    }

    return (
        <div className="file-explorer">
            {projects.map((project) => (
                <button
                    type="button"
                    key={project.id}
                    className="file-item"
                    onDoubleClick={() => setSelectedId(project.id)}
                >
                    <ProjectFileIcon project={project} />
                    <span className="file-name">{project.title}</span>
                </button>
            ))}
        </div>
    );
}

export default Projects;
