"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Phone, PhoneSpecs } from "@/types/phone";
import { Save, X, ImageOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToastStore } from "@/store/useToastStore";
import { adminCheckSlug } from "@/lib/admin-api";

type PhoneFormProps = {
  mode: "create" | "edit";
  initialData?: Partial<Phone>;
  onSubmit: (data: Partial<Phone>) => Promise<void>;
};

type InputFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  isSpec?: boolean;
  type?: string;
  required?: boolean;
  list?: string;
  options?: string[];
  error?: string | null;
  warning?: string | null;
  formData: Partial<Phone>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isSpec?: boolean,
  ) => void;
};

const InputField = ({
  label,
  name,
  placeholder,
  isSpec = false,
  type = "text",
  required = false,
  list,
  options,
  error,
  warning,
  formData,
  handleChange,
}: InputFieldProps) => {
  const value = isSpec
    ? (formData.specs as Record<string, string | number | undefined>)?.[name]
    : (formData as Record<string, string | number | undefined>)?.[name];
  const hasError = !!error;
  const hasWarning = !hasError && !!warning;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value || ""}
        list={list}
        onChange={(e) => handleChange(e, isSpec)}
        className={`bg-bg-2 border rounded-lg px-3 py-2 text-sm outline-none transition-colors text-text placeholder:text-text-3/50 ${
          hasError
            ? "border-red-500/70 focus:border-red-500"
            : hasWarning
            ? "border-yellow-500/70 focus:border-yellow-500"
            : "border-surface-2 focus:border-gold"
        }`}
      />
      {list && options && (
        <datalist id={list}>
          {options.map((opt) => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
      )}
      {hasError && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
      {hasWarning && (
        <p className="text-xs text-yellow-400 flex items-center gap-1">
          <AlertCircle size={12} /> {warning}
        </p>
      )}
    </div>
  );
};

export default function PhoneForm({ initialData, onSubmit }: PhoneFormProps) {
  const [formData, setFormData] = useState<Partial<Phone>>({
    slug: initialData?.slug || "",
    brand: initialData?.brand || "",
    name: initialData?.name || "",
    image: initialData?.image || "",
    releaseYear: initialData?.releaseYear || new Date().getFullYear(),
    displayInches: initialData?.displayInches || "",
    mainCameraMP: initialData?.mainCameraMP || "",
    ramChipset: initialData?.ramChipset || "",
    batteryMah: initialData?.batteryMah || "",
    specs: {
      network: initialData?.specs?.network || "",
      announced: initialData?.specs?.announced || "",
      status: initialData?.specs?.status || "",
      dimensions: initialData?.specs?.dimensions || "",
      weight: initialData?.specs?.weight || "",
      sim: initialData?.specs?.sim || "",
      ipRating: initialData?.specs?.ipRating || "",
      displayType: initialData?.specs?.displayType || "",
      displaySize: initialData?.specs?.displaySize || "",
      resolution: initialData?.specs?.resolution || "",
      os: initialData?.specs?.os || "",
      chipset: initialData?.specs?.chipset || "",
      cpu: initialData?.specs?.cpu || "",
      gpu: initialData?.specs?.gpu || "",
      cardSlot: initialData?.specs?.cardSlot || "",
      internal: initialData?.specs?.internal || "",
      mainCamera: initialData?.specs?.mainCamera || "",
      mainCameraFeatures: initialData?.specs?.mainCameraFeatures || "",
      mainCameraVideo: initialData?.specs?.mainCameraVideo || "",
      frontCamera: initialData?.specs?.frontCamera || "",
      frontCameraVideo: initialData?.specs?.frontCameraVideo || "",
      loudspeaker: initialData?.specs?.loudspeaker || "",
      jack35mm: initialData?.specs?.jack35mm || "",
      wlan: initialData?.specs?.wlan || "",
      bluetooth: initialData?.specs?.bluetooth || "",
      nfc: initialData?.specs?.nfc || "",
      usb: initialData?.specs?.usb || "",
      batteryType: initialData?.specs?.batteryType || "",
      charging: initialData?.specs?.charging || "",
      colors: initialData?.specs?.colors || "",
      priceIDR: initialData?.specs?.priceIDR || "",
    } as PhoneSpecs,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  // ── Validasi real-time ──
  type FieldErrors = { slug?: string | null; name?: string | null; brand?: string | null; releaseYear?: string | null };
  type FieldWarnings = { slug?: string | null };
  const [errors, setErrors] = useState<FieldErrors>({});
  const [warnings, setWarnings] = useState<FieldWarnings>({});
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const slugCheckTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Preview Gambar ──
  const [imageStatus, setImageStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const imageDebounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const validateField = useCallback(
    async (name: string, value: string | number | undefined) => {
      const newErrors: FieldErrors = { ...errors };
      const newWarnings: FieldWarnings = { ...warnings };

      if (name === "name") {
        newErrors.name = !String(value).trim() ? "Nama HP wajib diisi" : null;
      }
      if (name === "brand") {
        newErrors.brand = !String(value).trim() ? "Brand wajib diisi" : null;
      }
      if (name === "releaseYear") {
        const year = Number(value);
        newErrors.releaseYear =
          isNaN(year) || year < 2000 || year > 2030
            ? "Tahun rilis harus antara 2000–2030"
            : null;
      }
      if (name === "slug") {
        const slugVal = String(value);
        if (!slugVal.trim()) {
          newErrors.slug = "Slug wajib diisi";
          newWarnings.slug = null;
        } else {
          newErrors.slug = null;
          // Cek keunikan slug dengan debounce
          if (slugCheckTimeout.current) clearTimeout(slugCheckTimeout.current);
          setIsCheckingSlug(true);
          slugCheckTimeout.current = setTimeout(async () => {
            try {
              const taken = await adminCheckSlug(slugVal, initialData?.slug);
              setWarnings((prev) => ({ ...prev, slug: taken ? "Slug ini sudah dipakai HP lain" : null }));
            } finally {
              setIsCheckingSlug(false);
            }
          }, 600);
        }
      }

      setErrors(newErrors);
      if (name !== "slug") setWarnings(newWarnings); // slug warnings diset async
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors, warnings, initialData?.slug]
  );

  // Trigger preview saat image URL berubah
  useEffect(() => {
    const url = formData.image;
    if (!url) { setImageStatus("idle"); return; }
    if (imageDebounceTimeout.current) clearTimeout(imageDebounceTimeout.current);
    setImageStatus("loading");
    imageDebounceTimeout.current = setTimeout(() => {
      const img = new Image();
      img.onload = () => setImageStatus("ok");
      img.onerror = () => setImageStatus("error");
      img.src = url;
    }, 500);
    return () => { if (imageDebounceTimeout.current) clearTimeout(imageDebounceTimeout.current); };
  }, [formData.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSpec: boolean = false,
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    // Sanitize slug: lowercase and replace non-url-friendly chars
    if (name === "slug") {
      value = value
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, "") // remove all non-alphanumeric except hyphens
        .replace(/-+/g, "-"); // prevent multiple hyphens
    }

    if (isSpec) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [name]: value,
        } as PhoneSpecs,
      }));
    } else {
      setFormData((prev) => {
        const newData = {
          ...prev,
          [name]: name === "releaseYear" ? parseInt(value) || 0 : value,
        };

        // Auto-generate slug from name
        if (name === "name") {
          newData.slug = value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
        }

        return newData;
      });
    }
    // Trigger validasi real-time langsung dengan value final
    const finalVal = name === "releaseYear" ? parseInt(value) || 0 : value;
    validateField(name, finalVal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      showToast("Data HP berhasil disimpan!", "success");
    } catch (err) {
      console.error(err);
      showToast("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* 1. Info Utama */}
      <div className="bg-surface border border-surface-2 rounded-xl p-6">
        <h3 className="text-lg font-bold text-text mb-4 border-b border-surface-2 pb-2">
          Info Utama
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Slug field + indicator cek keunikan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-2">Slug (URL-friendly)</label>
            <div className="relative">
              <input
                type="text"
                name="slug"
                required
                placeholder="cth: samsung-galaxy-s25"
                value={formData.slug || ""}
                onChange={(e) => handleChange(e)}
                className={`w-full bg-bg-2 border rounded-lg px-3 py-2 pr-8 text-sm outline-none transition-colors text-text placeholder:text-text-3/50 ${
                  errors.slug
                    ? "border-red-500/70 focus:border-red-500"
                    : warnings.slug
                    ? "border-yellow-500/70 focus:border-yellow-500"
                    : "border-surface-2 focus:border-gold"
                }`}
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                {isCheckingSlug && <Loader2 size={14} className="text-text-3 animate-spin" />}
                {!isCheckingSlug && formData.slug && !errors.slug && !warnings.slug && (
                  <CheckCircle2 size={14} className="text-green-500" />
                )}
              </div>
            </div>
            {errors.slug && (
              <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle size={12} /> {errors.slug}</p>
            )}
            {!errors.slug && warnings.slug && (
              <p className="text-xs text-yellow-400 flex items-center gap-1"><AlertCircle size={12} /> {warnings.slug}</p>
            )}
          </div>

          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Brand"
            name="brand"
            placeholder="cth: Samsung"
            list="brand-options"
            options={["Samsung", "Apple", "Xiaomi", "OPPO", "Vivo", "Realme", "OnePlus", "Google"]}
            error={errors.brand}
            required
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Nama HP"
            name="name"
            placeholder="cth: Samsung Galaxy S25"
            error={errors.name}
            required
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Tahun Rilis"
            name="releaseYear"
            type="number"
            placeholder="cth: 2025"
            error={errors.releaseYear}
            required
          />
          {/* URL Gambar + Image Preview */}
          <div className="sm:col-span-2 flex gap-4 items-start">
            <div className="flex-1">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="URL Gambar"
                name="image"
                placeholder="cth: https://example.com/images/s25.webp"
                required
              />
            </div>
            {/* Preview thumbnail */}
            <div className="mt-6 shrink-0 w-20 h-20 bg-bg-2 border border-surface-2 rounded-lg flex items-center justify-center overflow-hidden">
              {imageStatus === "idle" && <ImageOff size={24} className="text-text-3/40" />}
              {imageStatus === "loading" && <Loader2 size={24} className="text-text-3 animate-spin" />}
              {imageStatus === "error" && (
                <div className="flex flex-col items-center gap-1 text-center px-1">
                  <ImageOff size={18} className="text-red-400" />
                  <span className="text-[10px] text-red-400">Gagal dimuat</span>
                </div>
              )}
              {imageStatus === "ok" && formData.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-contain p-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Stats */}
      <div className="bg-surface border border-surface-2 rounded-xl p-6">
        <h3 className="text-lg font-bold text-text mb-4 border-b border-surface-2 pb-2">
          Hero Stats (Shortcut)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Display Inches"
            name="displayInches"
            placeholder="cth: 6.7"
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Main Camera MP"
            name="mainCameraMP"
            placeholder="cth: 200 MP"
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="RAM / Chipset"
            name="ramChipset"
            placeholder="cth: 12GB / Snapdragon 8 Gen 4"
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Battery mAh"
            name="batteryMah"
            placeholder="cth: 5000 mAh"
          />
        </div>
      </div>

      {/* 3. Specs Details */}
      <div className="bg-surface border border-surface-2 rounded-xl p-6">
        <h3 className="text-lg font-bold text-text mb-4 border-b border-surface-2 pb-2">
          Spesifikasi Lengkap
        </h3>

        <div className="flex flex-col gap-8">
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Network & Launch
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Network"
                name="network"
                placeholder="cth: GSM / HSPA / LTE / 5G"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Announced"
                name="announced"
                placeholder="cth: 2025, January"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Status"
                name="status"
                placeholder="cth: Available. Released 2025, February"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Body
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Dimensions"
                name="dimensions"
                placeholder="cth: 158.0 x 75.8 x 7.8 mm"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Weight"
                name="weight"
                placeholder="cth: 190 g"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="SIM"
                name="sim"
                placeholder="cth: Dual SIM (Nano-SIM)"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="IP Rating"
                name="ipRating"
                placeholder="cth: IP68"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Display
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Type"
                name="displayType"
                placeholder="cth: Dynamic AMOLED 2X, 120Hz"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Size"
                name="displaySize"
                placeholder="cth: 6.7 inches, 108.4 cm²"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Resolution"
                name="resolution"
                placeholder="cth: 1440 x 3088 pixels, 20:9"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Platform & Memory
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="OS"
                name="os"
                placeholder="cth: Android 15, One UI 7"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Chipset"
                name="chipset"
                placeholder="cth: Snapdragon 8 Elite (3 nm)"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="CPU"
                name="cpu"
                placeholder="cth: Octa-core (2x4.47GHz + 6x3.53GHz)"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="GPU"
                name="gpu"
                placeholder="cth: Adreno 830"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Card Slot"
                name="cardSlot"
                placeholder="cth: No / microSDXC"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Internal"
                name="internal"
                placeholder="cth: 256GB 12GB RAM"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Cameras
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Main Camera"
                name="mainCamera"
                placeholder="cth: 200 MP, f/1.7, OIS"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Main Features"
                name="mainCameraFeatures"
                placeholder="cth: LED flash, Auto-HDR, panorama"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Main Video"
                name="mainCameraVideo"
                placeholder="cth: 8K@30fps, 4K@120fps"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Selfie Camera"
                name="frontCamera"
                placeholder="cth: 12 MP, f/2.2"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Selfie Video"
                name="frontCameraVideo"
                placeholder="cth: 4K@60fps"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Sound & Comms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Loudspeaker"
                name="loudspeaker"
                placeholder="cth: Yes, with stereo speakers"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="3.5mm Jack"
                name="jack35mm"
                placeholder="cth: No"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="WLAN"
                name="wlan"
                placeholder="cth: Wi-Fi 802.11 a/b/g/n/ac/6e"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Bluetooth"
                name="bluetooth"
                placeholder="cth: 5.4, A2DP, LE"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="NFC"
                name="nfc"
                placeholder="cth: Yes"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="USB"
                name="usb"
                placeholder="cth: USB Type-C 3.2, OTG"
                isSpec
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
              Battery & Misc
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Type"
                name="batteryType"
                placeholder="cth: Li-Ion 5000 mAh, non-removable"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Charging"
                name="charging"
                placeholder="cth: 65W wired, 15W wireless"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Colors"
                name="colors"
                placeholder="cth: Icy Blue, Midnight Black"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Price (IDR)"
                name="priceIDR"
                placeholder="cth: Rp 14.999.000"
                isSpec
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 z-40 flex items-center justify-end gap-4 p-4 mt-8 bg-surface/80 backdrop-blur-md border border-surface-2 rounded-xl shadow-xl">
        <Link
          href="/admin/phones"
          className="flex items-center gap-2 bg-surface-2 hover:bg-surface text-text font-medium px-6 py-2.5 rounded-lg border border-surface-2 transition-colors"
        >
          <X size={18} />
          Batal
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-bg-2 font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isLoading ? "Menyimpan..." : "Simpan Data"}
        </button>
      </div>
    </form>
  );
}
