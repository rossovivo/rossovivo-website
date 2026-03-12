"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  orderNowLabel?: string;
  orderNowHref?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/catering", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({
  orderNowLabel = "Order Now",
  orderNowHref = "/locations",
  logoLightUrl = "/logo-w.png",
  logoDarkUrl = "/logo.png",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldUseDarkHeaderText = isScrolled;
  const isLinkActive = (link: NavLink) => pathname === link.href;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-tight flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="shrink-0"
            >
              <img
                src={shouldUseDarkHeaderText ? logoDarkUrl : logoLightUrl}
                alt="Rossovivo logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="relative hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);
              const desktopLinkClasses = `relative text-base font-medium transition-colors duration-200 ${
                shouldUseDarkHeaderText
                  ? "text-charcoal hover:text-primary"
                  : "text-white/90 hover:text-white"
              } ${isActive ? "text-primary" : ""}`;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={desktopLinkClasses}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="cta" className="gap-2">
              <Link href={orderNowHref}>
                <ShoppingBag className="w-4 h-4" />
                {orderNowLabel}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden ${shouldUseDarkHeaderText ? "text-charcoal" : "text-white"}`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-md pt-24 px-6">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-display font-bold ${
                        isLinkActive(link) ? "text-primary" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-6"
                >
                  <Button
                    asChild
                    variant="cta"
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Link href={orderNowHref}>
                      <ShoppingBag className="w-5 h-5" />
                      {orderNowLabel}
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
