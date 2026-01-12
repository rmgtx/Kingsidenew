import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";
import { NeuBrutalistButton } from "@/components";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Why Us", href: "#why-kingside" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "border-b border-border/50 bg-background/95 backdrop-blur-lg shadow-sm" 
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center group transition-transform hover:scale-105">
          <img 
            src="/kingside-wordmark.svg?v=2" 
            alt="Kingside" 
            className="h-10 w-auto"
            style={{ display: 'block', maxWidth: 'none' }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
          <div className="ml-4">
            <NeuBrutalistButton href="#contact" variant="primary">
              Book a Call
            </NeuBrutalistButton>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="relative">
                <List size={24} weight="bold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-2xl font-bold flex items-center gap-3">
                  <img 
                    src="/kingside-wordmark.svg" 
                    alt="Kingside" 
                    className="h-8 w-auto"
                  />
                  <span>Menu</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-12 flex flex-col gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-2xl font-heading font-semibold transition-colors hover:text-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-8 pt-8 border-t border-border">
                  <NeuBrutalistButton 
                    href="#contact" 
                    variant="primary"
                  >
                    Book a Call
                  </NeuBrutalistButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
