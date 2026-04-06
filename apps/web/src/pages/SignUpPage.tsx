import * as React from "react";
import { Button, Input } from "@pnpm-mono/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { useSignUp } from "../hooks/useSignUp";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpSchemaType } from "../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    trigger,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    shouldUnregister: false,
  });

  const { mutate, isPending } = useSignUp({
    onFieldErrors: (field, message) => {
      setError(field as keyof SignUpSchemaType, { message });
    },
    onGlobalError: (err) => {
      toast.error(err);
    },
    onSuccess: () => {
      toast.success("User Registered Successfully!");
      navigate("/login");
    },
  });

  const onSubmit = (data: SignUpSchemaType) => {
    mutate(data);
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isStep1Valid = await trigger(["username", "name"]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const passwordValue = watch("password", "");

  const passwordStrength = React.useMemo(() => {
    const pwd = passwordValue;
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[#?!@$%^&*-]/.test(pwd)) score++;
    return score;
  }, [passwordValue]);

  const strengthLabel = ["Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["bg-red-400", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"][passwordStrength];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 sm:p-10 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-zinc-800 relative z-10"
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="p-3 bg-fuchsia-600 rounded-2xl shadow-lg shadow-fuchsia-600/30 mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex space-x-1.5">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  animate={{
                    width: step === s ? 24 : 8,
                    backgroundColor: step >= s ? "rgb(192 38 211)" : "rgb(228 228 231)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-center">
            {step === 1 ? "Create account" : "Secure account"}
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-medium text-center">
            {step === 1
              ? "Start your journey to financial freedom"
              : "Almost there! Set up your email and password"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Username"
                    placeholder="johndoe123"
                    className="pl-11"
                    {...register("username")}
                  />
                  {errors.username?.message && <ErrorText>{errors.username.message}</ErrorText>}
                </div>

                <div className="relative">
                  <User className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    className="pl-11"
                    {...register("name")}
                  />
                  {errors.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="gradient"
                    onClick={handleNext}
                    className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-fuchsia-600/20 group hover:opacity-90"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-11"
                    {...register("email")}
                  />
                  {errors.email?.message && <ErrorText>{errors.email.message}</ErrorText>}
                </div>

                <div className="relative space-y-2">
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
                  </div>
                  {errors.password?.message && <ErrorText>{errors.password.message}</ErrorText>}

                  {passwordValue && (
                    <div className="space-y-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= passwordStrength ? strengthColor : "bg-zinc-200 dark:bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] font-medium text-zinc-500 text-right">
                        Strength:{" "}
                        <span className={passwordStrength >= 3 ? "text-emerald-500" : "text-amber-500"}>
                          {strengthLabel}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-14 rounded-2xl font-semibold bg-white/50 dark:bg-zinc-900/50"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="flex-1 h-14 rounded-2xl text-base font-bold shadow-xl shadow-fuchsia-600/20 group hover:opacity-90"
                    disabled={isPending}
                    isLoading={isPending}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 dark:bg-zinc-900 px-4 text-zinc-400 font-bold tracking-widest">
              Have an account?
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-2xl font-semibold bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800"
          onClick={() => navigate("/login")}
        >
          Sign in instead
        </Button>
      </motion.div>
    </div>
  );
}
