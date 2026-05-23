"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store"; // Adjust the path to your store file

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const pathname = usePathname();

  const locale = pathname.split("/")[1];
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(
        setUser({
          email: data.user.email,
          isAdmin: data.user.isAdmin,
        })
      );
      router.push(`/${locale}/admin/list`);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
