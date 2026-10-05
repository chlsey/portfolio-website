const base = import.meta.env.BASE_URL;

export type ProjectLink = {
    label: string;
    url: string;
};

export type ProjectImage = {
    src: string;
    caption?: string;
};

export type Project = {
    id: string;
    title: string;
    summary: string;
    description: string;
    techStack: string[];
    links: ProjectLink[];
    images?: ProjectImage[];
    /** Thumbnail shown in the Projects file list. Falls back to the first
     *  gallery image, then to a generic file icon, if omitted. */
    icon?: string;
    /** Free-form, e.g. "Jan 2024 – Mar 2024" or just "Jun 2025". */
    dateRange?: string;
};

// Each entry here becomes one "file" in the Projects window, and the
// detail view (same window) when double-clicked. Replace these
// placeholders with your real projects.
export const projects: Project[] = [
    {
        id: "rl-framework",
        title: "Deep Reinforcement Learning Framework (Research)",
        summary:
            "A research framework that uses deep RL to adapt game difficulty through PCG to player performance and to automate level playtesting.",
        description:
            "An ongoing research project building a deep reinforcement learning framework in Unity and PyTorch " +
            "that adapts level difficulty and content based on player performance data for a dungeon crawler game.\n\n" +
            "A second goal is training RL agents to playtest levels autonomously and flag design problems such " +
            "as unbeatable sections, difficulty spikes, and exploits. This reduces the manual QA effort needed " +
            "as game content scales.",
        techStack: ["Unity", "PyTorch", "Python", "C#", "Reinforcement Learning"],
        links: [
            { label: "RL Framework", url: "https://github.com/kcccr123/unity-reinforcement-learning" },
            { label: "QA Framework", url: "https://github.com/kcccr123/rein-powered-QA-framework" },
            { label: "PCG Framework + Unity game", url: "https://github.com/chlsey/kawaii-power-little-adventure" },
        ],
        images: [
            {
                src: `${base}projects/rl-pcg.png`, 
                caption: "Preliminary generation of a dungeon crawler level using PCG while setting up workflows.",
            },
        ],
    },
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        summary: "My portfolio site! A frutiger aero, Windows-95-styled desktop portfolio.",
        description:
            "I used TypeScript and React to build this retro-styled portfolio website. " +
            "Every section lives in its own draggable, resizable window. " +
            "I also designed the UI and created the backgrounds for the aquarium and the desktop wallpaper. ",
        techStack: ["React", "TypeScript", "Vite"],
        links: [
            { label: "GitHub", url: "https://github.com/chlsey/portfolio-website" },
        ],
        images: [
            {
                src: `${base}projects/portfolio.png`,
                caption: "Pretty meta :]",
            },
            {
                src: `${base}projects/portfolio-aquarium.jpg`,
                caption: "The original aquarium background I painted for this site which I put through a pixelation filter.",
            },
        ],
    },
    {
        id: "squill",
        title: "Squill (UofTHacks Winner)",
        summary:
            "An LLM-based application that helps students applying to graduate school write their Statements of Purpose.",
        description:
            "Squill helps prospective graduate students get past the blank page when writing a Statement of Purpose. " +
            "Users fill in their background, and a multi-step LangGraph agent generates tailored, categorized " +
            "questions that guide them toward a strong draft, which they can answer, refine, and export as text. " +
            "It won at UofTHacks.\n\n" +
            "We engineered an end-to-end streaming pipeline between the Flask/LangGraph backend and the Next.js " +
            "frontend using HTTP response streaming and NDJSON, so users can watch live agent progress, PII " +
            "detection, and final question generation as it happens. Because applicants share personal details, " +
            "We also implemented a privacy-preserving redaction layer with Microsoft Presidio that anonymizes " +
            "names, emails, phone numbers, locations, URLs, and other sensitive identifiers before any context " +
            "reaches an LLM workflow. The question-generation flow includes backend validation, Cohere-powered " +
            "agent orchestration, and structured output with retry logic.",
        techStack: ["React", "Next.js", "Python", "Flask", "LangGraph", "Cohere", "Microsoft Presidio", "Git"],
        links: [
            { label: "GitHub", url: "https://github.com/replicant005/SOPcopilot" },
            { label: "Devpost", url: "https://devpost.com/software/squill-write-freely" },
        ],
        images: [
            {
                src: `${base}projects/squill.png`,
                caption: "I helped design the hero banner as well as the overall UI.",
            },
        ],
    },
    {
        id: "voxify",
        title: "Voxify",
        summary:
            "An accessible web app that clones a user's voice from an audio upload and turns it into a text-to-speech persona.",
        description:
            "Voxify is an application thatlets users upload audio, turns it into a voice clone, and then uses that voice as a " +
            "text-to-speech persona to personalize their experience. Accessibility was a core goal of the project.\n\n" +
            "Our team architected the data layer using SQLite alongside ChromaDB, storing structured application data " +
            "next to vector embeddings to support semantic search and AI-driven retrieval. I helped designed the backend " +
            "service that processes submitted audio into voice clones and connected it to the frontend through " +
            "Axios REST APIs. On the frontend I added accessibility features including color-blind modes, " +
            "font-size customization, and a clutter-reduction mode for users with ADHD, so the app works for a " +
            "wide range of people.",
        techStack: ["React.js", "JavaScript", "HTML5", "CSS", "Python", "SQLite", "ChromaDB", "Axios", "Git"],
        links: [
        ],
        images: [
            {
                src: `${base}projects/voxify-login.png`,
                caption: "Voxify login screen",
            },
            {
                src: `${base}projects/voxify-main.png`,
                caption: "Voxify dashboard screen",
            },
        ],
    },
    {
        id: "trolley",
        title: "Trolley (LevelUp 2026)",
        summary:
            "A first-person Unity game that turns trolley-problem scenarios into a branching series of moral choices, action challenges, and audience-driven consequences.",
        description:
            "Trolley turns the classic trolley problem into a first-person game-show experience. Instead of " +
            "presenting each dilemma as a static prompt, the game puts you inside a sequence of interactive " +
            "stages where your choices change what happens next and how the audience reacts.\n\n" +
            "Progression is driven by a ScriptableObject level graph: each node defines a stage prefab and maps " +
            "named outcomes to the next node, while a central orchestrator follows those outcomes and a level " +
            "director owns the lifecycle of the active stage. This keeps flow separate from individual level " +
            "scripts, so new scenarios can plug in, report an outcome, and let the graph decide what comes next. " +
            "Each level is a stage-set prefab instantiated under a shared root and removed when a choice " +
            "resolves. The game also features layered voice-over, music, SFX, timed subtitles, " +
            "and full keyboard and controller support with gamepad rumble.",
        techStack: [
            "Unity",
            "C#",
            "Universal Render Pipeline",
            "UI Toolkit",
            "Unity Input System",
            "Cinemachine",
        ],
        links: [
            { label: "GitHub", url: "https://github.com/chlsey/Trolley" },
            { label: "itch.io", url: "https://peachbowls.itch.io/trolley" },
        ],
        images: [
            {
                src: `${base}projects/trolley.png`,
                caption: "A sample scene using cinemachine.",
            },
            {
                src: `${base}projects/trolley_Jaws.png`,
                caption: "A promotional poster created for the game.",
            },
            {
                src: `${base}projects/trolley_lights.png`,
                caption: "Unity lighting system within the scene.",
            },
        ],
    },
    {
        id: "forensics-pursuit",
        title: "Forensics Pursuit",
        summary:
            "An educational Ren'Py application for University of Toronto forensic science students, with an AI agent that gives real-time feedback.",
        description:
            "Built as a Software Developer at the University of Toronto's Faculty of Computer Science, Forensics " +
            "I worked closely with faculty and domain experts to translate their " +
            "pedagogical requirements into technical solutions.\n\n",
        techStack: ["Ren'Py", "Python", "JSON"],
        links: [
            { label: "GitHub", url: "https://github.com/Forensics-Pursuit/Forensics-Pursuit" },
        ],
        images: [
            {
                src: `${base}projects/fp.png`, 
                caption: "Autopsy scene I created.",
            },
        ],
    },
    {
        id: "excess",
        title: "Excess (Toronto Game Jam)",
        dateRange: "Jun 2025",
        summary:
            "A fast-paced arcade matching game built in GameMaker Language, where items race down a conveyor belt and speed up the longer you survive.",
        description:
            "Excess was built with my team for Toronto Game Jam in June 2025. Items stream along a conveyor " +
            "belt and the player has to match each one to a target set of images before it slips past. The " +
            "belt speeds up as you progress, so the difficulty ramps continuously and rewards quick pattern " +
            "recognition.\n\n" +
            "On the engineering side, I tracked down and fixed a series of memory-usage issues caused by " +
            "instances not being destroyed properly, keeping the game stable as items spawned at an ever " +
            "faster rate. I also contributed to the visual design by creating the background art.",
        techStack: ["GameMaker Language", "GameMaker Studio", "Pixel Art"],
        links: [
            { label: "itch.io", url: "https://itch.io/jam/tojam2025/rate/3567495" }
        ],
        images: [
            {
                src: `${base}projects/excess.png`,
                caption: "I helped design the background art.",
            },
        ],
    },
];
