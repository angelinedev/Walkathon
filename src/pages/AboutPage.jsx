import { motion } from 'framer-motion';

function AboutPage() {
  return (
    <div className="page">
      <section className="page-head">
        <h1>About OMR Marathon 2026</h1>
        <p>
          OMR Marathon 2026 is a community-driven awareness run dedicated to spreading the message against drug abuse.
          The event aims to educate people and inspire positive lifestyle choices.
        </p>
      </section>

      <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>About the Marathon</h2>
        <p>
          Through running and community engagement, participants support a mission that encourages health, awareness,
          and social responsibility.
        </p>
      </motion.section>

      <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>About the Organizer</h2>
        <p>
          Maatrathai Nokki Charitable Trust is a social service organization committed to bringing positive
          transformation in society.
        </p>
        <ul className="check-list">
          <li>Social awareness programs</li>
          <li>Youth development initiatives</li>
          <li>Community welfare activities</li>
          <li>Anti-drug and anti-addiction campaigns</li>
        </ul>
      </motion.section>

      <div className="grid two">
        <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Mission</h2>
          <p>
            To inspire individuals and communities to live a drug-free, healthy, and responsible life through
            awareness, education, and community engagement.
          </p>
        </motion.section>

        <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Vision</h2>
          <p>
            A society where youth are empowered with knowledge, strength, and values to build a safe and healthy
            future without drugs.
          </p>
        </motion.section>
      </div>
    </div>
  );
}

export default AboutPage;
