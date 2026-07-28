"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, Eye, EyeOff, Leaf, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        router.push("/admin");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1f12 0%, #122a1a 25%, #1a4025 50%, #0f2418 75%, #0a1a10 100%)",
      }}
    >
      {/* Ambient decorative glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[30%] right-[10%] w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(84,166,51,0.12), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[-25%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(126,200,80,0.08), transparent 65%)",
          }}
        />
        <div
          className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(32,5,99,0.1), transparent 65%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-[420px] z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center relative mb-5">
            {/* Glow ring */}
            <div className="absolute -inset-3 rounded-2xl bg-emerald-500/15 blur-xl animate-pulse" />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                boxShadow: "0 8px 40px rgba(34, 197, 94, 0.3)",
              }}
            >
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            NISARG Admin
          </h1>
          <p className="text-emerald-300/50 text-sm mt-1.5 font-medium">
            Sign in to access the management console
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-7 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                className="p-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5"
                style={{
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#fca5a5",
                }}
              >
                <span className="text-red-400 text-base">⚠</span>
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-xs font-bold text-emerald-300/60 uppercase tracking-wider flex items-center gap-1.5"
              >
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="admin@nisarg.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/20 transition-all duration-200 outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(34, 197, 94, 0.5)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(34, 197, 94, 0.1)";
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "rgba(255,255,255,0.06)";
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-xs font-bold text-emerald-300/60 uppercase tracking-wider flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3" />
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm text-white placeholder-white/20 transition-all duration-200 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(34, 197, 94, 0.5)";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(34, 197, 94, 0.1)";
                    e.target.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
                boxShadow: "0 4px 24px rgba(34, 197, 94, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 32px rgba(34, 197, 94, 0.45)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px rgba(34, 197, 94, 0.3)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  animation: "shimmer 2s infinite",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-emerald-300/25 mt-8 font-medium">
          NISARG Foundation · Admin Console v1.0
        </p>
      </div>

      {/* Shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
