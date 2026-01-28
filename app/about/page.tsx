"use client";

import React from "react";
import {
    Users,
    Target,
    Shield,
    Zap,
    Globe,
    Award,
    Heart,
    ArrowRight,
} from "lucide-react";
import Nav from "@/app/components/Nav";
import Foot from "@/app/components/Foot";
import Link from "next/link";

const teamMembers = [
    {
        name: "Alex Chen",
        role: "CEO & Founder",
        bio: "Former tech lead at Google with 10+ years in distributed systems.",
        avatar: "AC",
    },
    {
        name: "Sarah Kim",
        role: "CTO",
        bio: "Blockchain expert and ex-Ethereum Foundation contributor.",
        avatar: "SK",
    },
    {
        name: "Mike Johnson",
        role: "Head of Product",
        bio: "Product veteran with experience at Airbnb and Uber.",
        avatar: "MJ",
    },
    {
        name: "Emily Watson",
        role: "Head of Community",
        bio: "Community builder who grew Discord communities to 1M+ users.",
        avatar: "EW",
    },
];

const stats = [
    { label: "Freelancers", value: "50K+" },
    { label: "Projects Completed", value: "100K+" },
    { label: "Total Paid Out", value: "$25M+" },
    { label: "Countries", value: "120+" },
];

const values = [
    {
        icon: Shield,
        title: "Trust & Transparency",
        description: "Smart contracts ensure every transaction is secure and verifiable.",
    },
    {
        icon: Zap,
        title: "Speed & Efficiency",
        description: "Get paid instantly with crypto, no waiting for bank transfers.",
    },
    {
        icon: Globe,
        title: "Global Access",
        description: "Work with anyone, anywhere, without borders or limitations.",
    },
    {
        icon: Heart,
        title: "Community First",
        description: "Governed by the community through decentralized voting.",
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            <Nav />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 px-4 py-24 pt-32 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-5xl text-center">
                    <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
                        Building the Future of Work
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
                        SkillDAO is a decentralized freelance marketplace where talent meets opportunity,
                        powered by blockchain technology and governed by our community.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b border-gray-100 bg-white px-4 py-12">
                <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="px-4 py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
                            <p className="mb-6 text-lg text-gray-600">
                                We're on a mission to democratize access to work opportunities worldwide.
                                Traditional freelance platforms take hefty fees and create barriers.
                                We believe in a world where anyone can showcase their skills and get fairly
                                compensated for their work.
                            </p>
                            <p className="text-lg text-gray-600">
                                By leveraging blockchain technology, we've created a trustless system where
                                payments are instant, disputes are resolved fairly through smart contracts,
                                and the community has a voice in platform decisions.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-8">
                                <div className="flex h-full flex-col items-center justify-center">
                                    <Award className="mb-4 h-24 w-24 text-blue-600" />
                                    <p className="text-center text-xl font-semibold text-gray-900">
                                        Empowering 50,000+ freelancers globally
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 px-4 py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Values</h2>
                        <p className="text-lg text-gray-600">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                    <value.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="px-4 py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Meet Our Team</h2>
                        <p className="text-lg text-gray-600">
                            The people behind SkillDAO
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:shadow-lg"
                            >
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                                    <span className="text-2xl font-bold text-white">
                                        {member.avatar}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <p className="mb-3 text-sm text-blue-600">{member.role}</p>
                                <p className="text-sm text-gray-500">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 text-white">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        Ready to Join the Revolution?
                    </h2>
                    <p className="mb-8 text-lg text-blue-100">
                        Whether you're a freelancer looking for opportunities or a client seeking talent,
                        SkillDAO is the platform for you.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/explore"
                            className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                            Explore Talent
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition hover:bg-white/10"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            <Foot />
        </div>
    );
};

export default AboutUs;
