import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section id="hero" className="hero-section d-flex align-items-center justify-content-center">
      <div className="text-center text-white">
        <h1>Welcome to My App</h1>
        <p>This is a responsive hero section with a background image.</p>
      </div>
    </section>
  );
}

export default Hero;
