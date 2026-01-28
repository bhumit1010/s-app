"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  CheckCircle,
  Heart,
  Share2,
  Flag,
  Star,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Nav from "@/app/components/Nav";
import Foot from "@/app/components/Foot";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { applyToJob } from "@/app/store/data_slice";

const PostPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSaved, setIsSaved] = useState(false);

  // Get data from Redux store
  const jobPosts = useAppSelector((state) => state.appData.jobPosts);
  const appliedPosts = useAppSelector((state) => state.appData.appliedPosts);
  const isAuthenticated = useAppSelector((state) => state.userData.isAuthenticated);
  const user = useAppSelector((state) => state.userData.user);

  const job = jobPosts.find((j) => j.id === Number(params.id));
  const hasApplied = appliedPosts.some(app => app.gigId === Number(params.id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex flex-col items-center justify-center py-32">
          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Job Post Not Found</h1>
          <p className="mt-2 text-gray-600">The job post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.push("/explore")}
            className="mt-6 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Browse Jobs
          </button>
        </div>
        <Foot />
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      dispatch(applyToJob({
        gigId: job.id,
        gigTitle: job.title,
        client: job.clientName || "Client",
        budget: job.budget,
        description: job.description,
        skills: job.skills,
        freelancerName: user.name || "Freelancer",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="pt-20">
        {/* Back Button */}
        <div className="mx-auto max-w-6xl px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to jobs
          </button>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-6 pb-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    {/* Status Badge */}
                    <div className="mb-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : job.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {job.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {job.postedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applicants} proposals
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsSaved(!isSaved)}
                      className={`rounded-full p-3 border transition-colors ${isSaved
                          ? "bg-red-50 border-red-200 text-red-500"
                          : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
                        }`}
                    >
                      <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                    <button className="rounded-full p-3 border border-gray-200 bg-white text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Budget & Duration */}
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-semibold">
                      ${job.budget.toLocaleString()}
                    </span>
                    <span className="text-green-600">(Fixed)</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">Flexible Timeline</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                <div className="mt-4 prose prose-gray max-w-none">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Skills Required</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">Activity on This Job</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                    <p className="text-sm text-gray-500">Proposals</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {job.status === "active" ? "Open" : "Closed"}
                    </p>
                    <p className="text-sm text-gray-500">Status</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {job.hiredFreelancer ? "1" : "0"}
                    </p>
                    <p className="text-sm text-gray-500">Hired</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Client Info & Apply */}
            <div className="space-y-6">
              {/* Apply Button */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                {user?.userType === "client" ? (
                  <p className="text-center text-gray-500">
                    You posted this job
                  </p>
                ) : hasApplied ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <p className="font-semibold text-green-700">Application Submitted</p>
                    <p className="text-sm text-gray-500 mt-1">You have applied to this job</p>
                  </div>
                ) : job.status !== "active" ? (
                  <p className="text-center text-gray-500">
                    This job is no longer accepting applications
                  </p>
                ) : (
                  <button
                    onClick={handleApply}
                    className="w-full rounded-full bg-gray-900 py-4 font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    Submit a Proposal
                  </button>
                )}
              </div>

              {/* Client Info */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">About the Client</h3>

                <div className="mt-4 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                    {(job.clientName?.[0] || "C").toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{job.clientName || "Client"}</p>
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-500">Member of SkillDAO</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Jobs Posted</span>
                    <span className="font-medium text-gray-900">1</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Report */}
              <div className="text-center">
                <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                  <Flag className="h-4 w-4" />
                  Report this job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Foot />
    </div>
  );
};

export default PostPage;
