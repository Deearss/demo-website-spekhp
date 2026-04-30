import Image from "next/image";
import Link from "next/link";
import { Battery, Camera, Cpu, Monitor } from "lucide-react";
import type { Phone } from "@/types/phone";

type Props = {
  phones: Phone[];
  isLoading?: boolean;
};

export default function PhoneGrid({ phones, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl overflow-hidden bg-surface border border-white/5 animate-pulse"
          >
            <div className="relative w-full aspect-square bg-bg-2/50" />
            <div className="flex flex-col gap-3 p-3">
              <div>
                <div className="h-2 w-1/4 bg-white/10 rounded mb-2" />
                <div className="h-3.5 w-3/4 bg-white/10 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 pb-1.5 border-t border-white/5 mt-1">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-3.5 w-3.5 bg-white/10 rounded-full shrink-0" />
                    <div className="h-2 w-full max-w-10 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (phones.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-text-3">
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
          className="group flex flex-col rounded-xl overflow-hidden card-hover bg-surface border border-white/10"
        >
          {/* Image */}
          <div className="relative w-full aspect-square overflow-hidden bg-bg-2">
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
              <p className="text-[10px] font-medium uppercase tracking-widest text-gold">
                {phone.brand}
              </p>
              <p className="text-sm font-semibold leading-snug mt-0.5 line-clamp-2 text-text">
                {phone.name}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 pt-3 pb-1.5 border-t border-white/10">
              {[
                { icon: <Monitor size={14} />, val: phone.displayInches },
                { icon: <Camera size={14} />, val: phone.mainCameraMP },
                {
                  icon: <Cpu size={14} />,
                  val: phone.ramChipset.split("/")[0].trim(),
                },
                { icon: <Battery size={14} />, val: phone.batteryMah },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-text-3">{s.icon}</span>
                  <span className="text-[10px] truncate text-text-2">
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
