"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await adminLogin(email, password);
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gagal login. Cek email dan password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md bg-surface border border-border-2 rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-bg-2 rounded-full flex items-center justify-center border border-border-2">
            <Lock className="text-gold" size={24} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-text-3 text-center mb-8 text-sm">Masuk ke dashboard untuk kelola data</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-bg-2 border border-border-2 rounded-lg px-4 py-2.5 outline-none focus:border-gold transition-colors text-text"
              placeholder="admin@webspec.id"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-bg-2 border border-border-2 rounded-lg px-4 py-2.5 outline-none focus:border-gold transition-colors text-text"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 bg-gold hover:bg-gold-light text-bg-2 font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Masuk..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
