"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateProductMutation } from "@/redux/features/admin/products/adminProductApi";
import { addNewProductsSchema } from "../schemas/addNewProductsSchema";

export type AddProductFormValues = z.infer<typeof addNewProductsSchema>;

const SIZE_OPTIONS = ["38", "39", "40", "41", "42", "43", "44", "45"];

export const useAddProduct = () => {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Image preview state (data URLs for display)
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [subImages, setSubImages] = useState<(string | null)[]>([null, null, null]);

  // Actual File objects for FormData submission
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [subFiles, setSubFiles] = useState<(File | null)[]>([null, null, null]);

  // Custom size state
  const [customSizes, setCustomSizes] = useState<string[]>([]);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addNewProductsSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "Bespoke Originals",
      price: "1250",
      stock: "12",
      sizes: ["38", "40", "43", "44"],
      colors: ["#1E293B"],
      materials: [
        { name: "French Calfskin", color: "#2563EB" },
        { name: "suede Trim", color: "#94A3B8" },
      ],
      tempCustomSize: "",
      tempMaterialName: "",
    },
  });

  const selectedSizes = form.watch("sizes") || [];
  const tempCustomSizeValue = form.watch("tempCustomSize") || "";
  const allSizes = [...SIZE_OPTIONS, ...customSizes];

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      form.setValue("sizes", selectedSizes.filter((s) => s !== size), { shouldValidate: true });
    } else {
      form.setValue("sizes", [...selectedSizes, size], { shouldValidate: true });
    }
  };

  const handleAddCustomSize = () => {
    const val = tempCustomSizeValue.trim();
    if (val && !SIZE_OPTIONS.includes(val) && !customSizes.includes(val)) {
      setCustomSizes((prev) => [...prev, val]);
      form.setValue("sizes", [...selectedSizes, val], { shouldValidate: true });
      form.setValue("tempCustomSize", "");
      setShowCustomSizeInput(false);
    }
  };

  const handleRemoveCustomSize = (size: string) => {
    setCustomSizes((prev) => prev.filter((s) => s !== size));
    form.setValue("sizes", selectedSizes.filter((s) => s !== size));
  };

  const handleHeroImageChange = (src: string | null) => {
    setHeroImage(src);
    if (!src) setHeroFile(null);
  };

  const handleSubImagesChange = (imgs: (string | null)[]) => {
    imgs.forEach((src, i) => {
      if (!src) setSubFiles((prev) => { const next = [...prev]; next[i] = null; return next; });
    });
    setSubImages(imgs);
  };

  const handleSubFileChange = (index: number, file: File | null) => {
    setSubFiles((prev) => { const next = [...prev]; next[index] = file; return next; });
  };

  const onSubmit = async (data: AddProductFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("sizes", JSON.stringify(data.sizes.map(Number)));

    if (heroFile) formData.append("images", heroFile);
    subFiles.forEach((file) => { if (file) formData.append("images", file); });

    try {
      await createProduct(formData).unwrap();
      toast.success("Product successfully created!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to create product. Please try again.");
    }
  };

  return {
    form,
    isLoading,
    heroImage,
    subImages,
    selectedSizes,
    allSizes,
    sizeOptions: SIZE_OPTIONS,
    customSizes,
    showCustomSizeInput,
    setShowCustomSizeInput,
    toggleSize,
    handleAddCustomSize,
    handleRemoveCustomSize,
    handleHeroImageChange,
    handleSubImagesChange,
    handleSubFileChange,
    onHeroFileChange: setHeroFile,
    onSubmit,
  };
};
