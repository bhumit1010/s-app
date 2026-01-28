"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Briefcase,
    MapPin,
    Globe,
    Plus,
    X,
    ArrowRight,
    ArrowLeft,
    Upload,
    CheckCircle,
} from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { updateUser } from "@/app/store/Userdata_slice";

const ProfileSetup = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [profile, setProfile] = useState({
        userType: "" as "client" | "freelancer" | "",
        fullName: "",
        title: "",
        bio: "",
        location: "",
        website: "",
        skills: [] as string[],
        hourlyRate: "",
        companyName: "",
        industry: "",
    });

    const [skillInput, setSkillInput] = useState("");

    const handleAddSkill = () => {
        if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
            setProfile({
                ...profile,
                skills: [...profile.skills, skillInput.trim()],
            });
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter((s) => s !== skill),
        });
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);

        // Save profile data to Redux (and localStorage)
        dispatch(updateUser({
            name: profile.fullName,
            bio: profile.bio,
            skills: profile.skills,
            userType: profile.userType as "freelancer" | "client",
        }));

        // Navigate to dashboard
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 500);
    };

    const popularSkills = [
        "React", "Node.js", "Python", "UI/UX Design", "Figma",
        "JavaScript", "TypeScript", "Next.js", "AWS", "DevOps",
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Progress */}
                <div className="mb-8">
                    <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-gray-900">Profile Setup</span>
                        <span className="text-gray-500">Step {step} of 3</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-blue-500 transition-all"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                    {/* Step 1: Choose User Type */}
                    {step === 1 && (
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                How do you want to use SkillDAO?
                            </h2>
                            <p className="mb-8 text-gray-500">
                                Choose your primary role. You can change this later.
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={() => setProfile({ ...profile, userType: "freelancer" })}
                                    className={`flex flex-col items-center rounded-xl border-2 p-6 text-center transition ${profile.userType === "freelancer"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${profile.userType === "freelancer" ? "bg-blue-100" : "bg-gray-100"
                                        }`}>
                                        <User className={`h-8 w-8 ${profile.userType === "freelancer" ? "text-blue-600" : "text-gray-500"
                                            }`} />
                                    </div>
                                    <h3 className="mb-1 font-semibold text-gray-900">I'm a Freelancer</h3>
                                    <p className="text-sm text-gray-500">
                                        I want to find work and get hired for projects
                                    </p>
                                </button>

                                <button
                                    onClick={() => setProfile({ ...profile, userType: "client" })}
                                    className={`flex flex-col items-center rounded-xl border-2 p-6 text-center transition ${profile.userType === "client"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${profile.userType === "client" ? "bg-blue-100" : "bg-gray-100"
                                        }`}>
                                        <Briefcase className={`h-8 w-8 ${profile.userType === "client" ? "text-blue-600" : "text-gray-500"
                                            }`} />
                                    </div>
                                    <h3 className="mb-1 font-semibold text-gray-900">I'm a Client</h3>
                                    <p className="text-sm text-gray-500">
                                        I want to hire talent for my projects
                                    </p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Basic Info */}
                    {step === 2 && (
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                Tell us about yourself
                            </h2>
                            <p className="mb-8 text-gray-500">
                                This information will be displayed on your profile
                            </p>

                            <div className="space-y-4">
                                {/* Avatar Upload */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                                        <span className="text-2xl font-bold text-white">
                                            {profile.fullName ? profile.fullName[0].toUpperCase() : "?"}
                                        </span>
                                    </div>
                                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                        <Upload className="h-4 w-4" />
                                        Upload Photo
                                    </button>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {profile.userType === "freelancer" ? (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Professional Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.title}
                                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                            placeholder="e.g., Senior React Developer"
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.companyName}
                                            onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                            placeholder="e.g., TechStart Inc."
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Bio
                                    </label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        placeholder="Tell us a bit about yourself..."
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={profile.location}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                placeholder="City, Country"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Website
                                        </label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="url"
                                                value={profile.website}
                                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                                placeholder="https://yoursite.com"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Skills/Industry */}
                    {step === 3 && (
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                {profile.userType === "freelancer" ? "Add your skills" : "Industry & Preferences"}
                            </h2>
                            <p className="mb-8 text-gray-500">
                                {profile.userType === "freelancer"
                                    ? "Add skills to help clients find you"
                                    : "Help us match you with the right freelancers"}
                            </p>

                            {profile.userType === "freelancer" ? (
                                <div className="space-y-6">
                                    {/* Skill Input */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Add Skills
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                                                placeholder="Type a skill and press Enter"
                                                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddSkill}
                                                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-600"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    {/* Selected Skills */}
                                    {profile.skills.length > 0 && (
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Your Skills
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700"
                                                    >
                                                        {skill}
                                                        <button
                                                            onClick={() => handleRemoveSkill(skill)}
                                                            className="ml-1 rounded-full p-0.5 hover:bg-blue-200"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Popular Skills */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Popular Skills
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {popularSkills.map((skill) => (
                                                <button
                                                    key={skill}
                                                    onClick={() => {
                                                        if (!profile.skills.includes(skill)) {
                                                            setProfile({ ...profile, skills: [...profile.skills, skill] });
                                                        }
                                                    }}
                                                    disabled={profile.skills.includes(skill)}
                                                    className={`rounded-full border px-3 py-1.5 text-sm transition ${profile.skills.includes(skill)
                                                        ? "border-green-300 bg-green-50 text-green-700"
                                                        : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                                                        }`}
                                                >
                                                    {profile.skills.includes(skill) && <CheckCircle className="mr-1 inline h-3 w-3" />}
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hourly Rate */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Hourly Rate (USD)
                                        </label>
                                        <div className="relative max-w-xs">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                            <input
                                                type="number"
                                                value={profile.hourlyRate}
                                                onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                                                placeholder="50"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-3 pl-8 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">/hr</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Industry
                                        </label>
                                        <select
                                            value={profile.industry}
                                            onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select your industry</option>
                                            <option value="technology">Technology</option>
                                            <option value="finance">Finance & Banking</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="ecommerce">E-commerce & Retail</option>
                                            <option value="education">Education</option>
                                            <option value="marketing">Marketing & Advertising</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Skills you're looking for
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {popularSkills.map((skill) => (
                                                <button
                                                    key={skill}
                                                    onClick={() => {
                                                        if (profile.skills.includes(skill)) {
                                                            setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
                                                        } else {
                                                            setProfile({ ...profile, skills: [...profile.skills, skill] });
                                                        }
                                                    }}
                                                    className={`rounded-full border px-3 py-1.5 text-sm transition ${profile.skills.includes(skill)
                                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                                        : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                                                        }`}
                                                >
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                disabled={step === 1 && !profile.userType}
                                className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Continue
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                ) : (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        Complete Setup
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
