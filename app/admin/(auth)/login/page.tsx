"use client";

import { FormProvider as Form } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldAlert } from "lucide-react";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { useAdminLoginForm } from "./hooks/useAdminLoginForm";
import CompanyName from "@/components/common/company-name";


export default function AdminLoginPage() {
    const { currentYear, form, isLoading, showPassword, toggleShowPassword, onSubmit } = useAdminLoginForm();


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-white font-sans overflow-hidden">
    
      <div className="hidden md:block md:col-span-6 lg:col-span-5 relative h-full">
        <Image
          alt="Heirloom Bespoke Premium Footwear close-up"
          src="/img/admin-login-img.png"
          fill
          sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 42vw"
          className="object-cover object-center"
          priority
        />
        {/* Subtle dark overlay for premium lighting look */}
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
      </div>

      {/* Right Column: Centered Login Container */}
      <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col justify-between items-center p-6 md:p-12 lg:p-16 bg-white">
      
        <div className="hidden md:block h-6" />

        <div className="w-full max-w-150 flex flex-col items-stretch my-auto">
       
          <div className="flex flex-col items-center text-center ">
            <CompanyName />
            <p className="text-lg text-black font-medium mt-1">
              Admin Portal
            </p>
          </div>

    
          <div className=" p-6 md:p-8 flex flex-col gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    type="email"
                     label="Email Address"
                    placeholder="admin@atelier-electric.com"
                    leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
                    variant="h-11 shadow-sm w-full"
                  />
                </div>

               
                <div className="flex flex-col gap-1.5">
                  
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center p-1 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4.5 h-4.5" />
                        ) : (
                          <Eye className="w-4.5 h-4.5" />
                        )}
                      </button>
                    }
                    variant="h-11 shadow-sm w-full"

                  />
                  <div className="flex justify-between items-center w-full mt-2">
                    <Link
                      href="/admin/forgot-password"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
               
                </div>

             
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Logging In..."
                  className="w-full h-11 bg-[#0066FF] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-xs tracking-wider rounded-lg flex items-center justify-center gap-2 mt-4 transition-all uppercase cursor-pointer shadow-md shadow-blue-500/10"
                >
                  LOGIN TO SYSTEM <ArrowRight className="w-4 h-4" />
                </SubmitButton>
              </form>
            </Form>
           
            <div className="space-y-2">
              <hr className="border-t border-blue-200" />
              <div className="flex items-center justify-center gap-1.5 text-gray-400 font-bold tracking-widest text-[9px] select-none">
                <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                SECURE BIOMETRIC ENCRYPTION ENABLED
              </div>
            </div>

             <div className="w-full text-center space-y-2 select-none">
          <p className="text-[10px] text-gray-400 font-medium tracking-wide">
            © {currentYear} Shelly Collections. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-500">
            <Link href="/privacy" className="hover:text-gray-800 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="hover:text-gray-800 transition-colors">
              Security Terms
            </Link>
          </div>
        </div>
          </div>
        </div>

      
       
      </div>
    </div>
  );
}
