import { motion } from 'framer-motion';
import { prizeAmounts, runCategories } from '../data';

const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://forms.gle/REPLACE_WITH_YOUR_FORM';
const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  'https://docs.google.com/spreadsheets/d/REPLACE_WITH_YOUR_SHEET_ID/edit?usp=sharing';

const isFormConfigured = !GOOGLE_FORM_URL.includes('REPLACE_WITH_YOUR_FORM');
const isSheetConfigured = !GOOGLE_SHEET_URL.includes('REPLACE_WITH_YOUR_SHEET_ID');

function RegisterPage() {
  const formatInr = (value) => `Rs ${value.toLocaleString('en-IN')}`;

  return (
    <div className="page">
      <section className="page-head">
        <h1>Register for OMR Marathon 2026</h1>
        <p>Be part of an inspiring movement that combines fitness with social awareness.</p>
      </section>

      <section className="card">
        <h2>Run Categories and Race Timing</h2>
        <div className="mobile-cards">
          {runCategories.map((category) => (
            <article className="mobile-data-card" key={category.name}>
              <h3>{category.name.replace(/ - .*/, '')}</h3>
              <p>
                <strong>Distance:</strong> {category.distance}
              </p>
              <p>
                <strong>Eligibility:</strong> {category.eligibility}
              </p>
              <p>
                <strong>Race Timing:</strong> {category.timing}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Prize Amount Table</h2>
        <p>Structured for quick readability across all categories.</p>

        <div className="mobile-cards prize-card-list">
          {prizeAmounts.map((group) => (
            <article className="mobile-data-card" key={group.event}>
              <h3>{group.event}</h3>
              {group.rows.map((row) => (
                <div className="mobile-prize-row" key={`${group.event}-${row.category}`}>
                  <p>
                    <strong>{row.category}</strong>
                  </p>
                  <div className="prize-badge-grid">
                    <div className="prize-badge first">
                      <span>1st</span>
                      <strong>{formatInr(row.first)}</strong>
                    </div>
                    <div className="prize-badge second">
                      <span>2nd</span>
                      <strong>{formatInr(row.second)}</strong>
                    </div>
                    <div className="prize-badge third">
                      <span>3rd</span>
                      <strong>{formatInr(row.third)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Registration Includes</h2>
        <ul className="check-list">
          <li>Official Marathon T-Shirt</li>
          <li>Bib Number</li>
          <li>Timing Chip (for competitive runs)</li>
          <li>Finisher Medal</li>
          <li>Certificate</li>
          <li>Hydration and Medical Support</li>
        </ul>
      </section>

      <section className="card payment-card">
        <h2>Payment Gateway</h2>
        <p>Accepted modes: UPI, Credit Card, Debit Card, Net Banking, Wallets.</p>
        <div className="payment-grid">
          <div className="pay-chip">UPI</div>
          <div className="pay-chip">Card</div>
          <div className="pay-chip">Net Banking</div>
          <div className="pay-chip">Wallet</div>
          <div className="pay-chip">QR</div>
        </div>
        <p className="payment-note">Razorpay integration is ready to be initialized once your keys and webhook details are shared.</p>
      </section>

      <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>Registration Submission</h2>
        <p>
          Registration entries are now collected through Google Form and stored directly in Google Sheets (Excel-like
          format).
        </p>

        <div className="hero-actions">
          <a
            className={`btn btn-primary ${isFormConfigured ? "" : "btn-disabled"}` }
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!isFormConfigured}
          >
            Open Google Form
          </a>
          <a
            className={`btn btn-secondary ${isSheetConfigured ? "" : "btn-disabled"}` }
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!isSheetConfigured}
          >
            Open Response Sheet
          </a>
        </div>

        {!isFormConfigured ? (
          <p className="error-msg">Set `VITE_GOOGLE_FORM_URL` in `.env` with your live Google Form link.</p>
        ) : null}
        {!isSheetConfigured ? (
          <p className="error-msg">Set `VITE_GOOGLE_SHEET_URL` in `.env` with your response sheet link.</p>
        ) : null}
      </motion.section>
    </div>
  );
}

export default RegisterPage;

