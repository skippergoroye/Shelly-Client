"use client";

import { useParams } from "next/navigation";
import { FormProvider as Form } from "react-hook-form";
import { Plus, X, ChevronRight, Loader } from "lucide-react";
import Link from "next/link";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/shared/SubmitButton";
import { cn } from "@/lib/utils";
import ImageUploader from "@/components/common/ImageUploader";
import { useEditProduct } from "./_hooks/useEditProduct";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const {
    form,
    product,
    isFetching,
    isError,
    isSubmitting,
    heroImage,
    subImages,
    selectedSizes,
    allSizes,
    sizeOptions,
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
    onHeroFileChange,
    onSubmit,
  } = useEditProduct(productId);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                onHeroImageChange={handleHeroImageChange}
                onHeroFileChange={onHeroFileChange}
                subImages={subImages}
                onSubImagesChange={handleSubImagesChange}
                onSubFileChange={handleSubFileChange}
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
             
              <div className="bg-white dark:bg-card border border-light-grey rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full h-48 bg-gray-100 dark:bg-dark-grey overflow-hidden">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-description text-sm">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">Commercials</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="price"
                      label="PRICE (USD)"
                      placeholder="1250"
                      leftIcon={<span className="text-description font-medium">$</span>}
                      variant="h-12 w-full"
                    />
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
                      <SubmitButton
                        key={size}
                        type="button"
                        clickFn={() => toggleSize(size)}
                        className={cn(
                          "h-12 font-bold rounded-lg text-sm border transition-all duration-150 relative shadow-none",
                          isSelected
                            ? "bg-primary text-white border-primary hover:opacity-90"
                            : "bg-white dark:bg-dark-grey border-light-grey text-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        {size}
                        {isCustom && (
                          <SubmitButton
                            type="button"
                            clickFn={(e) => {
                              e.stopPropagation();
                              handleRemoveCustomSize(size);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 p-0 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-none border-0"
                          >
                            <X className="w-2.5 h-2.5" />
                          </SubmitButton>
                        )}
                      </SubmitButton>
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
                  <SubmitButton
                    type="button"
                    clickFn={() => setShowCustomSizeInput(true)}
                    className="w-full py-3 border border-dashed border-light-grey rounded-xl text-sm text-description hover:text-foreground hover:border-gray-400 transition-all font-medium bg-transparent shadow-none hover:bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Add Custom Size
                  </SubmitButton>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link href="/admin/products">
                  <SubmitButton
                    type="button"
                    className="h-11 px-5 text-sm font-semibold rounded-xl border border-light-grey bg-white dark:bg-dark-grey text-foreground hover:bg-inner-background transition-colors shadow-none cursor-pointer"
                  >
                    Cancel
                  </SubmitButton>
                </Link>
                <SubmitButton
                  isLoading={isSubmitting}
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
