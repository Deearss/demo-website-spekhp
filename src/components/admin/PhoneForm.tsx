"use client";

import { useState } from "react";
import type { Phone, PhoneSpecs } from "@/types/phone";
import { Save, X } from "lucide-react";
import Link from "next/link";

type PhoneFormProps = {
  mode: "create" | "edit";
  initialData?: Partial<Phone>;
  onSubmit: (data: Partial<Phone>) => Promise<void>;
};

type InputFieldProps = {
  label: string;
  name: string;
  isSpec?: boolean;
  type?: string;
  required?: boolean;
  formData: Partial<Phone>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    isSpec?: boolean,
  ) => void;
};

const InputField = ({
  label,
  name,
  isSpec = false,
  type = "text",
  required = false,
  formData,
  handleChange,
}: InputFieldProps) => {
  const value = isSpec
    ? (formData.specs as Record<string, string | number | undefined>)?.[name]
    : (formData as Record<string, string | number | undefined>)?.[name];
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-text-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value || ""}
        onChange={(e) => handleChange(e, isSpec)}
        className="bg-bg-2 border border-surface-2 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold transition-colors text-text"
      />
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSpec: boolean = false,
  ) => {
    const { name, value } = e.target;
    if (isSpec) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [name]: value,
        } as PhoneSpecs,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "releaseYear" ? parseInt(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
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
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Slug (URL-friendly)"
            name="slug"
            required
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Brand"
            name="brand"
            required
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Nama HP"
            name="name"
            required
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Tahun Rilis"
            name="releaseYear"
            type="number"
            required
          />
          <div className="sm:col-span-2">
            <InputField
              formData={formData}
              handleChange={handleChange}
              label="URL Gambar"
              name="image"
              required
            />
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
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Main Camera MP"
            name="mainCameraMP"
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="RAM / Chipset"
            name="ramChipset"
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Battery mAh"
            name="batteryMah"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Announced"
                name="announced"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Status"
                name="status"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Weight"
                name="weight"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="SIM"
                name="sim"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="IP Rating"
                name="ipRating"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Size"
                name="displaySize"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Resolution"
                name="resolution"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Chipset"
                name="chipset"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="CPU"
                name="cpu"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="GPU"
                name="gpu"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Card Slot"
                name="cardSlot"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Internal"
                name="internal"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Main Features"
                name="mainCameraFeatures"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Main Video"
                name="mainCameraVideo"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Selfie Camera"
                name="frontCamera"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Selfie Video"
                name="frontCameraVideo"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="3.5mm Jack"
                name="jack35mm"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="WLAN"
                name="wlan"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Bluetooth"
                name="bluetooth"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="NFC"
                name="nfc"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="USB"
                name="usb"
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
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Charging"
                name="charging"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Colors"
                name="colors"
                isSpec
              />
              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Price (IDR)"
                name="priceIDR"
                isSpec
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 bg-gold hover:bg-gold-light text-bg-2 font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isLoading ? "Menyimpan..." : "Simpan Data"}
        </button>
        <Link
          href="/admin/phones"
          className="flex items-center gap-2 bg-surface-2 hover:bg-surface text-text font-medium px-6 py-2.5 rounded-lg border border-surface-2 transition-colors"
        >
          <X size={18} />
          Batal
        </Link>
      </div>
    </form>
  );
}
