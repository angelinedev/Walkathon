import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBullseye, FaHeartPulse, FaShieldHeart } from 'react-icons/fa6';
import { deliverables, highlights, runCategories, whyParticipate } from '../data';

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 }
};

function HomePage() {
  return (
    <div className="page">
      <section className="home-top-banner" aria-label="Top banner">
        <div className="home-top-banner-inner">
          <div className="home-banner-slot">Banner Space</div>
        </div>
      </section>

      <section className="hero-intro card">
        <p className="eyebrow">OMR MARATHON 2026 POWERED BY MAATRATHAI NOKKI (TAMIL)</p>
        <h1>Run Against Drugs. Run for a Better Future.</h1>
        <p>
          An anti-drug awareness marathon organized by Maatrathai Nokki Charitable Trust. Join thousands of runners
          and families on OMR to promote a healthy, drug-free society.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Register Now
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
        <div className="pill-row" aria-label="Run categories overview">
          {runCategories.map((item) => (
            <span className="pill intro-pill" key={item.distance}>
              {item.distance}
            </span>
          ))}
        </div>
      </section>

      <section className="date-highlight">
        <p className="date-label">Event Date</p>
        <h2>Date: To Be Announced</h2>
        <p>Update this section once final date and time are confirmed.</p>
      </section>

      <section className="marathon-gallery card">
        <h2>Marathon Moments</h2>
        <div className="gallery-grid">
          <img src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Runners starting a marathon event" />
          <img src="https://images.pexels.com/photos/3621181/pexels-photo-3621181.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Participants running on city road" />
          <img src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Group marathon energy and crowd support" />
        </div>
      </section>

      <motion.section className="card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>About the Event</h2>
        <p>
          OMR Marathon 2026 is a social awareness initiative designed to inspire communities to stand against drug
          abuse. This marathon is more than just a race. It is a movement encouraging society to say NO to drugs and
          YES to life.
        </p>
      </motion.section>

      <motion.section className="card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>Official Run Categories</h2>
        <div className="grid two">
          {runCategories.map((category) => (
            <article className="soft-card animated-card" key={category.name}>
              <h3>{category.name}</h3>
              <p>{category.note}</p>
              <p>
                <strong>Start:</strong> {category.timing}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section className="card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>Event Highlights</h2>
        <ul className="check-list">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.section>

      <motion.section className="card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>Participants Deliverables</h2>
        <div className="grid three">
          {deliverables.map((item) => (
            <div className="chip" key={item}>
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>Why Run With Us?</h2>
        <div className="icon-list">
          <div className="icon-block">
            <FaShieldHeart aria-hidden="true" />
            <p>Promote a Drug-Free Society</p>
          </div>
          <div className="icon-block">
            <FaHeartPulse aria-hidden="true" />
            <p>Encourage Healthy Living</p>
          </div>
          <div className="icon-block">
            <FaBullseye aria-hidden="true" />
            <p>Support Youth Awareness</p>
          </div>
        </div>
        <ul className="check-list">
          {whyParticipate.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.section>

      <section className="cta-strip">
        <h2>Be the Change. Be the Voice. Run for Awareness.</h2>
        <p>Your steps can create awareness. Your run can inspire change.</p>
        <Link to="/register" className="btn btn-primary">
          Register Now
        </Link>
      </section>
    </div>
  );
}

export default HomePage;