// File: routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// 1. Create Checkout Session Route
router.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body;
  const YOUR_DOMAIN = 'https://' + req.get('host');

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
      // IMPORTANT: Pass the userId here to link the payment to the user
      metadata: {
        userId: userId,
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Stripe Webhook Handler
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    // Fulfill the purchase...
    console.log(`Payment successful for user ID: ${userId}`);
    await User.findByIdAndUpdate(userId, { isPremium: true });
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
});


module.exports = router;