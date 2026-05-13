"use client";

import { motion } from "framer-motion";
import { ContactSection } from "@/components/ContactSection";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT } from "@/data/site-content";

export function ContactPageBody() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <p className="max-w-3xl text-lg text-cream/85">{CONTACT.introExtra}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-6">
            <h2 className="font-display text-xl text-gold">{CONTACT.visitTipsTitle}</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-cream/80">
              {CONTACT.visitTips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="rounded-lg border border-gold/25 bg-charcoal/70 p-6">
            <h2 className="font-display text-xl text-gold">{CONTACT.faqTitle}</h2>
            <dl className="mt-4 space-y-5">
              {CONTACT.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-cream">{f.q}</dt>
                  <dd className="mt-1 text-sm text-cream/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mt-14"
      >
        <ContactSection showForm />
      </motion.div>
    </div>
  );
}
