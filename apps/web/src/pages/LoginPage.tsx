import { Button, Input } from "@pnpm-mono/ui";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { useForm } from "react-hook-form";
import type { LoginInSchemaType } from "../schema/signUpSchema";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const {register , formState:{errors},handleSubmit,setError } = useForm<LoginInSchemaType>()

  const [showPassword, setShowPassword] = useState(false);
  
  const {mutate,isPending} = useLogin({
    onGlobalError:(err)=>{
      toast.error(err)
    },
    onFieldErrors:(field,message)=>{
      setError(field,{
        message
      })
    },
    onSuccess:()=>{
      toast.success("User Logged In")
      navigate("/dashboard")
    }
  })

  const onSubmit=(data:LoginInSchemaType)=>{
   mutate(data)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative blobs for theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 sm:p-10 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-zinc-800 relative z-10"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="p-3 bg-fuchsia-600 rounded-2xl shadow-lg shadow-fuchsia-600/30 mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-center">
            Welcome back 
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium text-center">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
            <Input
              label="Email or Username"
              placeholder="name@example.com"
              className="pl-11"
              {...register("usernameOrEmail")}
            />
            {errors.usernameOrEmail && errors.usernameOrEmail.message &&<ErrorText>{errors.usernameOrEmail.message}</ErrorText>}
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-11 pr-12"
              {...register("password")}

            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.password && errors.password.message && <ErrorText>{errors.password.message}</ErrorText>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-bold text-fuchsia-600 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 uppercase tracking-widest transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-fuchsia-600/20 group hover:opacity-90 mt-2"
            isLoading={isPending}
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 dark:bg-zinc-900 px-4 text-zinc-400 font-bold tracking-widest">
              New here?
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-2xl font-semibold bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </Button>
      </motion.div>
    </div>
  );
}
