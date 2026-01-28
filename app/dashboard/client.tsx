"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Briefcase,
    FileText,
    DollarSign,
    Plus,
    Filter,
    Grid3X3,
    List,
    Users,
    Clock,
    Star,
    X,
    MapPin,
    CheckCircle,
    AlertCircle,
    Download,
    ExternalLink,
    Trash2,
} from "lucide-react";
import Avatar from "@/app/components/avtar";

// Initial mock data for job posts
const initialJobPosts = [
    {
        id: 1,
        title: "UX Design for Fintech App",
        description: "Complete redesign of a mobile banking dashboard focusing on user retention and improving the overall user experience. The project includes user research, wireframing, prototyping, and final UI design.",
        status: "open",
        postedAt: "Oct 12, 2023",
        budget: 2500,
        duration: "2-3 weeks",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
        experienceLevel: "Intermediate",
        applicants: [
            { id: 1, name: "Sarah Chen", avatar: "", title: "Senior UI/UX Designer", rating: 4.9, coverLetter: "I have 8+ years of experience in fintech design...", appliedAt: "Oct 13, 2023" },
            { id: 2, name: "Alex Rivera", avatar: "", title: "Product Designer", rating: 4.7, coverLetter: "I specialize in mobile banking applications...", appliedAt: "Oct 14, 2023" },
            { id: 3, name: "Emily Watson", avatar: "", title: "UI Designer", rating: 4.8, coverLetter: "My portfolio includes several fintech projects...", appliedAt: "Oct 15, 2023" },
        ],
        hiredFreelancer: null,
        submissions: [],
    },
    {
        id: 2,
        title: "React Dashboard Development",
        description: "Looking for a Senior React developer to build complex data visualization dashboards with charts, real-time updates, and exportable reports. Must have experience with D3.js or Chart.js.",
        status: "in-progress",
        postedAt: "Oct 05, 2023",
        budget: 5000,
        duration: "1-2 months",
        skills: ["React", "TypeScript", "D3.js", "Node.js"],
        experienceLevel: "Expert",
        applicants: [],
        hiredFreelancer: { id: 1, name: "Alex Rivera", avatar: "", title: "Full Stack Developer", rating: 5.0, hiredAt: "Oct 08, 2023" },
        submissions: [
            { id: 1, title: "Dashboard Wireframes & Component Structure", description: "Initial wireframes and React component architecture", submittedAt: "Oct 20, 2023", status: "approved", files: ["wireframes.pdf", "components.md"] },
            { id: 2, title: "Interactive Charts Implementation", description: "Implemented bar, line, and pie charts with D3.js", submittedAt: "Oct 28, 2023", status: "pending", files: ["charts-demo.zip"] },
        ],
    },
    {
        id: 3,
        title: "Logo Animation",
        description: "Animate our brand logo for social media intros and web loading states. Need smooth, professional animations that match our brand guidelines.",
        status: "under-review",
        postedAt: "Sep 28, 2023",
        budget: 450,
        duration: "1 week",
        skills: ["After Effects", "Motion Graphics", "Animation"],
        experienceLevel: "Intermediate",
        applicants: [],
        hiredFreelancer: { id: 2, name: "Sarah Chen", avatar: "", title: "Motion Designer", rating: 4.8, hiredAt: "Sep 30, 2023" },
        submissions: [
            { id: 1, title: "Logo Animation - Final Delivery", description: "Complete logo animation package with all variations", submittedAt: "Oct 10, 2023", status: "pending", files: ["logo-animation.mp4", "logo-animation.json", "assets.zip"] },
        ],
    },
    {
        id: 4,
        title: "Copywriting for SaaS Blog",
        description: "Series of 5 blog posts about developer productivity and workflow optimization. Each post should be 1500-2000 words with SEO optimization.",
        status: "completed",
        postedAt: "Sep 15, 2023",
        budget: 1200,
        duration: "Ongoing",
        skills: ["Content Writing", "SEO", "Technical Writing"],
        experienceLevel: "Intermediate",
        applicants: [],
        hiredFreelancer: { id: 3, name: "James Wilson", avatar: "", title: "Content Writer", rating: 4.9, hiredAt: "Sep 18, 2023" },
        submissions: [
            { id: 1, title: "All Blog Posts - Final Delivery", description: "Complete set of 5 SEO-optimized blog posts", submittedAt: "Oct 01, 2023", status: "approved", files: ["blog-posts.zip"] },
        ],
    },
];

// Stats data
const clientStats = {
    activeJobs: 12,
    activeJobsChange: "+20%",
    pendingReviews: 4,
    pendingReviewsChange: "+5%",
    totalSpent: 12450,
    totalSpentChange: "+15%",
};

type JobPost = typeof initialJobPosts[0];
type TabType = "details" | "applicants" | "submissions" | "hired";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "open":
            return (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                    Open
                </span>
            );
        case "in-progress":
            return (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    In Progress
                </span>
            );
        case "under-review":
            return (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                    Under Review
                </span>
            );
        case "completed":
            return (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                    Completed
                </span>
            );
        default:
            return null;
    }
};

// Job Management Modal Component
const JobModal = ({ job, onClose, onDelete }: { job: JobPost; onClose: () => void; onDelete: (id: number) => void }) => {
    const [activeTab, setActiveTab] = useState<TabType>("details");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const tabs: { id: TabType; label: string; count?: number }[] = [
        { id: "details", label: "Details" },
        { id: "applicants", label: "Applicants", count: job.applicants.length },
        { id: "submissions", label: "Submissions", count: job.submissions.length },
        { id: "hired", label: "Hired Freelancer" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 p-6">
                    <div>
                        <div className="mb-2">{getStatusBadge(job.status)}</div>
                        <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                        <p className="mt-1 text-sm text-gray-500">Posted {job.postedAt}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Delete Confirmation Banner */}
                {showDeleteConfirm && (
                    <div className="border-b border-red-200 bg-red-50 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-red-700">
                                Are you sure you want to delete this post? This action cannot be undone.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(job.id);
                                        onClose();
                                    }}
                                    className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b border-gray-100 px-6">
                    <div className="flex gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative py-4 text-sm font-medium transition ${activeTab === tab.id
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                                        {tab.count}
                                    </span>
                                )}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                    {/* Details Tab */}
                    {activeTab === "details" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-2 font-semibold text-gray-900">Description</h3>
                                <p className="text-gray-600">{job.description}</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">Budget</p>
                                    <p className="mt-1 text-xl font-bold text-gray-900">${job.budget.toLocaleString()}</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="mt-1 text-xl font-bold text-gray-900">{job.duration}</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">Experience Level</p>
                                    <p className="mt-1 text-xl font-bold text-gray-900">{job.experienceLevel}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-3 font-semibold text-gray-900">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Delete Button */}
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Post
                            </button>
                        </div>
                    )}

                    {/* Applicants Tab */}
                    {activeTab === "applicants" && (
                        <div>
                            {job.applicants.length === 0 ? (
                                <div className="py-12 text-center">
                                    <Users className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-4 text-gray-500">
                                        {job.hiredFreelancer ? "A freelancer has already been hired for this job." : "No applicants yet."}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {job.applicants.map((applicant) => (
                                        <div
                                            key={applicant.id}
                                            className="rounded-xl border border-gray-200 p-4 transition hover:border-gray-300"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <Avatar name={applicant.name} size="h-12 w-12" textSize="text-lg" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                                                        <p className="text-sm text-gray-500">{applicant.title}</p>
                                                        <div className="mt-1 flex items-center gap-3 text-sm">
                                                            <span className="flex items-center gap-1 text-amber-600">
                                                                <Star className="h-4 w-4 fill-current" />
                                                                {applicant.rating}
                                                            </span>
                                                            {/* hourlyRate removed */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                                                        Hire
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600">{applicant.coverLetter}</p>
                                                <p className="mt-2 text-xs text-gray-400">Applied {applicant.appliedAt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submissions Tab */}
                    {activeTab === "submissions" && (
                        <div>
                            {job.submissions.length === 0 ? (
                                <div className="py-12 text-center">
                                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-4 text-gray-500">No submissions yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {job.submissions.map((submission) => (
                                        <div
                                            key={submission.id}
                                            className="rounded-xl border border-gray-200 p-5"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900">{submission.title}</h4>
                                                        {submission.status === "approved" ? (
                                                            <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                                                <CheckCircle className="h-3 w-3" />
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                                                <Clock className="h-3 w-3" />
                                                                Pending Review
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{submission.description}</p>
                                                    <p className="mt-2 text-xs text-gray-400">Submitted {submission.submittedAt}</p>
                                                </div>
                                            </div>

                                            {/* Files */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {submission.files.map((file) => (
                                                    <button
                                                        key={file}
                                                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        {file}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Action Buttons for Pending Submissions */}
                                            {submission.status === "pending" && (
                                                <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                                                    <button className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-100">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Request Changes
                                                    </button>
                                                    <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        Approve & Pay
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Hired Freelancer Tab */}
                    {activeTab === "hired" && (
                        <div>
                            {!job.hiredFreelancer ? (
                                <div className="py-12 text-center">
                                    <Users className="mx-auto h-12 w-12 text-gray-300" />
                                    <p className="mt-4 text-gray-500">No freelancer hired yet.</p>
                                    <p className="mt-1 text-sm text-gray-400">Review applicants to hire someone for this job.</p>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <Avatar name={job.hiredFreelancer.name} size="h-16 w-16" textSize="text-xl" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">{job.hiredFreelancer.name}</h4>
                                                <p className="text-gray-500">{job.hiredFreelancer.title}</p>
                                                <div className="mt-2 flex items-center gap-4 text-sm">
                                                    <span className="flex items-center gap-1 text-amber-600">
                                                        <Star className="h-4 w-4 fill-current" />
                                                        {job.hiredFreelancer.rating}
                                                    </span>
                                                    {/* hourlyRate removed */}
                                                </div>
                                                <p className="mt-2 text-sm text-gray-400">Hired on {job.hiredFreelancer.hiredAt}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                                <ExternalLink className="h-4 w-4" />
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Client = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [jobs, setJobs] = useState<JobPost[]>(initialJobPosts);
    const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

    const handleDeleteJob = (jobId: number) => {
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
        setSelectedJob(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 pt-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Welcome back, Alex. Here's what's happening today.
                        </p>
                    </div>
                    <Link
                        href="/post"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-600 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Post a Job
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Active Jobs */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                {clientStats.activeJobsChange}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">Active Jobs</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">
                            {clientStats.activeJobs}
                        </p>
                    </div>

                    {/* Pending Reviews */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                                <FileText className="h-6 w-6 text-orange-600" />
                            </div>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                {clientStats.pendingReviewsChange}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">Pending Reviews</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">
                            {clientStats.pendingReviews}
                        </p>
                    </div>

                    {/* Total Spent */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                {clientStats.totalSpentChange}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">Total Spent</p>
                        <p className="mt-1 text-3xl font-bold text-gray-900">
                            ${clientStats.totalSpent.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Job Posts Section */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Your Job Posts</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                        </button>
                        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`flex h-8 w-8 items-center justify-center rounded transition ${viewMode === "list"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`flex h-8 w-8 items-center justify-center rounded transition ${viewMode === "grid"
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Job Posts Grid - Explore Style Cards */}
                <div
                    className={`grid gap-6 ${viewMode === "grid"
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                        }`}
                >
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-xl"
                        >
                            {/* Gradient Header */}
                            <div className={`relative h-24 bg-gradient-to-br ${job.status === "open" ? "from-blue-400 via-blue-300 to-cyan-400" :
                                job.status === "in-progress" ? "from-yellow-400 via-orange-300 to-amber-400" :
                                    job.status === "under-review" ? "from-orange-400 via-red-300 to-pink-400" :
                                        "from-green-400 via-emerald-300 to-teal-400"
                                } opacity-80`}>
                                <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">
                                {getStatusBadge(job.status)}
                            </div>

                            {/* Date */}
                            <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-md">
                                {job.postedAt}
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6 pt-4">
                                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {job.title}
                                </h3>
                                <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                                    {job.description}
                                </p>

                                {/* Skills */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {job.skills.slice(0, 3).map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Budget */}
                                <p className="mb-4 text-sm">
                                    <span className="text-blue-600">Budget:</span>{" "}
                                    <span className="text-xl font-bold text-gray-900">
                                        ${job.budget.toLocaleString()}
                                    </span>
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    {job.status === "open" ? (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Users className="h-4 w-4" />
                                            <span>{job.applicants.length} Applicants</span>
                                        </div>
                                    ) : job.hiredFreelancer ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                name={job.hiredFreelancer.name}
                                                size="h-8 w-8"
                                                textSize="text-xs"
                                            />
                                            <span className="text-sm text-gray-700">
                                                {job.hiredFreelancer.name}
                                            </span>
                                        </div>
                                    ) : null}

                                    <button
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${job.status === "under-review"
                                            ? "bg-green-500 text-white hover:bg-green-600"
                                            : job.status === "completed"
                                                ? "border border-gray-200 text-gray-700 hover:bg-gray-50"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                    >
                                        {job.status === "under-review" ? "Review" : job.status === "completed" ? "View Details" : "Manage"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Modal */}
            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} onDelete={handleDeleteJob} />
            )}
        </div>
    );
};

export default Client;