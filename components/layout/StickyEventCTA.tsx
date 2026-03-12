"use client";

import { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

type StickyEventCTAProps = {
  whatsappNumber?: string;
  eventHref?: string;
  eventLabel?: string;
};

export function StickyEventCTA({
  whatsappNumber = "97143805833",
  eventHref = "/catering",
  eventLabel = "Plan an Event",
}: StickyEventCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCateringPage = pathname === '/catering';
  const isContactPage = pathname === '/contact';
  const isWhatsAppPage = isCateringPage || isContactPage;

  if (isDismissed) {
    return null;
  }

  const shouldShow = isCateringPage || isContactPage ? true : isVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative flex flex-col items-end gap-3">
            {!isCateringPage && (
              <Button
                asChild
                variant="cta"
                size="lg"
                className="gap-2 shadow-xl animate-pulse-glow"
              >
                <Link
                  href={eventHref}
                  onClick={() =>
                    posthog.capture("sticky_event_cta_clicked", {
                      event_href: eventHref,
                      event_label: eventLabel,
                      page: pathname,
                    })
                  }
                >
                  <Flame className="w-5 h-5" />
                  <span className="hidden sm:inline">{eventLabel}</span>
                  <span className="sm:hidden">Events</span>
                </Link>
              </Button>
            )}
            {isWhatsAppPage && (
              <Button
                asChild
                variant="ctaDark"
                size="lg"
                className="shadow-sm bg-[#25D366] text-white hover:bg-[#20BD5B]"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    posthog.capture("whatsapp_cta_clicked", {
                      page: pathname,
                    })
                  }
                >
                  <FaWhatsapp className="h-5 w-5" />
                  <span className="hidden sm:inline">WhatsApp Us</span>
                  <span className="sm:hidden">Contact</span>
                </a>
              </Button>
            )}
            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss plan an event button"
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-charcoal/10 bg-cream/90 text-charcoal/60 opacity-90 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all hover:bg-cream hover:text-charcoal/80 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
