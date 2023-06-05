const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Function to create a payment intent
const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // Add any additional options as needed
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent.');
  }
};

module.exports = {
  createPaymentIntent,
};
