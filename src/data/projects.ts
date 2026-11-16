const base = import.meta.env.BASE_URL;

export type ProjectLink = {
    label: string;
    url: string;
};

export type ProjectImage = {
    src: string;
    caption?: string;
    videoId?: undefined;
};

/** A YouTube video shown in the gallery. The thumbnail is fetched from
 *  YouTube automatically; clicking it plays the video in place. */
export type ProjectVideo = {
    /** YouTube video id, e.g. "P0jd5sdlRIw" from youtu.be/P0jd5sdlRIw */
    videoId: string;
    caption?: string;
    /** Optional custom thumbnail; defaults to the YouTube thumbnail. */
    src?: string;
};

export type ProjectMedia = ProjectImage | ProjectVideo;

export type Project = {
    id: string;
    title: string;
    summary: string;
    description: string;
    techStack: string[];
    links: ProjectLink[];
    images?: ProjectMedia[];
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
        dateRange: "Aug 2026 - Present",
        summary:
            "A research framework that uses deep RL to adapt game difficulty through PCG to player performance and to automate level playtesting.",
        description:
            "An ongoing research project building a deep reinforcement learning framework in Unity and PyTorch " +
            "that adapts level difficulty and content based on player performance data for a dungeon crawler game.\n\n" +
            "A second goal is training RL agents to playtest levels autonomously and flag design problems such " +
            "as unbeatable sections, difficulty spikes, and exploits. This reduces the manual QA effort needed " +
            "as game content scales. Currently, I'm working on the overall training framework design and handling the procedural generation logic. " + 
            "Currently, dungeons are generated in two stages: stage one decides which tiles are walkable and outputs plain data with no GameObjects, " + 
            "and stage two turns that data into walls, doors, enemies, loot and decoration, with each dungeon type plugged in behind a common interface ." +
            "The generic dungeon places randomly sized rooms by rejection sampling, links each room to a few of its nearest neighbours with L-shaped corridors, " +
            "and uses a flood fill to join any disconnected groups. Its room count and size come from a trained RL policy." + 
            "The cathedral generation first builds a dumbbell-shaped spine, two 10×10 rooms joined by a long hall, then recursively 'buds' small rooms off it, " + 
            "each separated by a one-tile wall with a doorway.",
        techStack: ["Unity", "PyTorch", "Python", "C#", "Reinforcement Learning"],
        links: [
            { label: "RL Framework", url: "https://github.com/kcccr123/unity-reinforcement-learning" },
            { label: "QA Framework", url: "https://github.com/kcccr123/rein-powered-QA-framework" },
            { label: "PCG Framework + Unity game", url: "https://github.com/chlsey/kawaii-power-little-adventure" },
        ],
        images: [
            {
                src: `${base}projects/rl-pcg.png`, 
                caption: "A procedurally generated generic dungeon level using a room + corridor connectionapproach.",
            },
            {
                src: `${base}projects/cathedral.png`, 
                caption: "A procedurally generated cathedral dungeon level using a pre-generation map for main hall placement then recursive subdivision for smaller rooms.",
            },
            {
                videoId: "P0jd5sdlRIw",
                caption: "Our preliminary trained QA agent that searches for the exit in a small room.",
            },
        ],
    },
    {
        id: "portfolio-website",
        title: "Portfolio Website",
        dateRange: "Sept 2026 - Present",
        summary: "My portfolio site! A frutiger aero, Windows-95-styled desktop portfolio.",
        description:
            "I used TypeScript and React to build this retro-styled portfolio website. " +
            "I've wanted to make a website like this for a very long time! \n\n" +
            "I'm really nostalgic about early 2000s interface design and hope to bring that aesthetic to life again in my portfolio. " +
            "In addition to the UI design, I also created the backgrounds for the aquarium and the desktop wallpaper. ",
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
        id: "token-dashboard",
        title: "Token Dashboard",
        dateRange: "Aug 2026 - Present",
        summary:
            "A backend proxy created for a startup for managing and tracking API requests to LLM providers.",
        description:
            "This is an authenticated proxy that sits between client apps and LLM providers (Doubao and DeepSeek models on " +
            "Volcengine Ark), built with FastAPI and PostgreSQL. It forwards chat requests, tracks token usage per request " +
            "and calculates cost so each client organization can be billed accurately. It also gives each client a view of " +
            "their own spending, broken down by day, month, year, model and user, with tenant data kept fully isolated.\n\n" +
            "I developed the backend end to end: architecture, database schema, deployment and API docs. " +
            "Each request goes through a middleware that enforces HTTPS, size limits and per-client rate limits, then checks " +
            "an HMAC-SHA256 signature. " +
            "Reused request IDs are rejected within a 300-second window to block replays. " +
            "The proxy supports both streaming (SSE) and regular responses, and usage is written asynchronously after the " +
            "response, so logging adds no latency. " +
            "Costs are calculated per billing type (input, output, cache hits, cache storage, etc.) from a hot-reloadable " +
            "pricing.yaml. " +
            "Usage data is stored in a date-partitioned daily table with a monthly rollup, managed through Alembic migrations, " +
            "and request and response content is encrypted at rest with AES-256-GCM. " +
            "For observability I use structured JSON logs (structlog), correlation IDs and Prometheus metrics behind an IP allowlist. " +
            "It's tested with pytest, Hypothesis property-based tests and a Postman collection, shipped as a single Docker " +
            "container, and runs on Volcengine ECS.",
        techStack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Alembic", "Docker", "pytest"],
        links: [
        ],
        images: [
        ],
    },
    {
        id: "squill",
        title: "Squill (UofTHacks Winner)",
        dateRange: "Jan 2026",
        summary:
            "An LLM-based application that helps students applying to graduate school write their Statements of Purpose.",
        description:
            "Squill helps prospective graduate students get past the blank page when writing a Statement of Purpose. " +
            "Users fill in their background, and a multi-step LangGraph agent generates tailored, categorized " +
            "questions that guide them toward a strong draft, which they can answer, refine, and export as text. " +
            "It won at UofTHacks!\n\n" +
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
        id: "trolley",
        title: "Trolley (LevelUp 2026)",
        dateRange: "Jan 2026 - Apr 2026",
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
            { label: "itch.io (Playable!)", url: "https://peachbowls.itch.io/trolley" },
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
        dateRange: "May 2025 - Apr 2026",
        summary:
            "An educational Ren'Py application for University of Toronto forensic science students, with an AI agent that gives real-time feedback.",
        description:
            "Built as a Software Developer at the University of Toronto's Faculty of Computer Science, Forensics " +
            "I worked closely with faculty and forensic experts to translate their " +
            "educational goals into a student-focused application. The games include different equipment usage tutorials such as a photography module which " + 
            "integrated UI overlays, Python state and scoring engines, and JSON-backed assessment configs. \n\n",
        techStack: ["Ren'Py", "Python", "JSON"],
        links: [
            { label: "GitHub", url: "https://github.com/Forensics-Pursuit/Forensics-Pursuit" },
        ],
        images: [
            {
                src: `${base}projects/menu.png`, 
                caption: "Game menu.",
            },
            {
                src: `${base}projects/form.png`, 
                caption: "A form overlay with interactive element to simulate filling out the postmortem report.",
            },
            {
                src: `${base}projects/camera.png`, 
                caption: "A camera overlay with interactive buttons that mimic real-world camera controls.",
            },
            {
                src: `${base}projects/fp.png`, 
                caption: "Autopsy scene I created.",
            },
        ],
    },
    {
        id: "voxify",
        title: "Voxify",
        dateRange: "May 2025 - Aug 2025",
        summary:
            "An accessible web app that clones a user's voice from an audio upload and turns it into a text-to-speech persona.",
        description:
            "Voxify is an application that lets users upload audio, turns it into a voice clone, and then uses that voice as a " +
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
            "instances not being destroyed properly, keeping the game stable as items spawned at increasing " +
            "rates. I also contributed to the visual design by creating the background art.",
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
