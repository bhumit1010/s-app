/**
 * Centralized constants file for UI data that doesn't need to be in Redux
 * These are static display values, not application state
 */

import { Shield, Zap, Globe, Heart, LucideIcon } from "lucide-react";

// Skills suggestions for post-gig and profile-setup pages
export const skillSuggestions = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "Figma", "UI Design", "UX Research", "PostgreSQL", "MongoDB",
    "AWS", "Docker", "GraphQL", "Tailwind CSS", "Vue.js",
    "Solidity", "Web3", "Smart Contracts", "Blockchain",
];

export const popularSkills = [
    "React", "Node.js", "Python", "UI/UX Design", "Figma",
    "JavaScript", "TypeScript", "Next.js", "AWS", "DevOps",
];

// About page static content
export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    avatar: string;
}

export const teamMembers: TeamMember[] = [
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

export interface Stat {
    label: string;
    value: string;
}

export const stats: Stat[] = [
    { label: "Freelancers", value: "50K+" },
    { label: "Projects Completed", value: "100K+" },
    { label: "Total Paid Out", value: "$25M+" },
    { label: "Countries", value: "120+" },
];

export interface Value {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const values: Value[] = [
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

// Governance categories
export const governanceCategories = [
    "All", "Platform", "Treasury", "Technical", "Community"
];
