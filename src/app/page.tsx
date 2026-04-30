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
        {/* ── Hero / Search ── */}
        {/* ── Hero ── */}
        <section
          className="w-full pt-20 pb-8 px-4"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%)",
          }}
        >
          <div className="mx-auto max-w-2xl flex flex-col items-center gap-6 text-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Database <span className="gold-text">Spesifikasi HP</span>
              </h1>
              <p
                className="mt-3 text-sm sm:text-base"
                style={{ color: "var(--text-2)" }}
              >
                Temukan spesifikasi lengkap {allPhones.length}+ smartphone dari
                berbagai brand terkemuka
              </p>
            </div>
          </div>
        </section>

        {/* ── Sticky Search Bar ── */}
        <div
          className="sticky top-16 z-40 w-full px-4 pt-4 pb-2 mb-2"
          style={{
            background: "rgba(13,27,42,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            marginTop: "-1px", // Seamless connection to hero
          }}
        >
          <div className="mx-auto max-w-2xl flex flex-col gap-2">
            <SearchBar value={search} onChange={setSearch} />
            <div className="px-1 flexc min-h-[16px]">
              {(search.trim() !== "" || brand !== "All") && (
                <p className="text-[11px] font-medium text-text-3">
                  {phones.length} hasil ditemukan
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Brand Filter ── */}
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 py-5">
          <BrandFilter brands={allBrands} active={brand} onSelect={setBrand} />
        </div>

        {/* ── Leaderboard Ad (full width, centered) ── */}
        <div
          className="w-full px-4 sm:px-8 py-4 mb-4"
          style={{
            background: "var(--bg-2)",
            borderTop: "1px solid var(--border-2)",
            borderBottom: "1px solid var(--border-2)",
          }}
        >
          <div className="mx-auto max-w-182">
            <AdBanner slot="leaderboard" />
          </div>
        </div>

        {/* ── 3-Column Layout: Left Ad | Content | Right Ad ── */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-screen-2xl flex gap-6 items-start justify-center">
            {/* Left sidebar ad */}
            <aside className="hidden xl:flex flex-col gap-4 w-40 shrink-0 sticky top-24">
              <AdBanner slot="mpu-top" />
            </aside>

            {/* Center: phone grid */}
            <div className="flex-1 min-w-0 max-w-7xl pt-1">
              <PhoneGrid phones={phones} />
            </div>

            {/* Right sidebar ad */}
            <aside className="hidden lg:flex flex-col gap-4 w-40 xl:w-75 shrink-0 sticky top-24">
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
