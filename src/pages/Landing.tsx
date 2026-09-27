import Aquarium from "../components/Aquarium";
import TypingTitle from "../components/TypingTitle";

function Landing() {
  return (
    <section className="page landing-page">
      <div className="landing-intro">
        <TypingTitle name="Chelsey" />
        <p>A personal portfolio for projects, art, and hobbies.</p>
      </div>

      <Aquarium />
    </section>
  );
}

export default Landing;