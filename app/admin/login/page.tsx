"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { useForm, FormProvider as Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import CompanyName from "@/components/common/company-name";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form Submitted", data);
       // Redirect to dashboard
      router.push("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <CompanyName />
          {/* <h1 className="text-[#0A4297] font-bold text-2xl tracking-widest mb-4">LUXE</h1> */}
          <h2 className="text-[22px] font-semibold text-gray-900 mb-2 mt-4">Sign in to Admin Console</h2>
          <p className="text-[13px] text-gray-500">Enter your credentials to manage your portal</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                type="email"
                label="Email Address"
                placeholder="admin@luxe-commerce.com"
                variant="h-11 shadow-sm w-full"
              />
            
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                variant="h-11 shadow-sm text-lg tracking-widest w-full"
              />
            </div>

            <SubmitButton 
              isLoading={isLoading} 
              loadingText="Signing In..."
              className="w-full h-11 bg-[#0A58CA] hover:bg-[#084298] text-white font-medium rounded-md flex items-center justify-center gap-2 mt-6 transition-colors shadow-sm"
            >
              Sign In <LogIn className="w-4 h-4 ml-1" />
            </SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
