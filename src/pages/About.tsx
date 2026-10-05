function About() {
    return (
        <section className="page about-page">
            <h1>About Me</h1>
            <p>
                Hi, I'm Chelsey! I'm a software developer specializing in backend and fullstack development. 
                I'm currently working at KORE Solutions on their backend and mobile teams. That said, I also enjoy doing design work, such as this portfolio! 
            </p>

            <h2>My skills</h2>
            <ul className="about-list">
                <li>Distributed systems backend development in Node.js and FastAPI</li>
                <li>Frontend development with React &amp; TypeScript</li>
                <li>Mobile development using Flutter</li>
                <li>Experience with Docker, Azure Devops, Kubernetes, and databases (MongoDB and Postgres)</li>
            </ul>

            <p className="about-footnote">
            </p>
        </section>
    );
}

export default About;
