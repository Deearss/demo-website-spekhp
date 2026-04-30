import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Battery, Camera, Cpu, Monitor, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpecTable from "@/components/detail/SpecTable";
import AdBanner from "@/components/shared/AdBanner";
import PhoneGrid from "@/components/home/PhoneGrid";
import { getPhoneBySlug, getRelatedPhones } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const phone = getPhoneBySlug(slug);
  if (!phone) return { title: "HP Tidak Ditemukan" };
  return {
    title: phone.name,
    description: `Spesifikasi lengkap ${phone.name}: ${phone.specs.chipset}, ${phone.mainCameraMP} kamera, ${phone.batteryMah} baterai.`,
  };
}

export default async function PhoneDetailPage({ params }: Props) {
  const { slug } = await params;
  const phone = getPhoneBySlug(slug);
  if (!phone) notFound();

  const related = getRelatedPhones(slug, phone.brand);

  const heroStats = [
    { icon: <Monitor size={16} />, label: "Layar", val: phone.displayInches },
    { icon: <Camera size={16} />, label: "Kamera", val: phone.mainCameraMP },
    { icon: <Cpu size={16} />, label: "RAM / Chip", val: phone.ramChipset },
    { icon: <Battery size={16} />, label: "Baterai", val: phone.batteryMah },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Leaderboard Ad */}
        <div
          className="w-full px-4 sm:px-8 py-4"
          style={{
            background: "var(--bg-2)",
            borderBottom: "1px solid var(--border-2)",
          }}
        >
          <div className="mx-auto max-w-182">
            <AdBanner slot="leaderboard" />
          </div>
        </div>

        {/* 3-column wrapper */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-20 pt-6">
          <div className="mx-auto max-w-screen-2xl flex gap-6 items-start justify-center">
            {/* Left sidebar ad */}
            <aside className="hidden xl:flex flex-col gap-4 w-40 shrink-0 sticky top-24">
              <AdBanner slot="mpu-top" />
            </aside>

            {/* Center content */}
            <div className="flex-1 min-w-0 max-w-5xl">
              {/* Back */}
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm mb-6 transall hover:opacity-80"
                style={{ color: "var(--text-3)" }}
              >
                <ArrowLeft size={14} />
                Kembali ke Daftar HP
              </Link>

              {/* Hero */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Image */}
                <div
                  className="relative w-52 h-52 shrink-0 rounded-xl overflow-hidden"
                  style={{ background: "var(--bg-2)" }}
                >
                  <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    sizes="208px"
                    className="object-contain p-4"
                    priority
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest gold-text">
                      {phone.brand}
                    </span>
                    <h1
                      className="text-2xl sm:text-3xl font-bold mt-1"
                      style={{ color: "var(--text)" }}
                    >
                      {phone.name}
                    </h1>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-3)" }}
                    >
                      Dirilis {phone.releaseYear}
                    </p>
                  </div>

                  {/* Hero stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {heroStats.map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col gap-1.5 rounded-xl p-3"
                        style={{
                          background: "var(--bg-3)",
                          border: "1px solid var(--border-2)",
                        }}
                      >
                        <span style={{ color: "var(--gold)" }}>{s.icon}</span>
                        <span
                          className="text-[10px] uppercase tracking-wider"
                          style={{ color: "var(--text-3)" }}
                        >
                          {s.label}
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  {phone.specs.priceIDR && (
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl w-fit"
                      style={{
                        background: "var(--gold-dim)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-3)" }}
                      >
                        Estimasi Harga
                      </span>
                      <span className="text-base font-bold gold-text">
                        {phone.specs.priceIDR}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Spec table */}
              <SpecTable specs={phone.specs} />

              {/* Related phones */}
              {related.length > 0 && (
                <div className="mt-12">
                  <h2
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--text)" }}
                  >
                    HP {phone.brand} Lainnya
                  </h2>
                  <PhoneGrid phones={related} />
                </div>
              )}

              <div className="mt-6">
                <AdBanner slot="fluid" />
              </div>
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
    </>
  );
}
