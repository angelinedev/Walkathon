import { motion } from 'framer-motion';

function SponsorsPage() {
  return (
    <div className="page">
      <section className="page-head">
        <h1>Our Sponsors</h1>
        <p>
          OMR Marathon 2026 welcomes organizations and businesses to partner with us in promoting a drug-free society.
        </p>
      </section>

      <section className="card">
        <h2>Sponsorship Opportunities</h2>
        <div className="grid two">
          <article className="soft-card">
            <h3>Title Sponsor</h3>
            <ul className="check-list">
              <li>Logo on event branding</li>
              <li>Stage recognition</li>
              <li>Media promotion</li>
            </ul>
          </article>
          <article className="soft-card">
            <h3>Gold Sponsor</h3>
            <ul className="check-list">
              <li>Logo on website and banners</li>
              <li>Social media promotion</li>
            </ul>
          </article>
          <article className="soft-card">
            <h3>Silver Sponsor</h3>
            <ul className="check-list">
              <li>Logo placement on event materials</li>
            </ul>
          </article>
          <article className="soft-card">
            <h3>Community Partner</h3>
            <ul className="check-list">
              <li>Recognition during the event</li>
            </ul>
          </article>
        </div>
      </section>

      <motion.section className="cta-strip" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>Become a Sponsor</h2>
        <p>Support the cause and be part of a movement for health, awareness, and social responsibility.</p>
        <p>
          Email: <a href="mailto:info@omrmarathon.org">info@omrmarathon.org</a>
          <br />
          Phone: +91
        </p>
        <button className="btn btn-primary" type="button">
          Become a Sponsor
        </button>
      </motion.section>
    </div>
  );
}

export default SponsorsPage;
