"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    MapPin,
    Globe,
    Plus,
    X,
    Save,
    ArrowLeft,
    Upload,
    Trash2,
    Camera,
} from "lucide-react";
import Nav from "@/app/components/Nav";

const EditProfile = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Mock current user data
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        email: "john@example.com",
        title: "Senior React Developer",
        bio: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        skills: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL"],
        hourlyRate: "85",
        availability: "available",
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

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />

            <div className="mx-auto max-w-3xl px-4 py-8 pt-24 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                            <p className="text-sm text-gray-500">Update your personal information</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Changes
                    </button>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700">
                        {successMessage}
                    </div>
                )}

                {/* Profile Card */}
                <div className="space-y-6">
                    {/* Avatar Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 font-semibold text-gray-900">Profile Photo</h2>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                                    <span className="text-3xl font-bold text-white">
                                        {profile.fullName[0]}
                                    </span>
                                </div>
                                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:bg-blue-600">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                    <Upload className="h-4 w-4" />
                                    Upload New
                                </button>
                                <button className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 font-semibold text-gray-900">Basic Information</h2>
                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Professional Title
                                </label>
                                <input
                                    type="text"
                                    value={profile.title}
                                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                    placeholder="e.g., Senior React Developer"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    rows={4}
                                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                />
                                <p className="mt-1 text-sm text-gray-400">
                                    {profile.bio.length}/500 characters
                                </p>
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
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none"
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
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 font-semibold text-gray-900">Skills</h2>

                        {/* Add Skill */}
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                                placeholder="Add a skill"
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={handleAddSkill}
                                className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-600"
                            >
                                <Plus className="h-4 w-4" />
                                Add
                            </button>
                        </div>

                        {/* Skills List */}
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

                    {/* Rates & Availability */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h2 className="mb-4 font-semibold text-gray-900">Rates & Availability</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Hourly Rate (USD)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                    <input
                                        type="number"
                                        value={profile.hourlyRate}
                                        onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-8 text-gray-900 focus:border-blue-500 focus:outline-none"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">/hr</span>
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Availability
                                </label>
                                <select
                                    value={profile.availability}
                                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="available">Available for work</option>
                                    <option value="limited">Limited availability</option>
                                    <option value="unavailable">Not available</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                        <h2 className="mb-2 font-semibold text-red-700">Danger Zone</h2>
                        <p className="mb-4 text-sm text-red-600">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
