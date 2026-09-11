import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Mail } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: `Payment methods · ${profile.name}` },
      { name: "description", content: `Payment methods for products from ${profile.name}.` },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const continueToMessage = () => {
    window.sessionStorage.setItem("purchase-intent", "true");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        <header className="flex items-center justify-between py-8">
          <Link to="/" hash="marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to marketplace
          </Link>
          <ThemeToggle />
        </header>

        <main className="py-10 md:py-16">
          <section className="glass-panel max-w-2xl p-6 md:p-10">
            <p className="eyebrow">Marketplace</p>
            <h1 className="font-display mt-3 text-4xl md:text-5xl">Choose a payment method</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Send a message with the product you want and I will confirm availability and payment details.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link to="/" hash="message" onClick={continueToMessage} className="glass-panel flex items-start gap-3 p-4 text-left hover:border-accent">
                <Mail className="mt-0.5 text-accent" size={20} aria-hidden="true" />
                <span>
                  <strong className="block">Email request</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">Best for product details and delivery questions.</span>
                </span>
              </Link>
              <Link to="/" hash="message" onClick={continueToMessage} className="glass-panel flex items-start gap-3 p-4 text-left hover:border-accent">
                <CreditCard className="mt-0.5 text-accent" size={20} aria-hidden="true" />
                <span>
                  <strong className="block">Payment by arrangement</strong>
                  <span className="mt-1 block text-sm text-muted-foreground">Contact me first so I can share the right payment link.</span>
                </span>
              </Link>
            </div>

            <Link to="/" hash="message" className="mt-8 inline-flex rounded-sm border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent">
              Continue to contact form
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}