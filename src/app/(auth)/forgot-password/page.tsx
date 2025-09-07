"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with backend password reset logic
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <Shield className="h-8 w-8 text-cyber-blue" />
            <span className="text-xl font-bold text-white">
              NCC <span className="text-cyber-blue">Cyber Workshop</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Forgot Password</h2>
          <p className="text-gray-400">Enter your email to reset your password</p>
        </div>
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-8">
          {submitted ? (
            <div className="text-center text-cyber-blue">
              <p className="mb-4">If an account exists for <span className="font-mono">{email}</span>, a reset link has been sent.</p>
              <Link href="/login" className="text-cyber-blue hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
        <div className="text-center">
          <Link href="/login" className="text-gray-400 hover:text-cyber-blue text-sm">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
