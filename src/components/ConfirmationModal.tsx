import { AnimatePresence, motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";
import { BrandButton } from "@/components/ui/brand-button";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ConfirmationModal({ isOpen, setIsOpen }: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 grid place-items-center z-50 px-4 bg-foreground/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, rotate: '8deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0.9, rotate: '-3deg' }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 16
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Modal */}
            <div className="relative border p-8 bg-background border-border rounded-xl shadow-lg">
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 border border-accent rounded-full bg-accent/10">
                  <CheckCircle size={32} className="text-accent" weight="bold" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-center text-foreground font-heading text-2xl font-medium">
                  Message Sent!
                </h3>

                {/* Description */}
                <p className="text-center mb-6 text-foreground/80 font-body">
                  Thanks for reaching out — our team at Kingside will contact you soon.
                </p>

                {/* Button */}
                <BrandButton
                  onClick={() => setIsOpen(false)}
                  variant="brand"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Close
                </BrandButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
