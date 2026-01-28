"use client";

import React, { useState } from "react";
import {
    ThumbsUp,
    ThumbsDown,
    Plus,
    X,
    Clock,
    User,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Filter,
    ChevronDown,
    Search,
} from "lucide-react";
import Avatar from "@/app/components/avtar";
import Nav from "@/app/components/Nav";
import Foot from "@/app/components/Foot";

// Mock data for proposals/suggestions
const initialProposals = [
    {
        id: 1,
        title: "Implement Escrow System for All Transactions",
        description: "To ensure trust between clients and freelancers, I propose implementing a mandatory escrow system where funds are held until work is approved. This would protect both parties and reduce disputes.",
        author: "Alex Chen",
        authorAvatar: "",
        category: "Platform Security",
        status: "active",
        createdAt: "2 days ago",
        votesFor: 156,
        votesAgainst: 23,
        userVote: null,
    },
    {
        id: 2,
        title: "Add Skill Verification Badges",
        description: "Introduce verified skill badges that freelancers can earn by passing skill assessments. This would help clients identify truly qualified professionals and improve the overall quality of work on the platform.",
        author: "Sarah Kim",
        authorAvatar: "",
        category: "Quality Assurance",
        status: "active",
        createdAt: "5 days ago",
        votesFor: 243,
        votesAgainst: 12,
        userVote: null,
    },
    {
        id: 3,
        title: "Lower Platform Fees for Long-term Contracts",
        description: "Propose reducing platform fees from 10% to 5% for contracts exceeding 3 months. This would incentivize longer-term collaborations and benefit both clients and freelancers.",
        author: "Mike Johnson",
        authorAvatar: "",
        category: "Fees & Pricing",
        status: "active",
        createdAt: "1 week ago",
        votesFor: 312,
        votesAgainst: 89,
        userVote: null,
    },
    {
        id: 4,
        title: "Create Mentorship Program",
        description: "Establish a mentorship program where experienced freelancers can guide newcomers. This would help new members get started and improve the overall community quality.",
        author: "Emily Watson",
        authorAvatar: "",
        category: "Community",
        status: "passed",
        createdAt: "2 weeks ago",
        votesFor: 189,
        votesAgainst: 34,
        userVote: "for",
    },
    {
        id: 5,
        title: "Add Dark Mode Support",
        description: "Implement a dark mode option for the platform to reduce eye strain and provide a better user experience for those who prefer darker interfaces.",
        author: "James Wilson",
        authorAvatar: "",
        category: "UI/UX",
        status: "rejected",
        createdAt: "3 weeks ago",
        votesFor: 45,
        votesAgainst: 167,
        userVote: "against",
    },
];

const categories = [
    "All Categories",
    "Platform Security",
    "Quality Assurance",
    "Fees & Pricing",
    "Community",
    "UI/UX",
    "New Features",
    "Bug Fixes",
];

type Proposal = typeof initialProposals[0];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "active":
            return (
                <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    <Clock className="h-3 w-3" />
                    Active
                </span>
            );
        case "passed":
            return (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <CheckCircle className="h-3 w-3" />
                    Passed
                </span>
            );
        case "rejected":
            return (
                <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    <AlertCircle className="h-3 w-3" />
                    Rejected
                </span>
            );
        default:
            return null;
    }
};

const Governance = () => {
    const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
    const [showNewProposal, setShowNewProposal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState<"newest" | "popular">("popular");
    const [searchQuery, setSearchQuery] = useState("");
    const [newProposal, setNewProposal] = useState({
        title: "",
        description: "",
        category: "New Features",
    });

    const handleVote = (proposalId: number, voteType: "for" | "against") => {
        setProposals((prev) =>
            prev.map((p) => {
                if (p.id === proposalId) {
                    // If user already voted the same way, remove vote
                    if (p.userVote === voteType) {
                        return {
                            ...p,
                            userVote: null,
                            votesFor: voteType === "for" ? p.votesFor - 1 : p.votesFor,
                            votesAgainst: voteType === "against" ? p.votesAgainst - 1 : p.votesAgainst,
                        };
                    }
                    // If changing vote
                    if (p.userVote && p.userVote !== voteType) {
                        return {
                            ...p,
                            userVote: voteType,
                            votesFor: voteType === "for" ? p.votesFor + 1 : p.votesFor - 1,
                            votesAgainst: voteType === "against" ? p.votesAgainst + 1 : p.votesAgainst - 1,
                        };
                    }
                    // New vote
                    return {
                        ...p,
                        userVote: voteType,
                        votesFor: voteType === "for" ? p.votesFor + 1 : p.votesFor,
                        votesAgainst: voteType === "against" ? p.votesAgainst + 1 : p.votesAgainst,
                    };
                }
                return p;
            })
        );
    };

    const handleSubmitProposal = () => {
        if (!newProposal.title || !newProposal.description) return;

        const proposal: Proposal = {
            id: proposals.length + 1,
            title: newProposal.title,
            description: newProposal.description,
            author: "You",
            authorAvatar: "",
            category: newProposal.category,
            status: "active",
            createdAt: "Just now",
            votesFor: 0,
            votesAgainst: 0,
            userVote: null,
        };

        setProposals([proposal, ...proposals]);
        setNewProposal({ title: "", description: "", category: "New Features" });
        setShowNewProposal(false);
    };

    // Filter and sort proposals
    const filteredProposals = proposals
        .filter((p) => {
            const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
            const matchesSearch = searchQuery === "" ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "popular") {
                return (b.votesFor - b.votesAgainst) - (a.votesFor - a.votesAgainst);
            }
            return 0; // For newest, assuming initial order is by date
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />

            <div className="mx-auto max-w-5xl px-4 py-8 pt-24 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Governance
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Vote on proposals and shape the future of SkillDAO
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNewProposal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        New Proposal
                    </button>
                </div>

                {/* Stats */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <TrendingUp className="h-4 w-4" />
                            Active Proposals
                        </div>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {proposals.filter((p) => p.status === "active").length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <CheckCircle className="h-4 w-4" />
                            Passed Proposals
                        </div>
                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {proposals.filter((p) => p.status === "passed").length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <User className="h-4 w-4" />
                            Total Votes Cast
                        </div>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst, 0)}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search proposals by title, description, or author..."
                            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                        <button
                            onClick={() => setSortBy("popular")}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition ${sortBy === "popular"
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Most Popular
                        </button>
                        <button
                            onClick={() => setSortBy("newest")}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition ${sortBy === "newest"
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Newest
                        </button>
                    </div>
                </div>

                {/* Proposals List */}
                <div className="space-y-4">
                    {filteredProposals.map((proposal) => {
                        const totalVotes = proposal.votesFor + proposal.votesAgainst;
                        const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 50;

                        return (
                            <div
                                key={proposal.id}
                                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
                            >
                                {/* Header */}
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            {getStatusBadge(proposal.status)}
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                {proposal.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {proposal.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="mb-4 text-gray-600">{proposal.description}</p>

                                {/* Author & Time */}
                                <div className="mb-4 flex items-center gap-3">
                                    <Avatar name={proposal.author} size="h-8 w-8" textSize="text-xs" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">
                                            {proposal.author}
                                        </span>
                                        <span className="mx-2 text-gray-300">•</span>
                                        <span className="text-sm text-gray-500">{proposal.createdAt}</span>
                                    </div>
                                </div>

                                {/* Vote Progress Bar */}
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-medium text-green-600">
                                            {proposal.votesFor} For ({forPercentage.toFixed(0)}%)
                                        </span>
                                        <span className="font-medium text-red-600">
                                            {proposal.votesAgainst} Against ({(100 - forPercentage).toFixed(0)}%)
                                        </span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                                            style={{ width: `${forPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Vote Buttons */}
                                {proposal.status === "active" && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleVote(proposal.id, "for")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition ${proposal.userVote === "for"
                                                ? "border-green-500 bg-green-50 text-green-700"
                                                : "border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50"
                                                }`}
                                        >
                                            <ThumbsUp className={`h-4 w-4 ${proposal.userVote === "for" ? "fill-current" : ""}`} />
                                            Vote For
                                        </button>
                                        <button
                                            onClick={() => handleVote(proposal.id, "against")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition ${proposal.userVote === "against"
                                                ? "border-red-500 bg-red-50 text-red-700"
                                                : "border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"
                                                }`}
                                        >
                                            <ThumbsDown className={`h-4 w-4 ${proposal.userVote === "against" ? "fill-current" : ""}`} />
                                            Vote Against
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* New Proposal Modal */}
            {showNewProposal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Create Proposal</h2>
                            <button
                                onClick={() => setShowNewProposal(false)}
                                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={newProposal.title}
                                    onChange={(e) =>
                                        setNewProposal({ ...newProposal, title: e.target.value })
                                    }
                                    placeholder="Enter proposal title"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    value={newProposal.category}
                                    onChange={(e) =>
                                        setNewProposal({ ...newProposal, category: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    {categories.slice(1).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={newProposal.description}
                                    onChange={(e) =>
                                        setNewProposal({ ...newProposal, description: e.target.value })
                                    }
                                    placeholder="Describe your proposal in detail..."
                                    rows={5}
                                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setShowNewProposal(false)}
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitProposal}
                                disabled={!newProposal.title || !newProposal.description}
                                className="flex-1 rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Submit Proposal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Foot />
        </div>
    );
};

export default Governance;
