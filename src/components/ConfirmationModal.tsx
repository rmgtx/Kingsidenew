import { AnimatePresence, motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";

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
          className="fixed inset-0 grid place-items-center z-[100] px-4"
          style={{
            backgroundColor: 'rgba(17, 17, 17, 0.3)',
            backdropFilter: 'blur(4px)',
          }}
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
            {/* Shadow */}
            <div
              className="absolute inset-0 border-2 bg-accent border-border rounded-xl"
              style={{ transform: 'translate(8px, 8px)' }}
            />

            {/* Modal */}
            <div className="relative border-2 p-8 bg-background border-border rounded-xl">
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 border-2 border-accent rounded-full bg-accent/10">
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
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-8 py-3 border-2 bg-primary text-primary-foreground border-primary rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
