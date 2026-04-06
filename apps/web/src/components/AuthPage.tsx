import * as React from "react";
import { Button, Input, Badge } from "@pnpm-mono/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useSignUp } from "../hooks/useSignUp";
import { useForm } from "react-hook-form";
import { loginSchema, signUpSchema, type LoginInSchemaType, type SignUpSchemaType } from "../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "./ErrorText";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) })

  const { register: loginRegisters, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, setError: setLoginErrors } = useForm<LoginInSchemaType>({ resolver: zodResolver(loginSchema) })

  const { mutate, isPending } = useSignUp({
    onFieldErrors:(field, message) =>{
      setError(field, {
        message
      })
    },
    onGlobalError:(err) =>{
      toast.error(err)
    },
    onSuccess:({})=>{
      toast.success("User Registered")
    }
  })

  // const 

  const onSubmit = (data: {
    username: string,
    name: string,
    email: string,
    password: string
  }) => {
    mutate(data)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1  gap-0 overflow-hidden rounded-[2.5rem] glass-card shadow-2xl"
      >

        {/* Content Side */}
        <div className="p-8 md:p-14 bg-white dark:bg-zinc-950 flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <div className="lg:hidden flex justify-center mb-6">
                <div className="p-3 bg-cyan-500 rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                {isLogin ? "Welcome back" : "Create an account"}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                {isLogin
                  ? "Enter your credentials to access your dashboard."
                  : "Start your journey towards financial freedom today."}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-10.5 w-4 h-4 text-zinc-400 z-10" />
                        <Input
                          label="Username"
                          placeholder="John Doe"
                          className="pl-11"
                          {...register("username")}

                        />
                        {errors.username && errors.username.message && <ErrorText>{errors.username.message}</ErrorText>}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="relative">
                        <User className="absolute left-4 top-10.5 w-4 h-4 text-zinc-400 z-10" />
                        <Input
                          label="Full Name"
                          placeholder="John Doe"
                          className="pl-11"
                          {...register("name")}

                        />
                        {errors.name && errors.name.message && <ErrorText>{errors.name.message}</ErrorText>}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-10.5 w-4 h-4 text-zinc-400 z-10" />
                <Input
                  label={isLogin ? "Email Address / Username" : "Email Address"}
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="pl-11"
                />
                {errors.email && errors.email.message && <ErrorText>{errors.email.message}</ErrorText>}
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-10.5 w-4 h-4 text-zinc-400 z-10" />
                <Input
                  label="Password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="pl-11"
                />
                {errors.password && errors.password.message && <ErrorText>{errors.password.message}</ErrorText>}
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-tight"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-zinc-900/10 dark:shadow-white/5 group"
                isLoading={isPending}
              >
                {isLogin ? "Sign In" : "Get Started"}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-950 px-4 text-zinc-500 font-bold tracking-widest leading-none">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-cyan-600 hover:text-cyan-700 underline underline-offset-4 decoration-2"
                >
                  {isLogin ? "Sign up now" : "Sign in instead"}
                </button>
              </p>
            </div>
          </div>
        </div>

        
      </motion.div>
    </div>
  );
}
