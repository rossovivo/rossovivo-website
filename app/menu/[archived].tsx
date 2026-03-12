"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { OrderNowSection } from "@/components/home/OrderNowSection";

const MEDIA_CITY_DIRECTIONS_URL =
  "https://www.google.com/maps/dir//Rossovivo+Artisan+Pizza+-+Al+Sufouh+-+Dubai+Internet+City+-+Dubai+-+United+Arab+Emirates/@65.0674176,25.4541824,10z/data=!4m18!1m8!3m7!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2sRossovivo+Artisan+Pizza!8m2!3d25.1045781!4d55.1687334!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1pp2ty710!4m8!1m0!1m5!1m1!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2m2!1d55.1687334!2d25.1045781!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D";

const BUSINESS_BAY_DIRECTIONS_URL =
  "https://www.google.com/maps/dir//Rossovivo+-+Ground+Floor,+Millennium+Tower,+Sheikh+Zayed+Road%D8%8C+Business+Bay+-+Dubai+-+United+Arab+Emirates%E2%80%AD/@65.0674176,25.4541824,10z/data=!3m1!5s0x3e5f685b1ccf4f7b:0xfe15742f9994907!4m18!1m8!3m7!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2sRossovivo!8m2!3d25.1948124!4d55.2662633!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F113jlr73r!4m8!1m0!1m5!1m1!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2m2!1d55.2662633!2d25.1948124!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D";

export default function Menu() {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/menu-bg.jpg')" }}
    >
      <section className="relative min-h-[52vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/menu-hero.jpg"
            alt="Rossovivo menu hero"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(65, 65, 67, 0.9)" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 container-tight flex min-h-[52vh] items-center justify-center text-center text-white pt-32 pb-20">
            <div className="mx-auto max-w-3xl">
              <h1 className="heading-display text-white">
                Taste What Everyone&apos;s Talking About!
              </h1>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-primary py-6">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <p className="font-display text-xl font-bold uppercase tracking-[0.08em]">
                Get Directions
              </p>
              <p className="text-white/80">
                Choose your location and open turn-by-turn directions.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button asChild variant="heroOutline" className="gap-2">
                <a
                  href={MEDIA_CITY_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Media City Location
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="heroOutline" className="gap-2">
                <a
                  href={BUSINESS_BAY_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Business Bay Location
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <OrderNowSection />
    </div>
  );
}
