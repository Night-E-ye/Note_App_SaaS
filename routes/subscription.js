const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authenticate = require("../middleware/authenticate"); // JWT middleware

router.post("/subscribe", authenticate, async (req, res) => {
  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "priceId is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1SEw2j2MGY4GbQ2x2EQMyMj9",
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: req.user.email, // optional but useful
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
;
  }
);

module.exports = router;
