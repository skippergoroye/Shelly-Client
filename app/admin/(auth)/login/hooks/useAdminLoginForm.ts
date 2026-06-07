import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginSchema, type LoginFormValues } from "../schema/adminLogin.schema";


export function useAdminLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form Submitted", data);
      router.push("/admin");
    }, 1500);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);


  const currentYear = new Date().getFullYear();

  return {
    form,
    isLoading,
    showPassword,
    toggleShowPassword,
    onSubmit,
    currentYear
  };
}