"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SITE } from "@/data/menu";

const mapsSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.896807198641!2d-79.91414092395956!3d43.65031527110222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b12acd9a12d47%3A0xabd55ab7806b8fbc!2s134%20Guelph%20St%2C%20Halton%20Hills%2C%20ON%20L7G%206B2%2C%20Canada!5e0!3m2!1sen!2sus!4v1778357796151!5m2!1sen!2sus`;

const fade = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export function ContactSection({ showForm = true }: { showForm?: boolean }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={fade}
          whileHover={{ y: -3 }}
          className="rounded-lg border border-gold/30 bg-charcoal/80 p-6 shadow-lg transition-shadow hover:shadow-[0_0_40px_rgba(201,154,58,0.1)]"
        >
          <h2 className="font-display text-2xl text-gold">Visit us</h2>
          <address className="mt-3 not-italic text-cream/90">
            {SITE.address.street}
            <br />
            {SITE.address.cityLine}
            <br />
            {SITE.address.country}
          </address>
          <div className="mt-4 text-sm text-cream/75">
            <span className="font-semibold text-gold">Hours:</span>
            <ul className="mt-1.5 space-y-0.5">
              {SITE.hoursDetailed.map((h) => (
                <li key={h.day} className="flex gap-2">
                  <span className="w-24 shrink-0 text-cream/50">{h.day}</span>
                  <span>{h.open} – {h.close}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <motion.a
              href={SITE.phones[0].href}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ribbon-red rounded-md px-4 py-2 text-sm font-semibold text-cream"
            >
              Call {SITE.phones[0].display}
            </motion.a>
        <motion.a
  href="https://maps.app.goo.gl/JCSoHycd2JB6y9wH8"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="rounded-md border-2 border-gold px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
>
  Get directions
</motion.a>
            <motion.a
              href={SITE.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-md border border-cream/30 px-4 py-2 text-sm text-cream hover:border-gold hover:text-gold"
            >
              Order Now
            </motion.a>
          </div>
        </motion.div>

        {showForm ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...fade, delay: 0.08 }}
            onSubmit={onSubmit}
            className="rounded-lg border border-gold/25 bg-charcoal/70 p-6 shadow-lg"
            aria-label="Contact form"
          >
            <h3 className="font-display text-xl text-gold">Send a message</h3>
            <p className="mt-1 text-sm text-cream/65">
              For the fastest reply on orders or catering, please call us. This form is
              for general inquiries.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-cream/80">Name</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-md border border-gold/30 bg-charcoal px-3 py-2 text-cream outline-none transition-shadow focus:ring-2 focus:ring-gold/40"
                />
              </label>
              <label className="block text-sm">
                <span className="text-cream/80">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-md border border-gold/30 bg-charcoal px-3 py-2 text-cream outline-none transition-shadow focus:ring-2 focus:ring-gold/40"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="text-cream/80">Message</span>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-md border border-gold/30 bg-charcoal px-3 py-2 text-cream outline-none transition-shadow focus:ring-2 focus:ring-gold/40"
              />
            </label>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ribbon-red mt-4 w-full rounded-md py-3 font-semibold text-cream sm:w-auto sm:px-8"
            >
              Send message
            </motion.button>
            {sent ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-gold"
                role="status"
              >
                Thank you — we will follow up soon. For immediate help, call{" "}
                <a className="underline" href={SITE.phones[0].href}>
                  {SITE.phones[0].display}
                </a>
                .
              </motion.p>
            ) : null}
          </motion.form>
        ) : null}
      </div>

   <motion.div
  initial={{ opacity: 0, x: 24 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ ...fade, delay: 0.1 }}
  className="overflow-hidden rounded-lg border border-gold/30 bg-charcoal/50 shadow-lg"
>
  <div className="h-full w-full min-h-[420px]">
    <iframe
      title="Map — The Royal Pizzeria and Bar"
      src={mapsSrc}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
</motion.div>
    </div>
  );
}