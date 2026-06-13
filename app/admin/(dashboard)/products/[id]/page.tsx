"use client";

import { useState } from "react";
import { useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { Plus, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/shared/SubmitButton";
import { cn } from "@/lib/utils";
import ImageUploader from "@/components/common/ImageUploader";
import { INITIAL_PRODUCTS } from "../_data/products";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Craft description is required"),
  category: z.string().min(1, "Collection category is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock unit is required"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  tempCustomSize: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const LOW_STOCK_THRESHOLD = 5;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const product = INITIAL_PRODUCTS.find((p) => p.id === productId);

  const [isLoading, setIsLoading] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(product?.image ?? null);
  const [subImages, setSubImages] = useState<(string | null)[]>([product?.image ?? null, null, null]);
  const [customSizes, setCustomSizes] = useState<string[]>([]);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      category: product?.category ?? "",
      price: product ? String(product.price) : "",
      stock: product ? String(product.stock) : "",
      sizes: product?.sizes ?? ["40", "43", "44"],
      tempCustomSize: "",
    },
  });

  const selectedSizes = form.watch("sizes") || [];
  const stockValue = form.watch("stock");
  const isLowStock = Number(stockValue) > 0 && Number(stockValue) <= LOW_STOCK_THRESHOLD;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log("Updating product:", { ...data, heroImage, subImages: subImages.filter(Boolean) });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Product updated successfully!");
    router.push("/admin/products");
  };

  const sizeOptions = ["38", "39", "40", "41", "42", "43", "44", "45"];
  const allSizes = [...sizeOptions, ...customSizes];

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      form.setValue("sizes", selectedSizes.filter((s) => s !== size), { shouldValidate: true });
    } else {
      form.setValue("sizes", [...selectedSizes, size], { shouldValidate: true });
    }
  };

  const tempCustomSizeValue = form.watch("tempCustomSize") || "";

  const handleAddCustomSize = () => {
    const val = tempCustomSizeValue.trim();
    if (val && !sizeOptions.includes(val) && !customSizes.includes(val)) {
      setCustomSizes((prev) => [...prev, val]);
      form.setValue("sizes", [...selectedSizes, val], { shouldValidate: true });
      form.setValue("tempCustomSize", "");
      setShowCustomSizeInput(false);
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-description">Product not found.</p>
        <Link href="/admin/products" className="text-primary text-sm font-medium hover:underline">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto font-sans">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-light-grey">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-description uppercase mb-1">
                <Link href="/admin/products" className="hover:text-foreground transition-colors">
                  Catalog
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground">{product.name}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Edit Product: {product.name}
              </h1>
            </div>

          
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <ImageUploader
                heroImage={heroImage}
                onHeroImageChange={setHeroImage}
                subImages={subImages}
                onSubImagesChange={setSubImages}
              />

              <div className="bg-white dark:bg-card border border-light-grey rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <h2 className="text-xl font-bold text-foreground tracking-tight">Identity & Narrative</h2>
                <div className="space-y-5">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="PRODUCT NAME"
                    placeholder="e.g., The Heritage Derby No. 04"
                    variant="h-12 w-full"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="description"
                    label="CRAFT DESCRIPTION"
                    placeholder="Detail the leather source, construction method (e.g. Goodyear Welted), and the artisan's vision..."
                    variant="w-full min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Commercials */}
              <div className="bg-white dark:bg-card border border-light-grey rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full h-48 bg-gray-100 dark:bg-dark-grey overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-description text-sm">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Commercials</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="stock"
                        label="STOCK UNIT"
                        placeholder="12"
                        variant="h-12 w-full"
                      />
                      {isLowStock && (
                        <span className="text-[11px] font-semibold text-red-500">Low Stock Warning</span>
                      )}
                    </div>

                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="category"
                      label="COLLECTION CATEGORY"
                      placeholder="Select category"
                      variant="h-12 w-full"
                    >
                      <SelectItem value="Bespoke Originals">Bespoke Originals</SelectItem>
                      <SelectItem value="Heritage Classic">Heritage Classic</SelectItem>
                      <SelectItem value="Modern Essential">Modern Essential</SelectItem>
                      <SelectItem value="Limited Edition">Limited Edition</SelectItem>
                      <SelectItem value="Evening Collection">Evening Collection</SelectItem>
                      <SelectItem value="Bespoke Casual">Bespoke Casual</SelectItem>
                      <SelectItem value="Artisanal Sport">Artisanal Sport</SelectItem>
                      <SelectItem value="Traditional Craft">Traditional Craft</SelectItem>
                    </CustomFormField>
                  </div>
                </div>
              </div>

              {/* Sizing Matrix */}
              <div className="bg-white dark:bg-card border border-light-grey rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Sizing Matrix</h2>
                  <span className="text-[11px] font-bold tracking-wider text-primary uppercase">EU STANDARD</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {allSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    const isCustom = !sizeOptions.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "h-12 flex items-center justify-center font-bold rounded-lg text-sm border transition-all duration-150 cursor-pointer relative",
                          isSelected
                            ? "bg-primary text-white border-primary"
                            : "bg-white dark:bg-dark-grey border-light-grey text-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        {size}
                        {isCustom && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setCustomSizes(customSizes.filter((s) => s !== size));
                              form.setValue("sizes", selectedSizes.filter((s) => s !== size));
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showCustomSizeInput ? (
                  <div className="flex gap-2 items-center bg-gray-50 dark:bg-dark-grey p-2.5 rounded-lg border border-light-grey mt-2">
                    <div className="flex-1">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="tempCustomSize"
                        placeholder="e.g. 37, 38.5, 46"
                        variant="h-10 text-xs w-full bg-white dark:bg-background border border-light-grey rounded-lg"
                      />
                    </div>
                    <SubmitButton
                      type="button"
                      clickFn={handleAddCustomSize}
                      className="px-3 h-10 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-deep shadow-none"
                    >
                      Add
                    </SubmitButton>
                    <SubmitButton
                      type="button"
                      clickFn={() => {
                        form.setValue("tempCustomSize", "");
                        setShowCustomSizeInput(false);
                      }}
                      className="px-3 h-10 bg-white dark:bg-background border border-light-grey text-foreground text-xs rounded-lg hover:bg-gray-50 shadow-none"
                    >
                      Cancel
                    </SubmitButton>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCustomSizeInput(true)}
                    className="w-full py-3 flex items-center justify-center border border-dashed border-light-grey rounded-xl text-sm text-description hover:text-foreground hover:border-gray-400 transition-all cursor-pointer font-medium"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Add Custom Size
                  </button>
                )}
              </div>



                <div className="flex flex-end items-end justify-end gap-3">
              <Link href="/admin/products">
                <SubmitButton
                  type="button"
                  className="h-11 px-5 text-sm font-semibold rounded-xl border border-light-grey bg-white dark:bg-dark-grey text-foreground hover:bg-inner-background transition-colors shadow-none cursor-pointer"
                >
                  Cancel
                </SubmitButton>
              </Link>
              <SubmitButton
                isLoading={isLoading}
                loadingText="Updating..."
                className="h-11 px-6 text-sm font-semibold rounded-xl bg-primary hover:opacity-90 text-white transition-all shadow-none border-0 cursor-pointer"
              >
                Update Product
              </SubmitButton>
            </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
