function About() {
    return (
        <section className="page about-page">
            <h1>About Me</h1>
            <p>
                Hi, I'm Chelsey! I'm a software developer specializing in backend and fullstack development. 
                I'm currently working at KORE Solutions on their backend and mobile teams. That said, I also enjoy doing design work, such as this portfolio! 
            </p>

            <h2>What I do</h2>
            <ul className="about-list">
                <li>Frontend development with React &amp; TypeScript</li>
                <li>UI/UX design with a love for retro aesthetics</li>
                <li>Digital art &amp; illustration</li>
            </ul>

            <p className="about-footnote">
                Edit this content in <code>src/pages/About.tsx</code>.
            </p>
        </section>
    );
}

export default About;
