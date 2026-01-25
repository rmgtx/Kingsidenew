import { AnimatePresence, motion } from "motion/react";
import { X, ShieldCheck } from "@phosphor-icons/react";
import { useEffect } from "react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function PrivacyPolicyModal({ isOpen, setIsOpen }: PrivacyPolicyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 grid place-items-center z-[60] px-4 bg-background/80 backdrop-blur-sm p-4 sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck size={24} className="text-primary" weight="duotone" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground">Privacy Policy</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 overflow-y-auto font-body text-muted-foreground space-y-6 text-sm leading-relaxed">
              <p><strong>Effective Date:</strong> January 24, 2026</p>

              <p>
                At Kingside Group ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or engage with our AI consulting services.
              </p>

              <h3 className="text-foreground font-semibold text-base">1. Information We Collect</h3>
              <p>
                We may collect personal information that you voluntarily provide, such as your name, email address, phone number, and company details when you fill out forms or contact us. We also automatically collect non-personal usage data (e.g., IP address, browser type) to improve our website experience.
              </p>

              <h3 className="text-foreground font-semibold text-base">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and improve our AI consulting and development services.</li>
                <li>To communicate with you regarding your inquiries, projects, or support requests.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
              </ul>

              <h3 className="text-foreground font-semibold text-base">3. AI Data & Confidentiality</h3>
              <p>
                As an AI agency, we handle sensitive data with the highest standards of security.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Proprietary Data:</strong> Any proprietary data you share with us for model tuning, RAG (Retrieval-Augmented Generation) systems, or analysis remains your exclusive property.</li>
                <li><strong>No Public Training:</strong> We strictly do <strong>not</strong> use your private business data to train, fine-tune, or improve public foundation models (e.g., GPT, Claude, Gemini) without your explicit, written consent.</li>
                <li><strong>Isolation:</strong> Client environments are logically isolated to prevent data leakage.</li>
              </ul>

              <h3 className="text-foreground font-semibold text-base">4. Data Security</h3>
              <p>
                We implement industry-standard technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h3 className="text-foreground font-semibold text-base">5. Third-Party Services</h3>
              <p>
                Our services may integrate with third-party AI providers (e.g., OpenAI, Anthropic, Google). Data processed by these providers is subject to their respective privacy policies and our data processing agreements with them.
              </p>

              <h3 className="text-foreground font-semibold text-base">6. Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:hello@kingsidegroup.com" className="text-primary hover:underline">hello@kingsidegroup.com</a>.
              </p>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/30 rounded-b-xl flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
