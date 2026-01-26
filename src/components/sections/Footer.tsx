import { useState } from "react";
import { motion } from "motion/react";
import { FacebookLogo, InstagramLogo, LinkedinLogo, Envelope } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PrivacyPolicyModal } from "@/components";

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}kingside-wordmark-light.svg`}
                alt="Kingside"
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback to the default wordmark if light version isn't present yet.
                  (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}kingside-wordmark.svg`;
                }}
              />
            </div>
            <p className="text-primary-foreground/70 text-lg max-w-sm">
              Put your busy work in check. We help small businesses scale smarter with intelligent automation.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FacebookLogo, href: "#", label: "Facebook" },
                { icon: InstagramLogo, href: "#", label: "Instagram" },
                { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 grid grid-cols-2 gap-8"
          >
            {/* Services */}
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
                Services
              </h3>
              <ul className="space-y-3">
                {["Marketing", "Sales", "Operations", "Customer Service"].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "#why-kingside" },
                  { label: "Services", href: "#services" },
                  { label: "Contact", href: "#contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:hello@kingsidegroup.com"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Envelope size={20} />
                hello@kingsidegroup.com
              </a>
              <div className="text-primary-foreground/50 space-y-1 text-sm">
                <p>Fort Worth, TX</p>
                <p>Lehi, UT</p>
                <p>Fort Pierce, FL</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-primary-foreground/10" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {currentYear} Kingside Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Button
              onClick={() => setIsPrivacyOpen(true)}
              variant="link"
              className="text-primary-foreground/50 hover:text-primary-foreground p-0 h-auto"
            >
              Privacy Policy
            </Button>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} />
    </footer>
  );
}
