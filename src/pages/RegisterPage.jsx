import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { prizeAmounts, runCategories } from '../data';

const ORGANIZER_EMAIL = 'angelinehephzibahj@gmail.com';
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '15fdc1c7-c33f-4b50-9431-d1afc1ccaef7';

const initialForm = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  city: '',
  runCategory: '',
  emergencyContact: '',
  tshirtSize: '',
  bloodGroup: '',
  address: ''
};

function RegisterPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = useMemo(() => runCategories.map((item) => item.name), []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setSubmitError('');
    setSubmitted(false);

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitError('Submission key missing. Set VITE_WEB3FORMS_ACCESS_KEY in .env to enable direct email sending.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New OMR Marathon Registration - ${formData.fullName}`,
        from_name: 'OMR Marathon Registration',
        replyto: formData.email,
        to_email: ORGANIZER_EMAIL,
        ...formData
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      setSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit registration right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatInr = (value) => `Rs ${value.toLocaleString('en-IN')}`;

  return (
    <div className="page">
      <section className="page-head">
        <h1>Register for OMR Marathon 2026</h1>
        <p>Be part of an inspiring movement that combines fitness with social awareness.</p>
      </section>

      <section className="card">
        <h2>Run Categories and Race Timing</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Distance</th>
                <th>Eligibility</th>
                <th>Race Timing</th>
              </tr>
            </thead>
            <tbody>
              {runCategories.map((category) => (
                <tr key={category.name}>
                  <td>{category.name.replace(/ - .*/, '')}</td>
                  <td>{category.distance}</td>
                  <td>{category.eligibility}</td>
                  <td>{category.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2>Prize Amount Table</h2>
        <p>Structured for quick readability across all categories.</p>
        <div className="table-wrap">
          <table className="prize-main-table">
            <thead>
              <tr>
                <th>Run</th>
                <th>Category</th>
                <th>1st Prize</th>
                <th>2nd Prize</th>
                <th>3rd Prize</th>
              </tr>
            </thead>
            <tbody>
              {prizeAmounts.map((group) =>
                group.rows.map((row, rowIndex) => (
                  <tr key={`${group.event}-${row.category}`}>
                    {rowIndex === 0 ? <td rowSpan={group.rows.length}>{group.event}</td> : null}
                    <td>{row.category}</td>
                    <td>{formatInr(row.first)}</td>
                    <td>{formatInr(row.second)}</td>
                    <td>{formatInr(row.third)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
        <p className="payment-note">
          Gateway is ready for integration. Connect your provider account (Razorpay/PayU/Cashfree) keys for live
          transactions.
        </p>
      </section>

      <motion.section className="card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2>Registration Form</h2>
        <form className="register-form" onSubmit={onSubmit}>
          <label>
            Full Name
            <input name="fullName" value={formData.fullName} onChange={onChange} required />
          </label>

          <label>
            Date of Birth
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={onChange} required />
          </label>

          <label>
            Gender
            <select name="gender" value={formData.gender} onChange={onChange} required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Email Address
            <input type="email" name="email" value={formData.email} onChange={onChange} required />
          </label>

          <label>
            Phone Number
            <input name="phone" value={formData.phone} onChange={onChange} required />
          </label>

          <label>
            City
            <input name="city" value={formData.city} onChange={onChange} required />
          </label>

          <label>
            Run Category
            <select name="runCategory" value={formData.runCategory} onChange={onChange} required>
              <option value="">Select category</option>
              {categoryOptions.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Emergency Contact
            <input name="emergencyContact" value={formData.emergencyContact} onChange={onChange} required />
          </label>

          <label>
            T-Shirt Size
            <select name="tshirtSize" value={formData.tshirtSize} onChange={onChange} required>
              <option value="">Select size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </label>

          <label>
            Blood Group
            <input name="bloodGroup" value={formData.bloodGroup} onChange={onChange} required />
          </label>

          <label className="full-width">
            Address
            <textarea name="address" value={formData.address} onChange={onChange} rows="4" required />
          </label>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>

        {submitted ? <p className="success-msg">Registration submitted successfully.</p> : null}
        {submitError ? <p className="error-msg">{submitError}</p> : null}
      </motion.section>
    </div>
  );
}

export default RegisterPage;