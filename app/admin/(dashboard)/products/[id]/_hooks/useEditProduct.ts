"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/products/adminProductApi";
import { editProductPageSchema } from "../schemas/editProductPageSchema";

export type EditProductFormValues = z.infer<typeof editProductPageSchema>;

const SIZE_OPTIONS = ["38", "39", "40", "41", "42", "43", "44", "45"];
const LOW_STOCK_THRESHOLD = 5;

export const useEditProduct = (productId: string) => {
  const router = useRouter();

  const { data: product, isLoading: isFetching, isError } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: isSubmitting }] = useUpdateProductMutation();

  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [subImages, setSubImages] = useState<(string | null)[]>([null, null, null]);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [subFiles, setSubFiles] = useState<(File | null)[]>([null, null, null]);
  const [customSizes, setCustomSizes] = useState<string[]>([]);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductPageSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      sizes: [],
      tempCustomSize: "",
    },
  });

  useEffect(() => {
    if (!product) return;
    form.reset({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      sizes: product.sizes.map(String),
      tempCustomSize: "",
    });
    setHeroImage(product.images[0] ?? null);
    setSubImages([
      product.images[1] ?? null,
      product.images[2] ?? null,
      product.images[3] ?? null,
    ]);
  }, [product, form]);

  const selectedSizes = form.watch("sizes") || [];
  const tempCustomSizeValue = form.watch("tempCustomSize") || "";
  const stockValue = form.watch("stock");
  const isLowStock = Number(stockValue) > 0 && Number(stockValue) <= LOW_STOCK_THRESHOLD;
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

  const onSubmit = async (data: EditProductFormValues) => {
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
      await updateProduct({ id: productId, formData }).unwrap();
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product. Please try again.");
    }
  };

  return {
    form,
    product,
    isFetching,
    isError,
    isSubmitting,
    heroImage,
    subImages,
    selectedSizes,
    allSizes,
    sizeOptions: SIZE_OPTIONS,
    customSizes,
    showCustomSizeInput,
    isLowStock,
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
