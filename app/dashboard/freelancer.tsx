"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Wallet,
  MapPin,
  Send,
  Eye,
  MessageSquare,
  ExternalLink,
  Upload,
  X,
} from "lucide-react";
import Avatar from "@/app/components/avtar";

// Mock data for applied posts
const appliedPosts = [
  {
    id: 1,
    title: "Build a Modern E-commerce Website",
    client: "TechStart Inc.",
    clientAvatar: "",
    appliedAt: "Oct 20, 2023",
    status: "pending",
    budget: 4500,
    description: "Looking for an experienced developer to build a modern e-commerce website with React and Next.js.",
    skills: ["React", "Next.js", "Stripe", "PostgreSQL"],
  },
  {
    id: 2,
    title: "UI/UX Design for Mobile Banking App",
    client: "FinanceHub",
    clientAvatar: "",
    appliedAt: "Oct 18, 2023",
    status: "shortlisted",
    budget: 5000,
    description: "We need a talented UI/UX designer to create a complete design system for our mobile banking application.",
    skills: ["Figma", "UI Design", "Mobile Design"],
  },
  {
    id: 3,
    title: "WordPress Website Customization",
    client: "Local Business Co.",
    clientAvatar: "",
    appliedAt: "Oct 15, 2023",
    status: "rejected",
    budget: 800,
    description: "Need customization for our existing WordPress website including theme changes and plugin setup.",
    skills: ["WordPress", "PHP", "CSS"],
  },
  {
    id: 4,
    title: "API Integration for SaaS Platform",
    client: "CloudSync",
    clientAvatar: "",
    appliedAt: "Oct 22, 2023",
    status: "pending",
    budget: 3200,
    description: "Integrate third-party APIs including payment gateways and authentication services.",
    skills: ["Node.js", "REST API", "OAuth"],
  },
];

// Mock data for current jobs
const currentJobs = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechStart Inc.",
    clientAvatar: "",
    startedAt: "Oct 10, 2023",
    deadline: "Nov 28, 2023",
    budget: 4500,
    progress: 65,
    description: "Building a complete e-commerce solution with shopping cart, checkout, and admin dashboard.",
    skills: ["React", "Next.js", "Stripe"],
    milestones: [
      { title: "Project Setup & Architecture", status: "completed" },
      { title: "Product Catalog & Cart", status: "completed" },
      { title: "Checkout & Payment Integration", status: "in-progress" },
      { title: "Admin Dashboard", status: "pending" },
    ],
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    client: "FinanceHub",
    clientAvatar: "",
    startedAt: "Oct 15, 2023",
    deadline: "Dec 10, 2023",
    budget: 5000,
    progress: 30,
    description: "Complete UI/UX design for a mobile banking application with modern aesthetics.",
    skills: ["Figma", "UI Design", "Prototyping"],
    milestones: [
      { title: "User Research & Wireframes", status: "completed" },
      { title: "Visual Design System", status: "in-progress" },
      { title: "High-Fidelity Mockups", status: "pending" },
      { title: "Interactive Prototype", status: "pending" },
    ],
  },
];

// Mock data for completed jobs
const completedJobs = [
  {
    id: 1,
    title: "Landing Page Design",
    client: "StartupXYZ",
    clientAvatar: "",
    completedAt: "Oct 10, 2023",
    earned: 1200,
    rating: 5,
    review: "Excellent work! Delivered on time with great attention to detail.",
  },
  {
    id: 2,
    title: "React Dashboard Development",
    client: "DataCorp",
    clientAvatar: "",
    completedAt: "Sep 28, 2023",
    earned: 3500,
    rating: 4.8,
    review: "Outstanding developer. Very professional and skilled.",
  },
  {
    id: 3,
    title: "Logo Design",
    client: "BrandNew Co.",
    clientAvatar: "",
    completedAt: "Sep 15, 2023",
    earned: 800,
    rating: 5,
    review: "Creative and delivered exactly what we envisioned.",
  },
  {
    id: 4,
    title: "API Integration",
    client: "TechFlow",
    clientAvatar: "",
    completedAt: "Aug 30, 2023",
    earned: 2200,
    rating: 4.9,
    review: "Great communication and technical expertise.",
  },
];

// Stats data
const freelancerStats = {
  totalEarnings: 45600,
  earningsChange: "+18%",
  activeProjects: 2,
  completedProjects: 24,
  avgRating: 4.9,
};

type TabType = "applied" | "current" | "completed";

const getApplicationStatus = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          Pending
        </span>
      );
    case "shortlisted":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Shortlisted
        </span>
      );
    case "rejected":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
          Not Selected
        </span>
      );
    default:
      return null;
  }
};

// Job Detail Modal - Simple version
const JobDetailModal = ({
  job,
  type,
  onClose,
}: {
  job: any;
  type: "current" | "completed";
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
            <div className="mt-1 flex items-center gap-2">
              <Avatar name={job.client} size="h-5 w-5" textSize="text-xs" />
              <span className="text-sm text-gray-500">{job.client}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {type === "current" && (
            <div className="space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="font-bold text-gray-900">${job.budget.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="font-bold text-gray-900">{job.deadline}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>

              {/* Action */}
              <button className="w-full rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white hover:bg-blue-600">
                Submit Work
              </button>
            </div>
          )}

          {type === "completed" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-xs text-gray-500">Earned</p>
                  <p className="text-lg font-bold text-green-600">+${job.earned.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-bold">{job.rating}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-sm italic text-gray-600">"{job.review}"</p>
                <p className="mt-2 text-xs text-gray-400">Completed {job.completedAt}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Freelancer = () => {
  const [activeTab, setActiveTab] = useState<TabType>("applied");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedJobType, setSelectedJobType] = useState<"current" | "completed">("current");

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: "applied", label: "Applied Posts", count: appliedPosts.length },
    { id: "current", label: "Current Jobs", count: currentJobs.length },
    { id: "completed", label: "Completed Jobs", count: completedJobs.length },
  ];

  const handleJobClick = (job: any, type: "current" | "completed") => {
    setSelectedJob(job);
    setSelectedJobType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Freelancer Dashboard
            </h1>
            <p className="mt-1 text-gray-500">
              Welcome back, John. Here's your work overview.
            </p>
          </div>
          <Link
            href="/explore"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600 sm:w-auto"
          >
            <Briefcase className="h-4 w-4" />
            Find Work
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Earnings */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {freelancerStats.earningsChange}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">Total Earnings</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              ${freelancerStats.totalEarnings.toLocaleString()}
            </p>
          </div>

          {/* Active Projects */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">Active Projects</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {freelancerStats.activeProjects}
            </p>
          </div>

          {/* Completed Projects */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">Completed Projects</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {freelancerStats.completedProjects}
            </p>
          </div>

          {/* Average Rating */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Average Rating</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">{freelancerStats.avgRating}</span>
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6">
            <div className="flex gap-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative whitespace-nowrap py-4 text-sm font-medium transition ${activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.label}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                    }`}>
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Applied Posts */}
            {activeTab === "applied" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {appliedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      {getApplicationStatus(post.status)}
                      <span className="text-xs text-gray-400">{post.appliedAt}</span>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                      {post.title}
                    </h3>
                    <div className="mb-3 flex items-center gap-2">
                      <Avatar name={post.client} size="h-6 w-6" textSize="text-xs" />
                      <span className="text-sm text-gray-500">{post.client}</span>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                      {post.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${post.budget.toLocaleString()}
                      </span>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Current Jobs */}
            {activeTab === "current" && (
              <div className="grid gap-4 lg:grid-cols-2">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobClick(job, "current")}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <Avatar name={job.client} size="h-5 w-5" textSize="text-xs" />
                          <span className="text-sm text-gray-500">{job.client}</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">${job.budget.toLocaleString()}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Due {job.deadline}</span>
                      </div>
                      <span className="text-blue-600">View →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Jobs */}
            {activeTab === "completed" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completedJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobClick(job, "completed")}
                    className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(job.rating) ? "fill-current" : ""}`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium text-gray-700">{job.rating}</span>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                      {job.title}
                    </h3>
                    <div className="mb-3 flex items-center gap-2">
                      <Avatar name={job.client} size="h-6 w-6" textSize="text-xs" />
                      <span className="text-sm text-gray-500">{job.client}</span>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-500 italic">
                      "{job.review}"
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-lg font-bold text-green-600">
                        +${job.earned.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400">{job.completedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          type={selectedJobType}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default Freelancer;