import { Link } from 'react-router-dom';

function EventHeroBanner() {
  return (
    <section className="event-hero" aria-label="Event banner">
      <div className="event-hero-grid">
        <div className="event-hero-copy">
          <p className="event-hero-kicker">OMR MARATHON 2026 POWERED BY MAATRATHAI NOKKI (Tamil)</p>
          <h1>OMR Marathon 2026</h1>
          <p>Run Against Drugs. Run for a Better Future.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Register Now
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="event-hero-slot" role="img" aria-label="Banner placeholder">
          Banner Space
        </div>
      </div>
    </section>
  );
}

export default EventHeroBanner;