/** Client-safe config from NEXT_PUBLIC_* env (inlined at build time). */

export const publicConfig = {
  chatApi:
    process.env.NEXT_PUBLIC_CHAT_API ??
    "https://obsidianai-evtu.onrender.com",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  stripeFoundation:
    process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_FOUNDATION ?? "",
  stripeCore: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_CORE ?? "",
  /** Optional Payment Link or contact page for enterprise */
  stripeEnterprise:
    process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENTERPRISE ??
    "mailto:team@obsidianai.org?subject=Enterprise%20pricing",
} as const;
