import * as z from "zod";



export const addNewProductsSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Craft description is required"),
  category: z.string().min(1, "Collection category is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock unit is required"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  colors: z.array(z.string()).min(1, "Select at least one color"),
  materials: z.array(
    z.object({
      name: z.string().min(1, "Material name is required"),
      color: z.string(),
    })
  ).min(1, "At least one material is required"),
  tempCustomSize: z.string().optional(),
  tempMaterialName: z.string().optional(),
});