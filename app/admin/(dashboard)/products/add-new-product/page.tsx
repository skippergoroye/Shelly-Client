"use client";

import { useState } from "react";
import { useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus } from "lucide-react";
import Link from "next/link";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import SubmitButton from "@/components/shared/SubmitButton";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
  status: z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      status: "active",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-light-grey bg-background text-description hover:text-foreground hover:bg-inner-background transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add Product</h1>
          <p className="text-sm text-description">Create a new product in your catalog</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-xl border border-light-grey bg-card p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Product Information</h3>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Product Name"
              placeholder="Enter product name"
              variant="h-11 shadow-sm w-full"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter product description"
              variant="w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="category"
                label="Category"
                placeholder="Select category"
                variant="h-11 shadow-sm w-full"
              >
                <SelectItem value="footwear">Footwear</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="price"
                label="Price"
                type="number"
                placeholder="0.00"
                variant="h-11 shadow-sm w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="stock"
                label="Stock Quantity"
                type="number"
                placeholder="0"
                variant="h-11 shadow-sm w-full"
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="status"
                label="Status"
                placeholder="Select status"
                defaultValue="active"
                variant="h-11 w-full"
              >
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </CustomFormField>
            </div>
          </div>

          <div className="rounded-xl border border-primary bg-input-background p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Product Images</h3>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary rounded-lg cursor-pointer bg-input-background hover:bg-dark-grey/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 text-description mb-2" />
                  <p className="text-sm text-description">
                    <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-description mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/png,image/jpeg,image/webp" multiple />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link href="/admin/products">
              <SubmitButton type="button" className="h-10 px-6 text-xs font-semibold rounded-lg border border-light-grey bg-background text-foreground hover:bg-inner-background transition-colors shadow-none">
                Cancel
              </SubmitButton>
            </Link>
            <SubmitButton
              isLoading={isLoading}
              loadingText="Saving..."
              className="h-10 px-6 text-xs font-semibold rounded-lg bg-primary text-white hover:opacity-90 transition-opacity shadow-none border-0"
            >
              Save Product
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
