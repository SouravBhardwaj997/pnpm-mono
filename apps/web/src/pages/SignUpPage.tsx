import * as React from "react";
import { Button, Input } from "@pnpm-mono/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const passwordStrength = React.useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[#?!@$%^&*-]/.test(pwd)) score++;
    return score;
  }, [formData.password]);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-500"][passwordStrength];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
    return true;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-])/.test(formData.password))
      newErrors.password = "Must include uppercase, lowercase & special character";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false; }
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    // TODO: integrate signUp mutation
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative blobs for theme */}
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
        <div className="mb-8 flex flex-col items-center">
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

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleNext}
              className="space-y-5"
            >
              <div className="relative">
                <User className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                <Input
                  label="Username"
                  name="username"
                  placeholder="johndoe123"
                  className="pl-11"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <ErrorText>{errors.username}</ErrorText>}
              </div>

              <div className="relative">
                <User className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  className="pl-11"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-fuchsia-600/20 group hover:opacity-90"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="relative">
                <Mail className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </div>

              <div className="relative space-y-2">
                <div className="relative">
                  <Lock className="absolute left-4 top-[42px] w-4 h-4 text-zinc-400 z-10" />
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-11 pr-12"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[42px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <ErrorText>{errors.password}</ErrorText>}

                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= passwordStrength ? strengthColor : "bg-zinc-200 dark:bg-zinc-800"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-zinc-500">
                      Password strength:{" "}
                      <span className={passwordStrength >= 3 ? "text-emerald-500" : "text-amber-500"}>
                        {strengthLabel}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
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
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="relative my-6">
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
