import Image from "next/image";
import Link from "next/link";
import { Battery, Camera, Cpu, Monitor } from "lucide-react";
import type { Phone } from "@/types/phone";

type Props = { phones: Phone[] };

export default function PhoneGrid({ phones }: Props) {
  if (phones.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-20"
        style={{ color: "var(--text-3)" }}
      >
        <Monitor size={40} strokeWidth={1.2} />
        <p className="text-sm">Tidak ada HP yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {phones.map((phone) => (
        <Link
          key={phone.slug}
          href={`/phones/${phone.slug}`}
          className="group flex flex-col rounded-xl overflow-hidden card-hover"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-2)",
          }}
        >
          {/* Image */}
          <div
            className="relative w-full aspect-square overflow-hidden"
            style={{ background: "var(--bg-2)" }}
          >
            <Image
              src={phone.image}
              alt={phone.name}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
              className="object-contain p-0 transall group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 p-3">
            <div>
              <p
                className="text-[10px] font-medium uppercase tracking-widest"
                style={{ color: "var(--gold)" }}
              >
                {phone.brand}
              </p>
              <p
                className="text-sm font-semibold leading-snug mt-0.5 line-clamp-2"
                style={{ color: "var(--text)" }}
              >
                {phone.name}
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-1 pt-2"
              style={{ borderTop: "1px solid var(--border-2)" }}
            >
              {[
                { icon: <Monitor size={10} />, val: phone.displayInches },
                { icon: <Camera size={10} />, val: phone.mainCameraMP },
                {
                  icon: <Cpu size={10} />,
                  val: phone.ramChipset.split("/")[0].trim(),
                },
                { icon: <Battery size={10} />, val: phone.batteryMah },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span style={{ color: "var(--text-3)" }}>{s.icon}</span>
                  <span
                    className="text-[10px] truncate"
                    style={{ color: "var(--text-2)" }}
                  >
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
