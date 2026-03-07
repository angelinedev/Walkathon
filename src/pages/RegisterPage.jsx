import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { prizeAmounts, runCategories } from '../data';

const RAW_GOOGLE_FORM_URL =
  import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/1KeRMRSgGTEkzD3Avbh_PmoalRtOou-r1dysbwLHTHqY/edit#responses';
const GOOGLE_FORM_URL = RAW_GOOGLE_FORM_URL.replace('/edit#responses', '/viewform').replace('/edit', '/viewform');

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const registrationFees = {
  '3 KM - Fun Run': 500,
  '5 KM - Awareness Run': 700,
  '10 KM - Challenge Run': 800,
  '16 KM - Endurance Run': 1000,
  '21 KM - Half Marathon': 1200
};

function RegisterPage() {
  const [paymentData, setPaymentData] = useState({
    fullName: '',
    email: '',
    phone: '',
    runCategory: runCategories[0]?.name || ''
  });
  const [isPaying, setIsPaying] = useState(false);
  const [payMessage, setPayMessage] = useState('');
  const [payError, setPayError] = useState('');

  const categoryOptions = useMemo(() => runCategories.map((item) => item.name), []);
  const selectedFee = registrationFees[paymentData.runCategory] || 0;

  const formatInr = (value) => `Rs ${value.toLocaleString('en-IN')}`;

  const onPaymentFieldChange = (event) => {
    const { name, value } = event.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const onPayNow = async () => {
    setPayMessage('');
    setPayError('');

    if (!RAZORPAY_KEY_ID) {
      setPayError('Missing Razorpay key. Set VITE_RAZORPAY_KEY_ID in .env.');
      return;
    }

    if (!paymentData.fullName || !paymentData.email || !paymentData.phone || !paymentData.runCategory) {
      setPayError('Please complete all payment fields.');
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPayError('Razorpay SDK failed to load. Check internet and try again.');
      return;
    }

    setIsPaying(true);

    try {
      const response = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedFee,
          name: paymentData.fullName,
          email: paymentData.email,
          phone: paymentData.phone,
          category: paymentData.runCategory
        })
      });

      const orderResult = await response.json();
      if (!response.ok || !orderResult.success) {
        throw new Error(orderResult.message || 'Unable to create payment order.');
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: 'OMR Marathon 2026',
        description: `${paymentData.runCategory} Registration`,
        order_id: orderResult.order.id,
        prefill: {
          name: paymentData.fullName,
          email: paymentData.email,
          contact: paymentData.phone
        },
        notes: {
          category: paymentData.runCategory
        },
        theme: {
          color: '#0f766e'
        },
        handler: async (paymentResponse) => {
          const verifyResponse = await fetch(`${API_BASE}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentResponse)
          });

          const verifyResult = await verifyResponse.json();
          if (!verifyResponse.ok || !verifyResult.success) {
            setPayError('Payment received but verification failed. Please contact support with payment ID.');
            return;
          }

          setPayMessage(`Payment successful. Payment ID: ${paymentResponse.razorpay_payment_id}`);
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (event) => {
        const reason = event?.error?.description || 'Payment failed. Please try again.';
        setPayError(reason);
      });
      razorpay.open();
    } catch (error) {
      setPayError(error.message || 'Unable to start payment.');
    } finally {
      setIsPaying(false);
    }
  };

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

      <section className="card">
        <h2>Registration Submission (Google Form)</h2>
        <p>Fill the registration details in the official Google Form. Responses are saved privately in your sheet.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
            Open Google Form
          </a>
        </div>
      </section>

      <section className="card payment-card">
        <h2>Razorpay Payment Gateway</h2>
        <p>Complete payment after form submission. This checkout supports UPI, cards, net banking, and wallets.</p>

        <div className="register-form">
          <label>
            Full Name
            <input name="fullName" value={paymentData.fullName} onChange={onPaymentFieldChange} required />
          </label>

          <label>
            Email Address
            <input type="email" name="email" value={paymentData.email} onChange={onPaymentFieldChange} required />
          </label>

          <label>
            Phone Number
            <input name="phone" value={paymentData.phone} onChange={onPaymentFieldChange} required />
          </label>

          <label>
            Run Category
            <select name="runCategory" value={paymentData.runCategory} onChange={onPaymentFieldChange} required>
              {categoryOptions.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="payment-note">
          Registration Fee: <strong>{formatInr(selectedFee)}</strong>
        </p>

        <button className="btn btn-primary" type="button" onClick={onPayNow} disabled={isPaying}>
          {isPaying ? 'Starting Payment...' : 'Pay with Razorpay'}
        </button>

        {payMessage ? <p className="success-msg">{payMessage}</p> : null}
        {payError ? <p className="error-msg">{payError}</p> : null}
      </section>
    </div>
  );
}

export default RegisterPage;


