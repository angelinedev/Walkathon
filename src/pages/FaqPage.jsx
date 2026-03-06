import { motion } from 'framer-motion';
import { faqs } from '../data';

function FaqPage() {
  return (
    <div className="page">
      <section className="page-head">
        <h1>Frequently Asked Questions</h1>
        <p>Quick answers for participants, families, and supporters.</p>
      </section>

      <section className="faq-list">
        {faqs.map((item, index) => (
          <motion.details
            className="faq-item"
            key={item.question}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </motion.details>
        ))}
      </section>
    </div>
  );
}

export default FaqPage;
