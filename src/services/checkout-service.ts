import { product } from "@prisma/client";
import Stripe from "stripe";
import { loadEnv } from "../config";

loadEnv();

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function createStripeSession(cartItems: cartItem[]) {
  const line_items = cartItems.map((item: cartItem) => ({
    price_data: {
      currency: "brl",
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.mainImage],
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  return stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto"],
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ["BR"] },
    phone_number_collection: { enabled: true },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
}

export type cartItem = product & { quantity: number };

export const checkoutService = { createStripeSession };
