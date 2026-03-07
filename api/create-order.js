const RAZORPAY_ORDERS_URL = 'https://api.razorpay.com/v1/orders';

function getAuthHeader() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  const token = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  return `Basic ${token}`;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const authHeader = getAuthHeader();
  if (!authHeader) {
    res.status(500).json({ success: false, message: 'Razorpay server keys are missing' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const amountInInr = Number(body?.amount || 0);

    if (!Number.isFinite(amountInInr) || amountInInr <= 0) {
      res.status(400).json({ success: false, message: 'Invalid amount' });
      return;
    }

    const payload = {
      amount: Math.round(amountInInr * 100),
      currency: 'INR',
      receipt: `OMR-${Date.now()}`,
      notes: {
        name: body?.name || '',
        email: body?.email || '',
        phone: body?.phone || '',
        category: body?.category || ''
      }
    };

    const response = await fetch(RAZORPAY_ORDERS_URL, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ success: false, message: result?.error?.description || 'Order creation failed' });
      return;
    }

    res.status(200).json({ success: true, order: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error while creating order' });
  }
}
