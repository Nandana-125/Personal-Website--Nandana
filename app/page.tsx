import Terminal from "@/components/Terminal";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
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
                Frontend engineer who also runs the infrastructure underneath.{" "}
                <b>
                  React on the surface, MLOps &amp; observability in the stack.
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
    </main>
  );
}
