import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LoginSchema, type LoginFormValues } from "../schema/adminLogin.schema";
import { useAdminLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import ToastNotification from "@/components/shared/ToastNotification";

export function useAdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await adminLogin({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        setCredentials({
          token: result.accessToken,
          user: {
            id: result.admin.id,
            email: result.admin.email,
            name: "",
            profilePicture: null,
            role: { title: "admin" },
          },
        })
      );

      ToastNotification({
        title: "Welcome back",
        description: "Logged in successfully.",
        type: "success",
      });

      router.push("/admin");
    } catch (error: any) {
      ToastNotification({
        title: "Login Failed",
        description: error?.data?.message ?? "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const currentYear = new Date().getFullYear();

  return {
    form,
    isLoading,
    showPassword,
    toggleShowPassword,
    onSubmit,
    currentYear,
  };
}
