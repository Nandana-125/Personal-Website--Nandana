import Terminal from "@/components/Terminal";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import About from "@/components/About";
import Interests from "@/components/Interests";
import Contact from "@/components/Contact";
import GitHubActivity from "@/components/GitHubActivity";
export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">
                <span className="pulse" />
                System online · boston-us-east
              </span>
              <h1>
                Nandana<span>Pradeep</span>
              </h1>
              <p className="lede">
                Software engineer who likes the whole stack:{" "}
                <b>
                  Clean interfaces on top, reliable infrastructure &amp; ML
                  pipelines underneath.
                </b>
              </p>
            </div>
            <div className="hero-art">
              {" "}
              <Terminal />
            </div>
          </div>
        </div>
      </section>
      <Projects />
      <Skills />
      <Timeline />
      <About />
      <Interests />
      <GitHubActivity />
      <Contact />
    </main>
  );
}
