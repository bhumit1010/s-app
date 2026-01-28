"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Shield, CheckCircle } from "lucide-react";

const Login = () => {
    const router = useRouter();
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep("otp");
        }, 1500);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            setError("Please enter the complete OTP");
            return;
        }
        setError("");
        setIsLoading(true);

        // Simulate verification
        setTimeout(() => {
            setIsLoading(false);
            // Check if new user (would normally come from backend)
            const isNewUser = true;
            if (isNewUser) {
                router.push("/profile-setup");
            } else {
                router.push("/dashboard");
            }
        }, 1500);
    };

    const handleResendOtp = () => {
        setOtp(["", "", "", "", "", ""]);
        // Simulate resend
        alert("OTP resent to " + email);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">SkillDAO</h1>
                    <p className="mt-2 text-gray-500">Welcome to the future of work</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                    {step === "email" ? (
                        <>
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <Mail className="h-8 w-8 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Sign In</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Enter your email to receive a one-time password
                                </p>
                            </div>

                            <form onSubmit={handleSendOtp}>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="mb-4 text-sm text-red-500">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Shield className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Verify OTP</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    We've sent a 6-digit code to
                                </p>
                                <p className="font-medium text-gray-900">{email}</p>
                            </div>

                            <form onSubmit={handleVerifyOtp}>
                                <div className="mb-6 flex justify-center gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="h-12 w-12 rounded-lg border border-gray-200 text-center text-xl font-bold text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <p className="mb-4 text-center text-sm text-red-500">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <>
                                            <CheckCircle className="h-4 w-4" />
                                            Verify & Login
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Change email
                                    </button>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
