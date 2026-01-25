import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandButton, GridPattern } from "@/components";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CheckCircle } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";

export function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!gridContainerRef.current) return;

    const rect = gridContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the snapped grid coordinates (30px grid size)
    const gridSize = 30;
    const col = Math.floor(mouseX / gridSize);
    const row = Math.floor(mouseY / gridSize);

    const squareX = col * gridSize;
    const squareY = row * gridSize;

    gridContainerRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    gridContainerRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
    gridContainerRef.current.style.setProperty('--grid-x', `${squareX}px`);
    gridContainerRef.current.style.setProperty('--grid-y', `${squareY}px`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://goodhelpai.app.n8n.cloud/webhook/kingside/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(true);
        (e.target as HTMLFormElement).reset();
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden scroll-mt-12 pt-12 pb-24 lg:pt-16 lg:pb-32 px-5 sm:px-6 lg:px-8 bg-background"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid Pattern Background (Interactive) */}
      <div
        ref={gridContainerRef}
        className={`absolute inset-0 z-0 ${isHovering ? 'grid-hovering' : ''}`}
      >
        <GridPattern
          width={30}
          height={30}
          className="opacity-70"
        />
      </div>

      {/* Gradient fade at top for smooth transition */}
      <div
        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column - Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Ready to make<br />your move?
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Every winning strategy starts with a smart first move. Reach out today for a straightforward conversation about where your business is and where our digital solutions can take it.
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-4">
              {[
                "No jargon, just a clear plan",
                "Response within 24 hours",
                "Free initial consultation"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={24} weight="fill" className="text-accent shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Jane"
                        className="h-12 px-4 bg-background border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        className="h-12 px-4 bg-background border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium">
                      Business name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      required
                      placeholder="Acme Corp"
                      className="h-12 px-4 bg-background border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="h-12 px-4 bg-background border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(555) 555-5555"
                      className="h-12 px-4 bg-background border focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent"
                    />
                  </div>

                  <div className="pt-4">
                    <BrandButton type="submit" variant="brand" aria-label="Send message">
                      {isSubmitting ? "Sending..." : "Send message"}
                    </BrandButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <ConfirmationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
}
