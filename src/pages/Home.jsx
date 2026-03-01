import React, { useCallback, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./Home.css";

export default function Home() {
  const [ready, setReady] = useState(false);
  const particlesLoaded = useCallback(async () => { }, []);
  const heroRef = useRef(null);

  useEffect(() => {
    // init tsparticles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  return (
    <div className="home-page">
      {/* Fixed background image for whole page */}
      <div className="home-bg" />

      {/* HERO: particles live inside this hero area only */}
      <section className="home-hero" ref={heroRef}>
        {/* particles wrapper sized to hero (particles cover only this area) */}
        {ready && (
          <div className="particles-wrapper" aria-hidden>
            <Particles
              id="tsparticles"
              particlesLoaded={particlesLoaded}
              className="home-particles"
              options={{
                fullScreen: { enable: true }, // do not use fullPage canvas
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                detectRetina: true,
                particles: {
                  number: { value: 130, density: { enable: true, area: 800 } },
                  color: { value: "#ffffff" },
                  shape: { type: "circle" },
                  opacity: { value: 0.6 },
                  size: { value: { min: 1, max: 3 } },
                  links: {
                    enable: true,
                    color: "#ffffff",
                    distance: 200,
                    opacity: 0.35,
                    width: 1
                  },
                  move: {
                    enable: true,
                    speed: 1.2,
                    outModes: { default: "out" }
                  }
                },
                interactivity: {
                  events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                    resize: true
                  },
                  modes: {
                    grab: { distance: 140, links: { opacity: 0.8 } },
                    push: { quantity: 3 },
                    repulse: { distance: 120 }
                  }
                }
              }}
            />
          </div>
        )}

        <div className="hero-content">
          <div className="container-fluid">
            <div className="row align-items-center g-4">

              {/* ABOUT TEXT */}
              <div className="col-12 col-md-6">
                <h1>About</h1>
                <p className="hero-sub">
                  At ELCS, we design and manufacture future-ready embedded modules, control
                  systems, and connectivity devices built with precision and quality. <br /> Our
                  mission is to simplify hardware development by offering plug-and-play
                  modules, ready-to-use PCB designs, and custom embedded solutions that help
                  engineers, makers, and industries innovate faster. <br /> Every product
                  comes with complete 3D models, technical documentation, and full support
                  files, making integration easy for everyone—from beginners to professionals. <br />
                  We follow recognized industry standards such as IPC design rules, RoHS
                  compliance, and ESD-safe processes, ensuring reliable and robust
                  performance in real-world applications. <br /> At ELCS, we aim to make
                  advanced embedded technology accessible, allowing everyone to build
                  smarter, safer, and more efficient systems.
                </p>
              </div>

              {/* VIDEO */}
              <div className="col-12 col-md-6 text-center">
                <video
                  src="/videos/about.mp4"   // Put your file in /public/videos/
                  autoPlay
                  muted
                  loop
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "320px", objectFit: "cover" }}
                />
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Care section - example data/cards */}
      <section className="home-section" id="care">
        <div className="container-fluid">
          <div className="row justify-content-center text-center">
            <div className="col-md-10">
              <img
                src="/images/infographic.png"  // <-- place your image in public/images/
                alt="Centered Display"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* More page content */}
      <section className="home-section">
        <div className="container-fluid">
          <div className="row justify-content-center text-center">
            <h2>Partnered with</h2>
            <p>coming soon...</p>
          </div>
        </div>

      </section>
    </div>
  );
}
