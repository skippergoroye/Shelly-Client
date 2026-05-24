"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Settings2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Visibility = "published" | "scheduled" | "draft";

const MATERIALS = [
  "Full-Grain Leather",
  "Suede",
  "Canvas",
  "Synthetic",
  "Mesh",
  "Patent Leather",
];

const SOLE_TYPES = [
  "Goodyear Welted Leather",
  "Rubber",
  "Crepe",
  "EVA Foam",
  "Vibram",
];

const CLOSURE_OPTIONS = ["Lace-up", "Buckle Monks", "Slip-on", "Zipper"];

const COLORS = [
  { label: "Black", value: "#111111" },
  { label: "Brown", value: "#6B3A2A" },
  { label: "Tan", value: "#C4A46B" },
  { label: "Navy", value: "#1B2A4A" },
];

const EU_SIZES = [38, 39, 40, 41, 42, 43, 44, 45];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Basic Info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Specifications
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [soleType, setSoleType] = useState(SOLE_TYPES[0]);
  const [closure, setClosure] = useState("Lace-up");

  // Variants
  const [selectedColors, setSelectedColors] = useState<string[]>(["#111111", "#6B3A2A", "#C4A46B", "#1B2A4A"]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([40, 41, 42]);

  // Images
  const [images, setImages] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  // Pricing & Stock
  const [price, setPrice] = useState("249.00");
  const [inventory, setInventory] = useState("150");
  const [sku, setSku] = useState("FW-2024-OX-BLK");
  const [trackInventory, setTrackInventory] = useState(true);

  // Visibility
  const [visibility, setVisibility] = useState<Visibility>("published");

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleSize = (size: number) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const toggleColor = (hex: string) =>
    setSelectedColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );

  return (
    <div className="max-w-6xl mx-auto font-sans">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 mb-1">Add New Footwear</h1>
          <p className="text-sm text-gray-500">
            Create a premium listing for your luxury footwear collection.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => router.push("/admin/inventory")}
            className="h-10 px-5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Discard
          </button>
          <button className="h-10 px-5 bg-[#0A58CA] hover:bg-[#084298] text-white rounded-md text-sm font-medium transition-colors shadow-sm">
            Save Product
          </button>
        </div>
      </div>

      {/* ── Two-Column Layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Basic Info */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">Basic Info</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Italian Leather Oxford"
                className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the craftsmanship, comfort, and style..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition resize-none"
              />
            </div>
          </section>

          {/* Footwear Specifications */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">Footwear Specifications</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Material</label>
                <div className="relative">
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full h-10 px-3 pr-8 border border-gray-200 rounded-md text-sm text-gray-800 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
                  >
                    {MATERIALS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                </div>
              </div>

              {/* Sole Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sole Type</label>
                <div className="relative">
                  <select
                    value={soleType}
                    onChange={(e) => setSoleType(e.target.value)}
                    className="w-full h-10 px-3 pr-8 border border-gray-200 rounded-md text-sm text-gray-800 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
                  >
                    {SOLE_TYPES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                </div>
              </div>
            </div>

            {/* Closure System */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2.5">Closure System</label>
              <div className="flex flex-wrap gap-3">
                {CLOSURE_OPTIONS.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="closure"
                      value={opt}
                      checked={closure === opt}
                      onChange={() => setClosure(opt)}
                      className="w-4 h-4 accent-[#0A58CA]"
                    />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Variants</h2>
              <button className="flex items-center gap-1.5 text-sm text-[#0A58CA] hover:text-[#084298] font-medium transition-colors">
                <Settings2 className="w-4 h-4" />
                Manage Options
              </button>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Available Colors</label>
              <div className="flex items-center gap-2 flex-wrap">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    title={c.label}
                    onClick={() => toggleColor(c.value)}
                    className="relative w-9 h-9 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: c.value,
                      borderColor: selectedColors.includes(c.value) ? "#0A58CA" : "transparent",
                      outline: selectedColors.includes(c.value) ? "2px solid #0A58CA" : "2px solid transparent",
                      outlineOffset: "2px",
                    }}
                  />
                ))}
                <button className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Shoe Sizes (EU)</label>
              <div className="flex flex-wrap gap-2">
                {EU_SIZES.map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-11 h-10 rounded-md border text-sm font-medium transition-all ${
                        active
                          ? "border-[#0A58CA] bg-[#EBF2FF] text-[#0A58CA]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Product Images */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Product Images</h2>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 py-8 cursor-pointer transition-colors mb-3 ${
                dragging ? "border-[#0A58CA] bg-[#EBF2FF]" : "border-gray-200 hover:border-gray-300 bg-gray-50"
              }`}
            >
              <Upload className="w-7 h-7 text-gray-400" />
              <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                High-res JPEG or PNG (max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative w-[72px] h-[72px] rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-5 h-5 bg-gray-900/70 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-[72px] h-[72px] rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>

          {/* Pricing & Stock */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Pricing & Stock</h2>

            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Base Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 pl-7 pr-3 border border-gray-200 rounded-md text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Inventory
                </label>
                <input
                  type="number"
                  value={inventory}
                  onChange={(e) => setInventory(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  SKU
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A58CA]/30 focus:border-[#0A58CA] transition"
                />
              </div>
            </div>

            {/* Track Inventory Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Track Inventory</span>
              <button
                onClick={() => setTrackInventory((v) => !v)}
                className={`relative w-10 h-6 rounded-full transition-colors ${
                  trackInventory ? "bg-[#0A58CA]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    trackInventory ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
