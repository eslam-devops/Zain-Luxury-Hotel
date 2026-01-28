import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Zain <span>Luxury</span> Hotel
          </h1>
          <p>
            Experience elegance, comfort, and luxury in the heart of the city.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Explore Rooms</button>
            <button className="btn secondary">Book Now</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>🌙 Night Luxury</h3>
          <p>Elegant lighting and premium night experience.</p>
        </div>

        <div className="feature-card">
          <h3>🏨 5-Star Rooms</h3>
          <p>Modern rooms with panoramic city views.</p>
        </div>

        <div className="feature-card">
          <h3>🍽️ Fine Dining</h3>
          <p>World-class cuisine prepared by top chefs.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

