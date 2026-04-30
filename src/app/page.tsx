"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/home/SearchBar";
import BrandFilter from "@/components/home/BrandFilter";
import PhoneGrid from "@/components/home/PhoneGrid";
import AdBanner from "@/components/shared/AdBanner";
import CookieBanner from "@/components/shared/CookieBanner";
import { getPhones, getBrands } from "@/lib/api";

const allPhones = getPhones();
const allBrands = getBrands();

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");

  const phones = useMemo(
    () => getPhones({ brand: brand === "All" ? undefined : brand, search }),
    [search, brand],
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero / Search section */}
        <section
          className="w-full py-14 px-4"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Database <span className="gold-text">Spesifikasi HP</span>
              </h1>
              <p
                className="mt-2 text-sm sm:text-base"
                style={{ color: "var(--text-2)" }}
              >
                Temukan spesifikasi lengkap {allPhones.length}+ smartphone dari
                berbagai brand terkemuka
              </p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </section>

        {/* Ad leaderboard */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
          <AdBanner slot="leaderboard" />
        </div>

        {/* Brand filter */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
          <BrandFilter brands={allBrands} active={brand} onSelect={setBrand} />
        </div>

        {/* Main content: grid + sidebar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 pb-16">
          <div className="flex gap-6 items-start">
            {/* Phone grid */}
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-4" style={{ color: "var(--text-3)" }}>
                {phones.length} hasil ditemukan
              </p>
              <PhoneGrid phones={phones} />
            </div>

            {/* Sidebar ads */}
            <aside className="hidden lg:flex flex-col gap-4 w-75 shrink-0 sticky top-24">
              <AdBanner slot="mpu-top" />
              <AdBanner slot="mpu-sticky" />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
